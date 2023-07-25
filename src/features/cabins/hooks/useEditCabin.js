import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editCabin } from '../../../services/apiCabins';

function useEditCabin({ onSuccessHandler, onErrorHandler }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['editCabins'],
    mutationFn: editCabin,
    onSuccess: (updatedCabin) => {
      onSuccessHandler?.(updatedCabin);
      queryClient.setQueryData(['cabins'], (cabins) => {
        return cabins.map((cabin) =>
          cabin.id === updatedCabin.id ? updatedCabin : cabin,
        );
      });
    },
    ...(onErrorHandler ? { onError: onErrorHandler } : {}),
  });
}

export default useEditCabin;
