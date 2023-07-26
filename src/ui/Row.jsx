import { styled } from 'styled-components';

const Row = styled.div`
  display: flex;
  ${(props) => props.rowStyles}
`;

export default Row;
