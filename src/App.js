import logo from './logo.svg';
import './App.css';
import ViewportProvider  from './viewportContext'
import Navigate from './Navigate';
function App() {
  return (
    <ViewportProvider>
      <Navigate />
    </ViewportProvider>
  );
}

export default App;
