import { useQuery } from '@tanstack/react-query';

import { deleteProperties } from '@/helpers';

import fetchPlanetsInfo from './fetchPlanets';

const usePlanets = () =>
  useQuery({
    queryKey: ['planets'],
    queryFn: async () => {
      const response = await fetchPlanetsInfo();
      const planetsWithRemovedProperties = deleteProperties(response.results, [
        'residents',
        'created',
        'edited',
        'url',
      ]);

      return planetsWithRemovedProperties;
    },
  });

export default usePlanets;
