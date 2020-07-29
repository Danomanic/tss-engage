import React from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import QueryString from 'querystring';
import Cookies from 'universal-cookie';


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
      fetch("http://localhost:3002/auth/authenticated", {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: cookies.get('token'),
        }),
      })
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
            if (result.authenticated === true) {
              setIsLoggedIn(true);
            } else {
              setIsLoggedIn(false);
            }
            setIsLoaded(true);
          },
          (error) => {
            setIsLoggedIn(false);
            setIsLoaded(true);
            setError(error);
          }
        )
    } else {
      setIsLoaded(true);
    }
  }, [])


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    if (!isLoggedIn) {
      return <Login />;
    } else {
      return <Dashboard />;
    }
  }
}

export default App;
