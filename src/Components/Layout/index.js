import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './MainRouter';
import AppHeader from './Header';
import AuthenticatedHeader from './AuthenticatedHeader';
import { ACCESS_TOKEN } from '../Constant';


const Layout = () => {
  const [cookies, removeCookie] = useCookies([ACCESS_TOKEN]);
  const token = cookies[ACCESS_TOKEN];

  useEffect(() => {
  }, []);


  return (
    <div className="parent-root">
      <BrowserRouter>
        {token ? 
          <AuthenticatedHeader /> :
          <AppHeader />
        }
        <MainRouter />
      </BrowserRouter>
    </div>
  );
};

export default Layout;
