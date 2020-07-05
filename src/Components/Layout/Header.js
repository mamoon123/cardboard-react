/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';


const Header = () => {
  const [invitation, setInvitation] = useState(true);


  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" href="/login">Login</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/">Signup</a>
        </li>
        </ul>
    </div>
    </nav>
  );
};


export default Header;
