import { styled } from 'styled-components';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  ${(props) => props.columnStyles}
`;

export default Column;
