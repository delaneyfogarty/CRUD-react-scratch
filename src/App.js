import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import './App.css';
import AuthPage from './AuthPage';
import ListPage from './ListPage';
import CreatePage from './CreatePage';
import UpdatePage from './UpdatePage';
import { getUser, logout } from './services/fetch-utils';

export default function App() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const user = getUser();
    if (user) {
      setToken(user.access_token);
      setEmail(user.user.email);
    }
  }, []);

  async function handleLogout() {
    await logout();
    setEmail('');
    setToken('');
  }

  return (
    <Router>
      <div className="App">
        <header>
          <div className="buttons">
            {token && (
              <>
                <NavLink exact className="active-link" to="/cats">
                  Kitty List
                </NavLink>
                <NavLink exact className="active-link" to="/create">
                  Create A Cat
                </NavLink>
                <button onClick={handleLogout}>Logout</button>
              </>
            )}
          </div>
          <p>{email}</p>
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              {token ? (
                <Redirect to="/cats" />
              ) : (
                <AuthPage setEmail={setEmail} setToken={setToken} />
              )}
            </Route>
            <Route exact path="/cats">
              {token ? <ListPage /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/cats/:id">
              {token ? <UpdatePage /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/create">
              {token ? <CreatePage /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
