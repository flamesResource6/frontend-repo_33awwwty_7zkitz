import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Test from './Test'
import Trading from './Trading'
import Videos from './Videos'
import Marketplace from './Marketplace'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<Test />} />
        <Route path="/trading" element={<Trading />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
