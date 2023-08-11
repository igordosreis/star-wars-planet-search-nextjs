import { useQuery } from '@tanstack/react-query';

import queryClient from '.';

const useGlobalState = (key?: string, initialData?: any) => [
  useQuery([key], () => initialData, { enabled: false, initialData }).data,
  (value: any) => queryClient.setQueryData([key], value),
];

export default useGlobalState;
