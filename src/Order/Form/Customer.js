import React from 'react';

const Customer = (props) => {
    return (
        <div className="form-group">
        <input className="form-control" type="text"  value={props.name} disabled={true}></input>
        </div>
    );
}

export default Customer;