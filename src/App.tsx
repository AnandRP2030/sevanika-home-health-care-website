import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import PatientForm from './components/PatientForm';
import QuickContact from './components/QuickContact';
import Careers from './components/Careers';
import WhyChooseUs from './components/WhyChooseUs';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <PatientForm />
        <QuickContact />
        <Careers />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}

export default App;
