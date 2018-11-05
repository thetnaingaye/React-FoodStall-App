import React from 'react';

const Size = (props) => {
    return (
        <div className="form-group">
        <input className="form-control" type="text" placeholder="*small/medium/large" value={props.name} onChange={props.sizeInputHandler}></input>
        {props.sizeerror &&
        <p className="form-error">{props.sizeerror}</p> }
        </div>
    );
}

export default Size;