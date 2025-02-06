import type React from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { HomeIcon, UsersIcon, VideoIcon, MenuIcon } from "lucide-react"

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const navItems = [
    { path: "/", icon: HomeIcon, label: "Home" },
    { path: "/users", icon: UsersIcon, label: "Users" },
    { path: "/videos", icon: VideoIcon, label: "Videos" },
  ]

  return (
    <>
      <button
        className="fixed p-2 bg-primary text-white rounded-tr-md rounded-br-md lg:hidden z-20 mt-2 ml-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuIcon size={24} />
      </button>
      <div
        className={`bg-primary text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 transition duration-200 ease-in-out z-10 min-h-screen`}
      >
        <nav className="space-y-2">
          {navItems.map((item) => {
            const IconComponent = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center py-2.5 px-4 rounded transition duration-200 ${
                  isActive(item.path)
                    ? "bg-white bg-opacity-10 text-white"
                    : "hover:bg-white hover:bg-opacity-5 text-gray-300 hover:text-white"
                }`}
              >
                <IconComponent className="mr-3" size={20} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}

export default Sidebar

