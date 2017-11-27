import React from 'react';
import { authorizeUser } from './AuthorizeApi';
import { Redirect } from 'react-router-dom';

class Auth extends React.Component {
  constructor(props) {
    super();

    this.state = {
      isAuthorized: null
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
    this.setState({
      isAuthorized
    });
  }
  render() {
    const {
      isAuthorized
    } = this.state;

    return (
      <div>
        <input placeholder="email" type="text" name="email" onChange={ this.handleEmailChange } />
        <input placeholder="password" type="text" name="password" onChange={ this.handlePasswordChange } />

        <button onClick={this.handleSubmit}>Submit</button>
        {isAuthorized === false
          ?  <p className="error">invalid email or password, try again</p>
          : null}
        
        {isAuthorized === true && <Redirect to="/" />}
      </div>
    );
  }
}

export default Auth;
