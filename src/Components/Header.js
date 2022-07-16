import React from 'react';
import logo from "../images/images.jpg"
import {
NavLink,
Link
  } from "react-router-dom";
 function Header() {
  return (
    <>
    <header>
          <ul className='navlist'>
          <li>
              <Link to="/" >< img src={logo} className="logo" /></Link>
            </li>
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