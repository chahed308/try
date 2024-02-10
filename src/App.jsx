import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserContext } from './UserContext';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from an API or localStorage on component mount
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://api.example.com/user');
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();

    // Clean-up function
    return () => {
      // Perform any clean-up necessary
    };
  }, []); // Empty dependency array to run only on component mount

  return (
    <Router>
      <div className="app">
        <UserContext.Provider value={{ user, setUser }}>
          <Navbar />
          <div className="content">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/contact" component={ContactPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
          <Footer />
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
