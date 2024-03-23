import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
          <ul className="App-header">
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
