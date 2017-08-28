import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import handlers from './Handlers';

ReactDOM.render(
    <div className="container">
        <App handlers={handlers} />
    </div>,
    document.getElementById('root')
);
registerServiceWorker();
