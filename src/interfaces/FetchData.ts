import { PlanetRaw } from './Planet';

interface FetchedData {
  count: number;
  next: string;
  previous: null;
  results: PlanetRaw[];
}

export default FetchedData;
