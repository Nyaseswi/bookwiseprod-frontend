// http://localhost:3000/
import './App.css';
import  Navbar from "./components/Navbar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AddBooks from './pages/AddBooks';
import Books from './pages/Books';
import Home from './pages/Home';
import Footer from './components/Footer';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/addBooks" element={<AddBooks />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={< Dashboard/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
