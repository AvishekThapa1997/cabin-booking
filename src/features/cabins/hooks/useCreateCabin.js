import { useMutation } from '@tanstack/react-query';
import { createCabin } from '../../../services/apiCabins';

function useCreateCabin({ onSuccess, onError }) {
  return useMutation({
    mutationKey: ['createCabin'],
    mutationFn: createCabin,
    ...(onSuccess ? { onSuccess } : {}),
    ...(onError ? { onError } : {}),
  });
}

export default useCreateCabin;
