import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <div className="sidebar-nav">
            <ul className="nav">
                <li className="nav-divider"></li>
                <li>
                    <NavLink to='/' className="btn btn-danger btn-lg" style={{textAlign:"right"}} ><span className="glyphicon glyphicon-cutlery"></span> NEW ORDER</NavLink>
                </li>
                <li className="nav-divider"></li>
                <li>
                    <NavLink to='/checkout' className="btn btn-info btn-lg" style={{textAlign:"right"}} ><span className="glyphicon glyphicon-shopping-cart"></span> CHECK OUT</NavLink>
                </li>
                <li className="nav-divider"></li>
                <li>
                    <NavLink to='/Summary/grid' className="btn btn-warning btn-lg" style={{textAlign:"right",backgroundColor:"orange"}} ><span className="glyphicon glyphicon-th-list"></span> ORDER SUMMARY</NavLink>
                </li>
                <li className="nav-divider"></li>
                <li>
                    <NavLink to='/Summary/anttable' className="btn btn-warning btn-lg" style={{textAlign:"right",backgroundColor:"darkgreen"}} ><span className="glyphicon glyphicon-th-list"></span> ORDER SUMMARY</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;