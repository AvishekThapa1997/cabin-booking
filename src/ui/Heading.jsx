import { styled, css } from 'styled-components';

const headingTypes = {
  h1: css`
    font-size: 3rem;
    font-weight: 600;
    text-transform: capitalize;
  `,
  h2: css`
    font-size: 2rem;
    font-weight: 600;
  `,
  h3: css`
    font-size: 2rem;
    font-weight: 500;
  `,
};

const Heading = styled.h1`
  ${(props) => headingTypes[props.as]}
`;
export default Heading;
