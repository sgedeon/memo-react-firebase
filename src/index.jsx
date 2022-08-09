import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Appli from './composants/Appli';

const racine = ReactDOM.createRoot(document.getElementById('racine'));

racine.render(
  <React.StrictMode>
    <Appli />
  </React.StrictMode>
);
