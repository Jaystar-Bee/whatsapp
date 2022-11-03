
import Router from './Router/Router';
import classes from './App.module.css';
import UserContextProvider from './store/userContext';
import CoverPage from './components/CoverPage';

function App() {

  return (
    <CoverPage>
      <main className={classes.main}>
        <UserContextProvider>
          <Router></Router>
        </UserContextProvider>
      </main >
    </CoverPage>

  );
}

export default App;
