import { styled } from '@mui/material';
import { Box } from '@mui/material';

const Img = styled('img')`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <Box textAlign='center'>
      <Img
        src='/logo-light.png'
        alt='Logo'
      />
    </Box>
  );
}

export default Logo;
