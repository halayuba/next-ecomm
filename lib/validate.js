export default function loginValidate(values){
  const errors = {};

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.password = 'Must be at leasr 8 characters';
  } else if(values.password.includes(" ")){
    errors.password = 'Invalid password';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
}

export function registerValidate(values){
  const errors = {};

  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  } else if(values.username.includes(" ")){
    errors.username = 'Invalid username';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.password = 'Must be at leasr 8 characters';
  } else if(values.password.includes(" ")){
    errors.password = 'Invalid password';
  }

  if (!values.cpassword) {
    errors.cpassword = 'Required';
  } else if (values.password !== values.cpassword) {
    errors.cpassword = 'Passwords do not match';
  } else if(values.cpassword.includes(" ")){
    errors.cpassword = 'Invalid confirm password';
  }

  return errors;
}