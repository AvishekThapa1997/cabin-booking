import useInvalidationQueries from '../../../hooks/useInvalidationQueries';

function useCabinsInvalidationQueries() {
  return useInvalidationQueries('cabins');
}

export default useCabinsInvalidationQueries;
