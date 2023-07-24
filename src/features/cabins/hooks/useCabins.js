import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../../services/apiCabins';

function useCabins() {
  return useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });
}

export { useCabins };
