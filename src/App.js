import React from 'react';
import './App.css';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import {addListener, removeListener, isAuthorized} from './AuthorizeApi';
import Home from './Home';
import Public from './Public';
import Private from './Private';
import Auth from './Auth';

class App extends React.Component {
  state = {
    isAuthorized
  };

  componentDidMount() {
    addListener(this.handleAuthorize);
  }

  componentWillUnmount() {
    removeListener(this.handleAuthorize);
  }

  handleAuthorize = isAuthorized => {
    this.setState({isAuthorized});
  };

  render() {
    const {
      isAuthorized
    } = this.state;

    return (
      <div>
        <nav>
          <ul>
            <li><Link to="/auth">Войти</Link></li>
            <li><Link to="/private">Секретная страница</Link></li>
            <li><Link to="/public">Публичная страница</Link></li>
            <li><Link to="/">Главная</Link></li>
          </ul>  
        </nav>

        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/public" component={Public} />
            {isAuthorized && <Route path="/private" component={Private} />}
            <Route path="/auth" component={Auth} />
            {!isAuthorized && <Redirect from="/private" to="/auth" />}
            <Redirect to="/" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
