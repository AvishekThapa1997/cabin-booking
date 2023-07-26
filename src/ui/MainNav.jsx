import { NavLink } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { colors, styled } from '@mui/material';

const NavList = styled('ul')({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

const StyledNavLink = styled(NavLink)({
  textTransform: 'capitalize',
  '&:link,&:visited': {
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
    color: colors.grey[600],
    fontSize: '1.6rem',
    fontWeight: 500,
    padding: '1.2rem 2.4rem',
    transition: 'all 0.3s',
  },
  '&:hover,&:active,&.active:link,&.active:visited': {
    color: colors.grey[800],
    backgroundColor: colors.grey[50],
    borderRadius: '0.5rem',
  },
  '& svg': {
    width: '2.4rem',
    height: '2.4rem',
    color: colors.grey[400],
    transition: 'all 0.3s',
  },
  '&:hover svg,&:active svg, &.active:link svg,&.active:visited svg': {
    color: colors.indigo[600],
  },
});

export default function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to='/dashboard'>
            <HomeOutlinedIcon />
            <span>home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/bookings'>
            <CalendarTodayOutlinedIcon />
            <span>bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/cabins'>
            <CottageOutlinedIcon />
            <span>Cabins</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/users'>
            <GroupOutlinedIcon />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to='/settings'>
            <SettingsOutlinedIcon />
            <span>settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}
