import React from 'react';
import { propStyle } from 'aws-amplify-react/dist/AmplifyUI';
import { PropTypes } from 'mobx-react';

const Header = (props) => {
    const logoutButton = (<button className="btn btn-default" style={{ marginRight: "10px" ,verticalAlign:"center"}} onClick={props.logoutHandler}><span className="glyphicon glyphicon-log-out"></span> Log out</button>)

    return (
        <nav className="navbar navbar-default">
            Your Express Foodstall
            <div className="navbar-right" style={{ marginRight: "0px" ,verticalAlign:"center"}}>   
                {props.isVisible && <label style={{fontSize:"30px",paddingRight:"20px"}}>hi, {props.username}</label>}
                {props.isVisible && logoutButton}
            </div>

        </nav>
    )
}

export default Header;