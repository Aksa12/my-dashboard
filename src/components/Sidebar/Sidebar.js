import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import {
  List,
  ListItem,
  Typography,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { routeTo } from '../../utils/route';

const BoxStyled = styled(Box)``;

const DrawerStyled = styled(Drawer)`
  white-space: nowrap;
  box-sizing: border-box;

  & .MuiDrawer-paper {
    overflow: visible;
    border: none;
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
      0 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  }

  & .MuiDrawer-paper {
    width: 50%;

    @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
      ${({ open, theme }) =>
        open &&
        css`
          transition: ${theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          })};
          width: 240px;
        `}

      ${({ open, theme }) =>
        !open &&
        css`
          transition: ${theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          })};
          width: 70px;
        `}
    }
  }
`;

const DrawerContainer = styled.div`
  position: relative;
  padding: 56px 0;
`;

const DrawerToggle = styled(Box)`
  border-radius: 50%;
  position: absolute;
  top: 20px;
  right: -15px;
  z-index: 3000;
  background-color: white;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
`;

const ListItemButtonSyled = styled(ListItemButton)`
  &&.Mui-selected {
    background-color: ${({ theme }) => `${theme.palette.primary.dark}4d`};
  }
`;

const NAV_ITEMS = [
  {
    title: 'Home',
    icon: <BusinessOutlinedIcon />,
    link: '/',
  },
  {
    title: 'About',
    icon: <InfoOutlinedIcon />,
    link: '/about',
  },
  {
    title: 'Upload',
    icon: <FileUploadOutlinedIcon />,
    link: '/upload',
  },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { pathname } = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const container =
    typeof document !== 'undefined' ? () => document.body : undefined;

  return (
    <DrawerStyled
      container={container}
      open={isOpen}
      ModalProps={{
        keepMounted: true,
      }}
      onClose={() => setIsOpen((val) => !val)}
      variant={isMobile ? 'temporary' : 'permanent'}
    >
      <DrawerContainer>
        <BoxStyled>
          <Typography
            variant="h4"
            sx={{
              margin: 'auto',
              width: 'fit-content',
            }}
          >
            {isOpen ? 'StatMe' : 'SM'}
          </Typography>
          <List>
            {NAV_ITEMS.map((navItem) => (
              <ListItem key={navItem.title} disablePadding>
                <ListItemButtonSyled
                  sx={{
                    minHeight: 48,
                    justifyContent: isOpen ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => routeTo(navItem.link)}
                  selected={pathname === navItem.link}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isOpen ? 3 : 0,
                      justifyContent: 'center',
                    }}
                  >
                    {navItem.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={navItem.title}
                    sx={{ display: !isOpen ? 'none' : 'block' }}
                  />
                </ListItemButtonSyled>
              </ListItem>
            ))}
          </List>
        </BoxStyled>
        {!isMobile && (
          <DrawerToggle>
            <IconButton
              onClick={() => setIsOpen((val) => !val)}
              sx={{
                width: '30px',
                height: '30px',
                '&:hover': {
                  backgroundColor: 'primary.main',
                },
                '&:hover svg': {
                  color: 'white',
                },
              }}
            >
              {isOpen ? (
                <KeyboardArrowRightOutlinedIcon color="primary" />
              ) : (
                <KeyboardArrowLeftOutlinedIcon color="primary" />
              )}
            </IconButton>
          </DrawerToggle>
        )}
      </DrawerContainer>
    </DrawerStyled>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

Sidebar.defaultProps = {
  isOpen: false,
  setIsOpen: () => null,
};

// eslint-disable-next-line no-undef
export default dynamic(() => Promise.resolve(Sidebar), {
  ssr: false,
});
