import { css, styled } from 'styled-components';

const messageType = {
  error: css`
    color: red;
  `,
  neutral: css`
    color: inherit;
  `,
};

const Message = styled.p`
  text-transform: capitalize;
  font-size: 2.4rem;
  margin: 2rem 0;
  ${(props) => messageType[props.type]}
  ${(props) =>
    props.centerText &&
    css`
      text-align: center;
    `}
`;

Message.defaultProps = {
  type: 'neutral',
  centerText: false,
};
export default Message;
