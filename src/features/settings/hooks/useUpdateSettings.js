import { useMutation } from '@tanstack/react-query';
import { updateSetting } from '../../../services/apiSettings';
import useReactQueryClient from '../../../hooks/useReactQueryClient';

function useUpdateSettings({
  onSuccessHandler,
  onErrorHandler,
  onSettledHandler,
} = {}) {
  const queryClient = useReactQueryClient();
  return useMutation({
    mutationKey: ['updateSettings'],
    mutationFn: updateSetting,
    onSuccess: (updatedSettings) => {
      onSuccessHandler?.(updatedSettings);
      queryClient.setQueryData(['settings'], (prevSettings) => {
        return { ...prevSettings, ...updatedSettings };
      });
    },
    ...(onErrorHandler ? { onError: onErrorHandler } : {}),
    ...(onSettledHandler ? { onSettled: onSettledHandler } : {}),
  });
}

export default useUpdateSettings;
