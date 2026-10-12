import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

const boot = document.getElementById('boot')
if (boot) {
  boot.style.opacity = '0'
  setTimeout(() => boot.remove(), 900)
}
