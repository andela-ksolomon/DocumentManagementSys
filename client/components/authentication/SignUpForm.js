/* global Materialize */
/* global $ */
import React, { PropTypes } from 'react';

import TextInput from '../common/TextInput';
/**
* @class SignUpForm
* @classdesc signup form react component
*/
class SignUpForm extends React.Component {

  /**
   * constructor - contains the class properties
   * @param  {object} props property value
   * @param {Object} context class context
   * @return {void} returns void or no return
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
    this.clearError = this.clearError.bind(this);
    this.openModal = this.openModal.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  /**
   * onChange - onChange event for input field
   * @param  {object} event event property handler
   * @return {void} returns void or no return
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  onConfirm(event) {
    const input = event.target.value;
    const errors = {};
    let invalid = false;
    const password = this.state.password;
    if (input !== password) {
      errors.confirm = 'Password do not match';
      invalid = true;
    }
    this.setState({
      errors,
      invalid
    });
  }

  /**
   * onSubmit - onSubmit event handler
   * @param  {object} event event property handler
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({
      errors: {}
    });
    const { errors, isValid } = this.validateUserInput(this.state);
    if (!isValid) {
      this.props.saveUserDetails(this.state)
      .then(() => {
        Materialize.toast('Signed up Successfully, Welcome!', 1000, 'green',
        () => {
          this.context.router.push('/dashboard');
        });
      });
    } else {
      this.setState({
        errors
      });
    }
  }


  /**
   * openModal - opens the Login Modal
   * @return {void} no return or void
   */
  openModal() {
    $('#modal1').modal('open');
  }

  /**
   * checkUserExists - checks if user with details already exist
   * @param  {object} event the event handler
   * @return {void} no return or void
   */
  checkUserExists(event) {
    const field = event.target.name;
    const val = event.target.value;
    if (val !== '') {
      this
      .props
      .isUserExists(val)
      .then((res) => {
        const errors = this.state.errors;
        let invalid;
        if (res.data.user) {
          errors[field] = `${field} already exists`;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  }

  /**
   * clearError - clears error when onFocus
   * @param  {object} event the event handler
   * @return {void} no returns or void
   */
  clearError(event) {
    const field = event.target.name;
    const errors = this.state.errors;
    if (errors[field] !== null) {
      errors[field] = '';
      const invalid = false;
      this.setState({ errors, invalid });
    }
  }

  /**
   * validateUserInput - validate users input
   * @param  {Object} state contains the user details
   * @return {Boolean} returns true or false
   */
  validateUserInput(state) {
    const errors = {};
    let isValid = false;
    const regexp = /\S+@\S+\.\S+/;
    if (!(regexp.test(state.email))) {
      errors.email = 'Please Enter a valid email address';
    }
    if (!(state.username.length >= 5)) {
      errors.username = 'Username must have a minimum of 5 characters';
    }
    if (!(state.password.length >= 8)) {
      errors.password = 'Password should have a minimum of 8 characters';
    }
    if (Object.keys(errors).length !== 0) {
      isValid = true;
    }
    return {
      errors,
      isValid
    };
  }
  /**
   * render - renders content to the view
   * @return {object} return an object
   */
  render() {
    const { errors } = this.state;
    return (<form className="col s12" onSubmit={this.onSubmit} method="post">
      <span>
      Already a member?
      <a
        data-target="modal1"
        className="orange-text modal-trigger"
      >  Login Now
      </a>
      </span>
      <div className="row">
        <div className="col s12" />
      </div>
      <div className="row">
        <TextInput
          type="text"
          className="input-field col m6 s12"
          name="firstname"
          id="firstname"
          onChange={this.onChange}
          error={errors.firstname}
          label="First Name"
          required
        />
        <TextInput
          className="input-field col m6 s12"
          type="text"
          name="lastname"
          id="lastname"
          onChange={this.onChange}
          error={errors.lastname}
          label="Last Name"
          required
        />
      </div>
      <div className="row">
        <TextInput
          className="input-field col m6 s12"
          type="text"
          name="username"
          id="username"
          onChange={this.onChange}
          error={errors.username}
          onBlur={this.checkUserExists}
          onFocus={this.clearError}
          label="Username"
          required
        />
        <TextInput
          className="input-field col m6 s12"
          type="email"
          name="email"
          id="email"
          onChange={this.onChange}
          error={errors.email}
          onBlur={this.checkUserExists}
          onFocus={this.clearError}
          label="Email Address"
          required
        />
      </div>
      <div className="row">
        <TextInput
          className="input-field col m6 s12"
          type="password"
          name="password"
          id="password"
          onChange={this.onChange}
          error={errors.password}
          onFocus={this.clearError}
          label="Password"
        />
        <TextInput
          className="input-field col m6 s12"
          type="password"
          name="confirm"
          id="confirm"
          onChange={this.onConfirm}
          error={errors.confirm}
          label="Confirm Password"
          required
        />
      </div>
      <center>
        <a className="orange-text" href="#!"><b>Forgot Password?</b></a>
      </center>
      <br />
      <br />
      <center>
        <div className="row">
          <button
            type="submit"
            name="btn_login"
            className="col s12 btn btn-large waves-effect light-blue darken-3"
            disabled={this.state.invalid}
          > Create Account </button>
        </div>
      </center>
    </form>
    );
  }
}
SignUpForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

SignUpForm.propTypes = {
  saveUserDetails: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired
};
export default SignUpForm;