import Router from 'next/router';

export const routeTo = (pathname, query, as, options = {}) => {
  Router.push(
    {
      pathname,
      query,
    },
    as,
    options
  );
};
