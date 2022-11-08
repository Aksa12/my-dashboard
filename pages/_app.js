import PropTypes from 'prop-types';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Main from '../src/components/Main/Main';

import TransactionProvider from '../src/context/TransactionProvider';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6464fa',
      contrastText: '#ffffff',
      dark: '#4646af',
    },
    secondary: {
      main: '#ff00ff',
    },
    success: {
      main: '#00695c',
      light: '#DFF3EA',
    },
    error: {
      main: '#ad1457',
      light: '#e5b7b780',
    },
  },
  typography: {
    caption: {
      color: '#888888',
    },
  },
  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#4646af',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          color: '#ffffff',
          backgroundColor: '#6464fa',
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <TransactionProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Main isMobile={pageProps.isMobile}>
          <Component {...pageProps} />
        </Main>
      </ThemeProvider>
    </TransactionProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let userAgent;

  if (ctx.isServer) {
    userAgent = ctx.req.headers['user-agent'];
  } else {
    userAgent =
      typeof window !== 'undefined'
        ? window.navigator.userAgent
        : ctx?.req?.headers?.['user-agent'];
  }

  const isMobile = Boolean(
    userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  const appProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};

  return {
    pageProps: { ...appProps, isMobile },
  };
};

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({
    isMobile: PropTypes.bool,
  }),
};

MyApp.defaultProps = {
  pageProps: {},
};
