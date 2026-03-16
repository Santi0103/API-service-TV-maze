export interface Episode {
  id: number;
  name: string;
  season: number;
  number: number;
  airdate: string;
  runtime: number;
  summary: string;
  image: {
    medium: string;
    original: string;
  } | null;
}

export interface Sim {
    image: {
        medium: string;
        original: string;
    };
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: number;
    averageRuntime: number;
    premiered: string;
    officialSite: string;
}
    