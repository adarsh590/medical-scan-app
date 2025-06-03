import logo from './logo.svg';
import './App.css';
import MedicalScanUploader from './MedicalScanUploader';
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>Medical Scan Upload</h1>
      <MedicalScanUploader />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Upload image
        </a>
      </header>
    </div>
  );
}

export default App;
