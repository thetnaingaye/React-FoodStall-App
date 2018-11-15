import React from 'react';
import { NavLink } from 'react-router-dom';
import decode from 'jwt-decode';

const Navbar = (props) => {

    const accessToken = localStorage.getItem(`CognitoIdentityServiceProvider.648p7jra8h6ck576065ckg62hv.${props.username}.accessToken`)
    const decodedToken = decode(accessToken)
    const isOwner = decodedToken["cognito:groups"] ? decodedToken["cognito:groups"].includes('owner') : false;

    const ownerMenu = (
        <div className="sidebar-nav">
            <ul className="nav">
             
                
                <li>
                    <NavLink to='/manageinvoice' className="btn btn-info btn-lg" style={{ textAlign: "left" }} ><span style={{ paddingRight: "15px" }} className="glyphicon glyphicon-cutlery"></span>MANAGE INVOICES</NavLink>
                </li>
                <li className="nav-divider"></li>
                <li>
                    <NavLink to='/Summary/grid' className="btn btn-warning btn-lg" style={{ textAlign: "left", backgroundColor: "orange" }} ><span style={{ paddingRight: "15px" }} className="glyphicon glyphicon-th"></span>MANAGE ORDERS</NavLink>
                </li>
            </ul>
        </div >
    );

    const customerMenu = (
        <div className="sidebar-nav">
            <ul className="nav">
                <li>
                    <NavLink to='/' className="btn btn-danger btn-lg" style={{ textAlign: "left" }} ><span style={{ paddingRight: "15px" }} className="glyphicon glyphicon-cutlery"></span>NEW ORDER</NavLink>
                </li>
                <li className="nav-divider"></li>
                <li>
                    <NavLink to='/checkout' className="btn btn-info btn-lg" style={{ textAlign: "left" }} ><span style={{ paddingRight: "15px" }} className="glyphicon glyphicon-shopping-cart"></span>CHECK OUT</NavLink>
                </li>

                <li className="nav-divider"></li>
                <li>
                    <NavLink to='/Summary/anttable' className="btn btn-warning btn-lg" style={{ textAlign: "left", backgroundColor: "darkgreen" }} ><span style={{ paddingRight: "15px" }} className="glyphicon glyphicon-th-list"></span>YOUR ORDERS</NavLink>
                </li>
            </ul>
        </div>
    )

    const menu = isOwner ? ownerMenu : customerMenu;
    return menu;
}

export default Navbar;