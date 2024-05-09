import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {  QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import store from './redux/store.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Formm from './components/Form.jsx'
import Charts from './components/Charts.jsx'
import Display_Table from './components/Table.jsx'
import Navbar from './components/Navbar.jsx'
import Siderrr from './components/Sider.jsx'

const queryClient=new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter>
   <Navbar />

        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/sider" element={<Siderrr />} />
          <Route path="/home" element={<App />} />
          <Route path="/form" element={<Formm />} />
          <Route path="/table" element={<Display_Table />} />
          <Route path="/charts" element={<Charts />} />
          
        </Routes>
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>
</React.StrictMode>
  
)
