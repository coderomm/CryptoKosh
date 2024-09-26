import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
// import Topbar from './components/Topbar'
import Landing from './pages/Landing'
import WalletManager from './pages/WalletManager'
import { Toaster } from 'sonner';
import TokenLaunchpad from './pages/TokenLaunchpad';

function App() {
  return (
    <>
      <Router>
        {/* <Topbar /> */}
        <Toaster />
        <section className="min-h-screen">
          <section className="min-h-screen">
            <Header />
            <main>
              <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/generate-mnemonic' element={<WalletManager />} />
                <Route path='/v2/token-launchpad' element={<TokenLaunchpad />} />
              </Routes>
            </main>
          </section>
          <Footer />
        </section>
      </Router>
    </>
  )
}

export default App
