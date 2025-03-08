import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Secrets from "./pages/Secrets";
import "./styles/App.css";

function Layout() {
  const location = useLocation();
  const isSecretPage = location.pathname === "/secrets";

  return (
    <div className="App">
      {!isSecretPage && <Header />} {/* Hide Header on Secrets page */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/secrets" element={<Secrets />} />
      </Routes>

      {!isSecretPage && <Footer />} {/* Hide Footer on Secrets page */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
