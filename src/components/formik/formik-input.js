import { Field } from "formik";
import React from "react";
import { Form } from "semantic-ui-react";

function FormikInput({ label, name, className, ...props }) {
  return (
    <Field name={name}>
      {({ form, field }) => {
        const { errors, touched } = form;

        return (
          <div>
            <Form.Input
              id={name}
              {...field}
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
      }}
    </Field>
  );
}

export default FormikInput;
