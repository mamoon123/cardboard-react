/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import { ACCESS_TOKEN, USER } from '../Constant';

const ActionButton = styled.div`
  width: auto;
  padding: 0px 7px;
  button {
    border: none !important;
    background: none !important;
    box-shadow: none;
    outline: 0px;
  }
`;


const AuthenticatedHeader = () => {
  const [cookies,removeCookie] = useCookies([ACCESS_TOKEN]);
  const user = cookies[USER];
  const handleLogout = () => {
    removeCookie(ACCESS_TOKEN, '');
    removeCookie(USER, '');
    window.location.href = '/login';
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light" role="navigation">
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="nav navbar-nav navbar-left mr-auto">
        <li class="nav-item">
            <a class="nav-link" href="/orders">Orders</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/new-order">New Order</a>
        </li>
      </ul>
      <ActionButton>
        <button type="button">{user.name}</button> |
        <button type="button" onClick={handleLogout}>Logout</button>
      </ActionButton>
    </div>
    </nav>
  );
};


export default AuthenticatedHeader;
