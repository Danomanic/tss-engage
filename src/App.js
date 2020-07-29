import React from 'react';
import './App.css';
import Login from './components/Login';

function App() {

  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    fetch("http://localhost:3002/auth/authenticated")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  return (
   <Login />
  );
}

export default App;
