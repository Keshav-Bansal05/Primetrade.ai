import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer
    position="top-right"
    autoClose={1000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    draggable
    pauseOnHover={false}      // Prevents pause on hover
    pauseOnFocusLoss={false}   // Prevents pause on window focus loss
    theme="light"              // Set to "light", "dark", or "colored" based on preference
/>
    <App />
  </React.StrictMode>,
)