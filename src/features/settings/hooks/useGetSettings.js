import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../../services/apiSettings';

function useGetSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  });
}

export default useGetSettings;
