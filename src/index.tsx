import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";

function render() {
  const appContainer = document.getElementById('app');
  ReactDOM.render(<App/>, appContainer);
}

render();

if (module.hot) {
  module.hot.accept('./App', render);
}
