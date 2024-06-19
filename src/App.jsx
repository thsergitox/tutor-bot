import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EBook from './pages/EBook';
import PrincipalMenu from './pages/PrincipalMenu';
import Chatbot from './pages/Chatbot';
import Quiz from './pages/Quiz';
import Historial from './pages/Historial';
import CreateQuiz from './pages/CreateQuiz';
import Score from './pages/Score';
import Login from './pages/Login';
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute';


function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ebook" element={<PrivateRoute><EBook /></PrivateRoute>} />
        <Route path="/principalmenu" element={<PrivateRoute><PrincipalMenu /></PrivateRoute>} />
        <Route path="/chatbot" element={<PrivateRoute><Chatbot /></PrivateRoute>} />
        <Route path="/quiz" element={<PrivateRoute><Quiz /></PrivateRoute>} />
        <Route path='/history' element={<PrivateRoute><Historial /></PrivateRoute>} />
        <Route path='/createquiz' element={<PrivateRoute><CreateQuiz /></PrivateRoute>} />
        <Route path='/score' element={<PrivateRoute><Score /></PrivateRoute>} />
        <Route path = '/login' element = {<Login/>}/>
        <Route path = '/register' element = {<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;
