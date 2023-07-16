import { colors, Box } from '@mui/material';

function Main({ children }) {
  return (
    <Box
      component='main'
      px='4.8rem'
      pt='4rem'
      pb='6.4rem'
      bgcolor={colors.grey[50]}
      flexGrow={1}
    >
      {children}
    </Box>
  );
}

export default Main;
