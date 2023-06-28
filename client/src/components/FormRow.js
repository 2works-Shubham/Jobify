import React from "react";

const FormRow = ({labelText,id,type,value,name,handleChange}) => {
  return (
    <div>
      <div className="form-row">
        <label htmlFor={id} className="form-label">
          {labelText || name}     
        </label>
        <input
          id={id}
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          className="form-input"
        />
      </div>
    </div>
  );
};

export default FormRow;
