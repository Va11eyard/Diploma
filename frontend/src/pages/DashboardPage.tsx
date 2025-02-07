import type React from "react"
import { Link } from "react-router-dom"
import { FiUsers, FiVideo } from "react-icons/fi"

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary">Welcome to Transport Scoreboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/users"
          className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="flex items-center">
            <FiUsers className="text-4xl text-black mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-primary mb-2">Manage Users</h2>
              <p className="text-gray-600">View, add, edit, and delete user accounts</p>
            </div>
          </div>
        </Link>
        <Link
          to="/videos"
          className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="flex items-center">
            <FiVideo className="text-4xl text-black mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-primary mb-2">Manage Videos</h2>
              <p className="text-gray-600">Upload, organize, and control video content</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default DashboardPage

