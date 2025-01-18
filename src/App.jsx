import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import TrackingPage from "./pages/tracking";
import DeliveryPage from "./pages/delivery";

import Navbar from "./includes/Navbar";
import Footer from "./includes/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <main className="flex-1 max-w-[1000px] mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/tracking" replace />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="/delivery" element={<DeliveryPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
