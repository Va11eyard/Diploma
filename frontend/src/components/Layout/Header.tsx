"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import { logout } from "../../services/auth"
import { FiLogOut, FiUser } from "react-icons/fi"

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
    <header className="bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold text-white">Transport Scoreboard</h1>
          </div>
          <div className="flex items-center">
            <button
              className="bg-black hover:bg-green-500 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out flex items-center"
              onClick={handleLogout}
            >
              <FiLogOut className="mr-2" size={18} />
              Logout
            </button>
            <div className="ml-4 flex items-center">
              <FiUser className="text-white" size={20} />
              <span className="ml-2 text-sm font-medium text-white">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

