import React from 'react';

const Food = (props) => {
    return (
        <div className="form-group">
        <input className="form-control" type="text" placeholder="*Food Name" value={props.name} onChange={props.foodInputHandler}></input>
        {props.fooderror &&
        <p className="form-error">{props.fooderror}</p> }
        </div>
    );
}

export default Food;