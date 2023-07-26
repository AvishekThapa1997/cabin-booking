import { useMutation } from '@tanstack/react-query';
import { deleteCabin } from '../../../services/apiCabins';
import useCabinsInvalidationQueries from './useCabinsInvalidationQueries';

function useDeleteCabin({ onSuccessHandler, onErrorHandler } = {}) {
  const { invalidate } = useCabinsInvalidationQueries();
  return useMutation({
    mutationKey: ['deleteCabins'],
    mutationFn: deleteCabin,
    onSuccess: (data) => {
      invalidate();
      onSuccessHandler?.(data);
    },
    ...(onErrorHandler ? { onError: onErrorHandler } : {}),
  });
}

export default useDeleteCabin;
