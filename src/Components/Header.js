import React from 'react';
import {
NavLink
  } from "react-router-dom";
 function Header() {
  return (
    <>
    <header>
          <ul className='navlist'>
            <li>
              <NavLink to="/" >Ana  səhifə</NavLink>
            </li>
            <li>
              <NavLink to="/addorder" >Sifariş artır</NavLink>
            </li>
          </ul>
      </header>
    </>
  )
}
export default Header;