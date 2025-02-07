"use client"

import type React from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { FiHome, FiUsers, FiVideo, FiMenu, FiX } from "react-icons/fi"

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const navItems = [
    { path: "/", icon: FiHome, label: "Home" },
    { path: "/users", icon: FiUsers, label: "Users" },
    { path: "/videos", icon: FiVideo, label: "Videos" },
  ]

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed p-3 bg-black text-white rounded-r-md lg:hidden z-20 mt-3 ml-2 shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar Container */}
      <div
        className={`bg-black text-white w-64 space-y-6 py-6 px-4 absolute inset-y-0 left-0 transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-10 min-h-screen shadow-lg`}
      >
        {/* Logo / Branding */}
        <div className="text-center text-xl font-bold mb-6 tracking-wide">
          Dashboard
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center py-3 px-4 rounded-lg transition-all duration-200 font-medium 
                ${isActive(path) ? "bg-white bg-opacity-20 text-white" : "hover:bg-white hover:bg-opacity-10 text-gray-300"}`}
            >
              <Icon className="mr-3" size={20} />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

export default Sidebar
