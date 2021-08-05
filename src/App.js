import React              from 'react';
import { useMainContext } from './MainContext';
import { HashRouter }     from 'react-router-dom'; // HashRouter generally works better for GitHub, but normally use BrowserRouter.
import Router             from './components/navigation/Router';
import Navigation         from './components/navigation/Navigation';

import './scss/bootstrap/bootstrap-icons.css';
import './scss/bootstrap/custom-bootstrap.scss';
import './scss/App.scss';


function App(){  
  // value gets passed into <Router />, then through the routes to each page.
  const value = useMainContext();

  
  return (
    <HashRouter>
      <header id="primary-header">
        <Navigation />
      </header>

      <main>
        <Router value={value} />
      </main>
    </HashRouter>
  );
}


export default App;

