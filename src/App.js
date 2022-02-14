import Welcome from './components/Welcome';
import Homepage from './components/Homepage';
import Time from './components/Time';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/time" element={<Time />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
