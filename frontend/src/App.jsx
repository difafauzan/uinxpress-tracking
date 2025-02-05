import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import TrackingPage from "./pages/tracking";
import DeliveryPage from "./pages/delivery";

import Navbar from "./includes/Navbar";
import Footer from "./includes/Footer";

function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar
          provider={provider}
          setProvider={setProvider}
          contract={contract}
          setContract={setContract}
        />
        {/* <button onClick={() => console.log("contract: ", contract)}>Cek</button> */}
        <main className="flex-1 max-w-[1000px] mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/tracking" replace />} />
            <Route
              path="/tracking"
              element={<TrackingPage contract={contract} />}
            />
            <Route
              path="/delivery"
              element={<DeliveryPage contract={contract} />}
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
