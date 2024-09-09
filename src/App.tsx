import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Topbar from './components/Topbar'
import Landing from './pages/Landing'
import WalletManager from './pages/WalletManager'

function App() {
  return (
    <>
      <Router>
        <Topbar />
        <section className="min-h-[100vh] bg-mobile-bg md:bg-desktop-bg bg-cover bg-center">
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
