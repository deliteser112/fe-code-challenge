import './App.css';
import Router from '@/router';
import Navbar from '@/components/Navbar';

function App() {
  return (
    <div className="App">
      <div className="header">
        <p className="title">STONKS</p>
        <Navbar />
      </div>
      <Router />
    </div>
  );
}

export default App;
