import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}