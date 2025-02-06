import type React from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import UsersPage from "./pages/UsersPage"
import VideosPage from "./pages/VideosPage"
import Header from "./components/Layout/Header"
import Sidebar from "./components/Layout/Sidebar"
import ResetPasswordRequest from "./components/Auth/ReserPasswordRequest"
import ResetPassword from "./components/Auth/ResetPassword"

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("token")

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {!isAuthenticated ? (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/reset-password-request" element={<ResetPasswordRequest />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        ) : (
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                <div className="container mx-auto px-6 py-8">
                  <Routes>
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/videos" element={<VideosPage />} />
                    <Route path="/" element={<Navigate to="/users" replace />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
              </main>
            </div>
          </div>
        )}
      </div>
    </Router>
  )
}

export default App

