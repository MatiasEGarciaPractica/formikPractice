import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const FormikForm = () => {
  const [formSended, setFormSended] = useState(false);

  //Formik will get inputs by name attribute
  return (
    <div className='container'>
      <Formik
        initialValues={{ //we can access this values in props.values
          name: '',
          mail: ''
        }}
        validate={(values) => {//to validate inputs after the user click an input and click in another place
          let errors = {};

          if (!values.name) { //if there is not name enter
            errors.name = "Please, add a name";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
            errors.name = "Name can contain only letters and spaces";
          }

          if (!values.mail) { //if there is not mail enter
            errors.mail = "Please, add a mail";
          } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.mail)) {
            errors.mail = "Mail can only contain letters, numbers, dots and dashes";
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);//we get the values inside each input
          resetForm(); //reset input values
          console.log("Formulario enviado");
          setFormSended(true);
          setTimeout(() => setFormSended(false), 5000); //5 seg
        }}
      >
        {({ errors }) => { //props is the general object that you can destructure
          return (
            <Form className="formikForm">
              <div>
                <label htmlFor="name">Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe" />
                <ErrorMessage name="name" component={() => (
                  <div className="error">{errors.name}</div>
                )} />
              </div>
              <div>
                <label htmlFor="mail">Mail</label>
                <Field
                  type="mail"
                  id="mail"
                  name="mail"
                  placeholder="mail@mail.com" />
                <ErrorMessage name="mail" component={() => (
                  <div className="error">{errors.mail}</div>
                )} />
              </div>
              <button type="submit">Send</button>
              {formSended && <p className="exito">Form sended successfully</p>}
            </Form>
          )
        }}
      </Formik>
    </div>

  )
}

export default FormikForm;

/*
Without Form, Field, ErrorMessage components from Formik

  <form className="formikForm" onSubmit={props.handleSubmit}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={props.values.name}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}/>
                  {props.touched.name && props.errors.name && <div className="error">{props.errors.name}</div>}
              </div>
              <div>
                <label htmlFor="mail">Mail</label>
                <input
                  type="mail"
                  id="mail"
                  name="mail"
                  placeholder="mail@mail.com"
                  value={props.values.mail}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}/>
                  {props.touched.mail && props.errors.mail && <div className="error">{props.errors.mail}</div>}
              </div>
              <button type="submit">Send</button>
              {formSended && <p className="exito">Form sended successfully</p>}
            </form>
*/