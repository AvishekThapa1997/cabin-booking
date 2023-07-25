import useReactQueryClient from './useReactQueryClient';

function useInvalidationQueries(...queryKeys) {
  const queryClient = useReactQueryClient();
  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: [...queryKeys],
    });
  };
  return { invalidate };
}

export default useInvalidationQueries;
