import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Footer from './Footer'; // Assuming you want this inside App
import MainContent from './MainContent'; // Assuming you want this to be part of a route
import LoginForm from './loginForm'; // Assuming you want this to be part of a route
import { BrowserRouter } from 'react-router-dom';
import HeroSection from './HeroSection'; 
import Blogs from './Blogs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    
      {/* <HeroSection/>    */}
        <App />  

    <  Footer/>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
