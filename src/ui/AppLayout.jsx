import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Main from './Main';
import { Grid, Stack } from '@mui/material';

export default function AppLayout() {
  return (
    <Grid
      container
      columns={5}
      height='100dvh'
    >
      <Grid
        item
        xs={1}
      >
        <Sidebar />
      </Grid>
      <Grid
        item
        xs={4}
        width='100%'
      >
        <Stack height='100%'>
          <Header />
          <Main>
            <Outlet />
          </Main>
        </Stack>
      </Grid>
    </Grid>
  );
}
