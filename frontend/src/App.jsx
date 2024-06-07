import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { configureWeb3Modal } from "./connection";
import AdminPage from "./components/AdminPage";
import UserPage from "./components/UserPage";
import { Header } from "./components/Header";

configureWeb3Modal();
const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <nav className="bg-gray-800 p-4">
          <ul className="flex space-x-4 justify-center">
            <li>
              <Link to="/" className="text-white hover:text-gray-300">Admin Page</Link>
            </li>
            <li>
              <Link to="/user" className="text-white hover:text-gray-300">User Page</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<AdminPage title='admin' /> } />
          <Route path="/user" element={<UserPage title='user' /> } />
          {/* <Route exact path="/" component={AdminPage} />
          <Route path="/user" component={UserPage} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
