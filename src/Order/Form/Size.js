import React from 'react';

const Size = (props) => {
    return (
        <div className="form-group">
        <label htmlFor="rad">Food Size:</label>
        <div onChange={props.sizeChanged} id="rad">
                    <label className="radio-inline"><input type="radio" value="Small" name="size" defaultChecked={props.size === 'Small'}/> Small</label>
                    <label className="radio-inline"><input type="radio" value="Medium" name="size" /> Medium</label>
                    <label className="radio-inline"><input type="radio" value="Large" name="size" /> Large</label>
                </div>
        {props.sizeerror &&
        <p className="form-error">{props.sizeerror}</p> }
        </div>
    );
}

export default Size;