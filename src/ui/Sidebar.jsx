import React from 'react';
import MainNav from './MainNav';
import Logo from './Logo';
import { Stack, colors } from '@mui/material';

export default function Sidebar() {
  return (
    <Stack
      component='aside'
      bgcolor={colors.grey[100]}
      height='100%'
      py='3.2rem'
      px='2.4rem'
      borderRight={`1px solid ${colors.grey[100]}`}
      spacing='3.2rem'
    >
      <Logo />
      <MainNav />
    </Stack>
  );
}
