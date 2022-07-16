import React from 'react'
import {Field} from 'formik'
import {Form} from 'semantic-ui-react'
import ErrorMessage from './error-message'

function FormikTextArea({label, name, className, ...props}) {
  return (
    <>
      <Field name={name}>
        {({form, field}) => {
          const {errors, touched} = form
          return (
            <>
              <Form.TextArea
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
                className={`block mt-2 ${className}`}
                error={Boolean(touched[name] && errors[name])}
              />

              {touched[name] && errors[name] && (
                <ErrorMessage error={errors[name]} />
              )}
            </>
          )
        }}
      </Field>
    </>
  )
}

export default FormikTextArea
