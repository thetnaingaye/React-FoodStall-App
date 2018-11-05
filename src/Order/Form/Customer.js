import React from 'react';

const Customer = (props) => {
    return (
        <div className="form-group">
        <input className="form-control" type="text" placeholder="*Customer Name" value={props.name} onChange={props.nameInputHandler}></input>
        {props.nameerror &&
        <p className="form-error">{props.nameerror}</p> }
        </div>
    );
}

export default Customer;