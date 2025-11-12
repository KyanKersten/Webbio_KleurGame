import Header from './components/Header';
import ColorGrid from './components/ColorGrid';
import Footer from './components/Footer';

import "./index.css";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main>
        <ColorGrid />
      </main>

      <Footer />
    </div>
  );
}

export default App
