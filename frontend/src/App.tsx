import Navbar from "./components/Navbar";
import ContentWrapper from "./components/ContentWrapper";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Transfer from "./pages/Transfer";
import { AuthProvider } from "./context/AuthProvider";

export default function App() {

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <ContentWrapper>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/transfer" element={<Transfer />} />
          </Routes>
        </ContentWrapper>
      </Router>
    </AuthProvider>
  )
}