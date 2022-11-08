import { useContext } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { TransactionContext } from '../../context/TransactionProvider';

const AppBarStyled = styled(AppBar)`
  @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    && {
      margin-left: 240px;
      width: calc(100% - 240px);

      ${({ theme }) => css`
        transition: ${theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        })};
      `}

      ${({ isSidebarOpen, theme }) =>
        !isSidebarOpen &&
        css`
          margin-left: 70px;
          width: calc(100% - 70px);
          transition: ${theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          })};
        `}
    }
  }
`;

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { filename } = useContext(TransactionContext);

  return (
    <AppBarStyled position="fixed" isSidebarOpen={isSidebarOpen}>
      <Toolbar>
        {isMobile && (
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: theme.palette.primary.contrastText }}
            onClick={() => setIsSidebarOpen((val) => !val)}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, marginRight: '8px' }}
        >
          Dashboard
        </Typography>
        <Typography variant="subtitle2" component="div" noWrap>
          {filename}
        </Typography>
      </Toolbar>
    </AppBarStyled>
  );
};

export default Navbar;

Navbar.propTypes = {
  isSidebarOpen: PropTypes.bool,
  setIsSidebarOpen: PropTypes.func,
};

Navbar.defaultProps = {
  isSidebarOpen: false,
  setIsSidebarOpen: () => null,
};
