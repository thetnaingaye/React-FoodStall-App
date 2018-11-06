import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Food = (props) => {
    return (
        <div className="form-group">
            <Dropdown options={props.foodList} onChange={props.foodInputHandler} value={props.food} placeholder="Select food" />
            
            {props.fooderror &&
                <p className="form-error">{props.fooderror}</p>}
        </div>
    );
}

export default Food;