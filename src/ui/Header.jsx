import { colors, Box } from '@mui/material';

export default function Header() {
  return (
    <Box
      component='header'
      bgcolor={colors.grey[100]}
      py='1.2rem'
      px='4.8rem'
      borderBottom={`1px solid ${colors.grey[200]}`}
    >
      header
    </Box>
  );
}
