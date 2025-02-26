import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'


const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App/>
        </PersistGate>
      </Provider>
    </StrictMode>,
  );
} else {
  console.error("Root element not found");
}
