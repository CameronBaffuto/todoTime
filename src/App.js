import Welcome from './components/Welcome';
import Homepage from './components/Homepage';
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
        </Routes>
      </Router>
      <div className="footer fixed-bottom">   
                    <p className="px-2">Todo Time © {new Date().getFullYear()}</p>
                        
                    <p className="px-2">Developed by: <a href="https://www.cambaffuto.com" rel="noopener noreferrer nofollow" target="_blank" className="footerLink">Cam Baffuto</a></p>          
        </div>
    </div>
  );
}

export default App;
