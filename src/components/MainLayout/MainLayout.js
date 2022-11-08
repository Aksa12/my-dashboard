import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Container from '@mui/material/Container';

const ContainerStyled = styled(Container)`
  && {
    margin: 56px 0 0 0;
    padding: 24px 16px;
    height: 100%;
    width: auto;

    @media (min-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
      margin: 64px 0 0 240px;
      padding: 24px;

      ${({ theme }) => css`
        transition: ${theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        })};
      `}

      ${({ isSidebarOpen, theme }) =>
        !isSidebarOpen &&
        css`
          margin: 64px 0 0 70px;
          transition: ${theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          })};
        `}
    }
  }
`;

const MainLayout = ({ children, isSidebarOpen }) => {
  return (
    <ContainerStyled isSidebarOpen={isSidebarOpen}>{children}</ContainerStyled>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  isSidebarOpen: PropTypes.bool,
};

MainLayout.defaultProps = {
  isSidebarOpen: false,
};

export default MainLayout;
