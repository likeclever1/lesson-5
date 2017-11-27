import React from 'react';
import { authorizeUser, isAuthorized } from './AuthorizeApi';
import { Redirect } from 'react-router-dom';

class Auth extends React.Component {
  constructor(props) {
    super();

    this.state = {
      attempt: 0,
      isAuthorized: isAuthorized
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
  handleSubmit() {
    const {
      email,
      password
    } = this.state;

    const isAuthorized = authorizeUser(email, password);
    this.setState(state => ({
      isAuthorized,
      attempt: state.attempt+1
    }));
  }
  render() {
    const {
      isAuthorized,
      attempt
    } = this.state;

    return (
      <form>
        <input placeholder="email" type="text" name="email" onChange={ this.handleEmailChange } />
        <input placeholder="password" type="text" name="password" onChange={ this.handlePasswordChange } />

        <button type="reset" onClick={this.handleSubmit}>Submit</button>
        {attempt > 0 && isAuthorized === false
          ?  <p className="error">invalid email or password, try again</p>
          : null}
        
        {isAuthorized === true && <Redirect to="/" />}
      </form>
    );
  }
}

export default Auth;
