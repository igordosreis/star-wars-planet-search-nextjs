import FetchedData from '@/interfaces/FetchData';

const fetchPlanetsInfo = async (): Promise<FetchedData> => {
  const url = 'https://swapi.dev/api/planets/';
  try {
    const response = await fetch(url);
    const data: FetchedData = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Unable to fetch data: ${error}`);
  }
};

export default fetchPlanetsInfo;
