import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <div className="sidebar-nav">
            <ul className="nav">
                <li className="nav-divider"></li>
                <li>

                    <NavLink to='/' className="btn btn-danger btn-lg" >NEW ORDER</NavLink>

                </li>
                <li className="nav-divider"></li>
                <li>
                    <NavLink to='/Summary' className="btn btn-info btn-lg" >ORDER SUMMARY</NavLink>
                </li>
                <li className="nav-divider"></li>
            </ul>
        </div>
    );
}

export default Navbar;