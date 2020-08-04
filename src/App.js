import React from 'react';
import './App.css';
import QueryString from 'querystring';
import Cookies from 'universal-cookie';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const cookies = new Cookies();

  const query = QueryString.parse(window.location.search);

  React.useEffect(() => {
    if (query.token !== undefined) {
      cookies.set('token', query.token, { path: '/' });
    } else {
      cookies.remove('token');
    }

    if (cookies.get('token') !== undefined) {
      fetch('http://localhost:3002/auth/authenticated', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: cookies.get('token'),
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.authenticated === true) {
              setIsLoggedIn(true);
            } else {
              setIsLoggedIn(false);
            }
            setIsLoaded(true);
          },
          (err) => {
            setIsLoggedIn(false);
            setIsLoaded(true);
            setError(err);
          },
        );
    } else {
      setIsLoaded(true);
    }
  }, []);

  if (error) {
    return <div>Error:{' '}{error.message}</div>;
  } if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (!isLoggedIn) {
    return <Login />;
  } else {
    return <Dashboard />;
  }
}

export default App;
