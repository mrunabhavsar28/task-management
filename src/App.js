import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './redux/store';
import { saveState } from './localStorage';
import { AnimatedRoutes} from './AnimatedRoutes';

function App() {

  store.subscribe(() => {
    saveState({
      tasks:store.getState().tasks
    });
  });

  return (
    <Router>
      <AnimatedRoutes></AnimatedRoutes>
    </Router>
  );
}

export default App;

