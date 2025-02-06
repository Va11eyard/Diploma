"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import { logout } from "../../services/auth"
import { FiLogOut } from "react-icons/fi"

interface HeaderProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

const Header: React.FC<HeaderProps> = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setIsAuthenticated(false)
    navigate("/login")
  }

  return (
    <header className="bg-primary shadow-lg">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Transport Scoreboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white"
          >
            <FiLogOut className="mr-2" size={16} aria-hidden="true" />
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

