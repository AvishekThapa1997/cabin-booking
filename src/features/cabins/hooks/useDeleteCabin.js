import { useMutation } from '@tanstack/react-query';
import { deleteCabin } from '../../../services/apiCabins';

function useDeleteCabin({ onSuccess }) {
  return useMutation({
    mutationFn: deleteCabin,
    ...(onSuccess ? { onSuccess } : {}),
  });
}

export default useDeleteCabin;
