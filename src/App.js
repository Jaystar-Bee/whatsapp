
import Router from './Router/Router';
import classes from './App.module.css';
import UserContextProvider from './store/userContext';

function App() {

  return (
    <main className={classes.main}>
      <UserContextProvider>
        <Router></Router>
      </UserContextProvider>
    </main>

  );
}

export default App;
