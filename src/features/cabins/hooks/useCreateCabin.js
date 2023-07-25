import { useMutation } from '@tanstack/react-query';
import { createCabin } from '../../../services/apiCabins';
import useCabinsInvalidationQueries from './useCabinsInvalidationQueries';

function useCreateCabin({ onSuccessHandler, onErrorHandler }) {
  const { invalidate } = useCabinsInvalidationQueries();
  return useMutation({
    mutationKey: ['createCabin'],
    mutationFn: createCabin,
    onSuccess: (data) => {
      invalidate();
      onSuccessHandler?.(data);
    },
    ...(onErrorHandler ? { onError: onErrorHandler } : {}),
  });
}

export default useCreateCabin;
