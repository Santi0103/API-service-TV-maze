import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sim, Episode, CastMember, CrewMember } from '../interfaces/characters.interface';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CharactersServicesService {
  url = 'https://api.tvmaze.com/shows/83';
  peopleUrl = 'https://api.tvmaze.com/people';

  constructor(private http: HttpClient) {}

  getSim()      { return this.http.get<Sim>(this.url); }
  getEpisodes() { return this.http.get<Episode[]>(`${this.url}/episodes`); }
  getCrew()     { return this.http.get<CrewMember[]>(`${this.url}/crew`); }

  // Trae el cast y luego enriquece con summary de cada persona
  getCast(): Observable<CastMember[]> {
    return this.http.get<CastMember[]>(`${this.url}/cast`).pipe(
      switchMap(castList => {
        if (!castList.length) return of([]);
        // Pide el detalle de cada persona para obtener su summary
        const requests = castList.map(member =>
          this.http.get<any>(`${this.peopleUrl}/${member.person.id}`).pipe(
            catchError(() => of(null))
          )
        );
        return forkJoin(requests).pipe(
          map(people => castList.map((member, i) => {
            if (people[i]) {
              member.person.summary = people[i].summary || null;
              member.person.country = people[i].country || null;
              member.person.deathday = people[i].deathday || null;
            }
            return member;
          }))
        );
      })
    );
  }
}
