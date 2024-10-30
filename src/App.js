import logo from './logo.svg';
import Form from './components/form'; 
import Barcode from './components/barcode';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/barcode" element={<Barcode/>} /> 
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
