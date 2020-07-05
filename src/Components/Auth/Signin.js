/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { get } from 'lodash/fp';
import { AuthForm, SubmitButton, CustomeSpinner } from './AuthStyle';
import { VALID_EMAIL_REGEX, ACCESS_TOKEN, USER, REACT_APP_API_URL } from '../Constant';
import { MAXIMUM_EMAIL_LENGTH } from '../ValidationLength';


const Signin = () => {
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies([ACCESS_TOKEN]);
  const token = cookies[ACCESS_TOKEN];
  const [register, setRegister] = useState({
    email: '',
    password: '',
  });
  const {
    email,
    password,
  } = register;

  useEffect(() => {
    const errors = {
      email: '',
    };

    if (!email) {
      errors.email = '';
    } else if (!VALID_EMAIL_REGEX.test(email)) {
      errors.email = '*Please enter valid email';
    } else if (!(email.length <= MAXIMUM_EMAIL_LENGTH)) {
      errors.email = `Email should not exceed ${MAXIMUM_EMAIL_LENGTH} characters`;
    }
    setFormErrors(errors);
  }, [email, register]);

  const onInputChange = (evt) => {
    setRegister({
      ...register,
      [evt.target.name]: evt.target.value,
    });
  };

  const confirm = (response) => {
    const { access_token, user } = response;
    if (access_token) {
      setCookie(USER, user);
      setCookie(ACCESS_TOKEN, access_token);
    } else {
      setLoading(false);
      console.log(response.message)
    }
  }

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);
    fetch(`${REACT_APP_API_URL}/api/v1/auth/login`, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then(response => response.json())
    .then(response => {
      confirm(response);
    })
    .catch(err => {
      debugger
      console.log(err);
    });
  };

  if (token) {
    window.location.href = '/orders';
  }


  return (
    <AuthForm>
      <form
        onSubmit={onFormSubmit}
        method="post"
      >
        <div className="form-group">
            <label className="input-label" for="email">Email address:</label>
            <input 
              type="email" 
              name="email"
              className="form-control" 
              id="email" 
              required
              value={email}
              onChange={onInputChange}
              error={get('email', formErrors)}
            />
          </div>
          <div className="form-group">
            <label className="input-label" for="pwd">Password:</label>
            <input 
              type="password"
              name="password"
              className="form-control" 
              id="pwd"
              required
              value={password}
              onChange={onInputChange}
            />
          </div>
        <div className="checkbox">
          <label className="input-label"><input type="checkbox" /> Remember me</label>
        </div>
        <br></br>
        <SubmitButton className="form-group">
          <button 
            type="submit" 
            className="btn btn-default"
            disabled={loading}
          >
            Submit
            {loading && (
              <CustomeSpinner size="sm" />
            )}
          </button>
        </SubmitButton>
      </form>
    </AuthForm>
  );
};

export default Signin;
