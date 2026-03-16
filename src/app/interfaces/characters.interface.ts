export interface Episode {
  id: number;
  name: string;
  season: number;
  number: number;
  airdate: string;
  runtime: number;
  summary: string;
  image: { medium: string; original: string } | null;
}

export interface CastMember {
  person: {
    id: number;
    name: string;
    birthday: string | null;
    deathday: string | null;
    gender: string | null;
    country: { name: string } | null;
    image: { medium: string; original: string } | null;
    url: string;
    summary?: string | null;
  };
  character: {
    id: number;
    name: string;
    image: { medium: string; original: string } | null;
    url: string;
    summary?: string | null;
  };
  self: boolean;
  voice: boolean;
}

export interface CrewMember {
  type: string;
  person: {
    id: number;
    name: string;
    birthday: string | null;
    deathday: string | null;
    gender: string | null;
    country: { name: string } | null;
    image: { medium: string; original: string } | null;
    url: string;
    summary?: string | null;
  };
}

export interface Sim {
  image: { medium: string; original: string };
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
