import Welcome from './components/Welcome';
import Homepage from './components/Homepage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
      <div className="footer fixed-bottom text-center"> 
          <Row>
            <Col md={6}>
              <p>Todo Time © {new Date().getFullYear()}</p>
            </Col>
            <Col md={6}>
              <p>Developed by: <a href="https://www.cambaffuto.com" rel="noopener noreferrer nofollow" target="_blank" className="footerLink">Cam Baffuto</a></p>    
            </Col>              
          </Row>  
        </div>
    </div>
  );
}

export default App;
