import React from "react";
import { Form } from "semantic-ui-react";

function FormikInput({ label, name, className, ...props }) {
  return (
    <div>
      <Form.Input
        id={name}
        {...props}
        label={
          <label
            htmlFor={name}
            className="font-bold text-base mt-4 text-primary"
          >
            {label}
          </label>
        }
        className={`mt-2 ltr:pl-0 rtl:pr-0 ${className}`}
      />
    </div>
  );
}

export default FormikInput;
