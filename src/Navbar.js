import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <div className="sidebar-nav">
            <ul className="nav">
                <li className="nav-divider"></li>
                <li>
                    <NavLink to='/' className="btn btn-danger btn-lg" ><span className="glyphicon glyphicon-cutlery"></span><h5>NEW ORDER</h5></NavLink>
                </li>
                <li className="nav-divider"></li>
                <li>
                    <NavLink to='/Summary' className="btn btn-info btn-lg" ><span className="glyphicon glyphicon-shopping-cart"></span> ORDER SUMMARY</NavLink>
                </li>
                <li className="nav-divider"></li>
            </ul>
        </div>
    );
}

export default Navbar;