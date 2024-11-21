import logo from './logo.svg';
import Form from './components/form'; 
import Barcode from './components/barcode';
import View from './components/view';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
    <Router>
          <Routes>
            <Route path="/" element={<Barcode/>} />
            <Route path="/form" element={<Form/>} /> 
            <Route path="/view" element={<View/>}/>
          </Routes>
        </Router>        
   
    </div>
  );
}

export default App;
