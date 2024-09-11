import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Topbar from './components/Topbar'
import Landing from './pages/Landing'
import WalletManager from './pages/WalletManager'
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <Router>
        <Topbar />
        <Toaster />
        <section className="min-h-[90vh] bg-gradient-to-bl from-black via-teal-900 to-purple-900">
          <Header />
          <main>
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/generate-mnemonic' element={<WalletManager />} />
            </Routes>
          </main>
        </section>
        <Footer />
      </Router>
    </>
  )
}

export default App
