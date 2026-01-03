import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('Initializing React App...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found!');
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('React App mounted successfully.');
} catch (error) {
  console.error('Error mounting React App:', error);
}