import React from "react";
import { Field } from "formik";
import { Form } from "semantic-ui-react";
import ErrorMessage from "./error-message";

function FormikTextArea({ label, name, className, ...props }) {
  return (
    <>
      <Form.TextArea
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
        className={`block mt-2 ${className}`}
      />
    </>
  );
}

export default FormikTextArea;
