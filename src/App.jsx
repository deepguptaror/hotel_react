import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";

import {Hotels} from './component.jsx'
import {Bookings} from './booking.jsx'


function App() {
  return (
    <div className="">
      <Router>
          <ul className="">
            <li><Link to="/"> Hotel list </Link> </li>
            <li> <Link to="/bookings"> Bookings </Link> </li>
          </ul>
          <Routes>
            <Route path="/" element={<Hotels />} > </Route>
            <Route path="/bookings" element={<Bookings />} > </Route>
          </Routes>
        </Router>

    </div>
  );
}

export default App;
