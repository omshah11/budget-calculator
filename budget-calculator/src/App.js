import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import EachMonthPage from './pages/EachMonth';
import MonthListPage from './pages/MonthList';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <h1>Budget Calculator</h1>
      <div id="page-body">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/:monthId' element={<EachMonthPage />} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
