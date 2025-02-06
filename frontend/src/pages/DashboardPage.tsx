import type React from "react"
import { Link } from "react-router-dom"

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Transport Scoreboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/users"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-center transition duration-300 ease-in-out"
        >
          Manage Users
        </Link>
        <Link
          to="/videos"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-center transition duration-300 ease-in-out"
        >
          Manage Videos
        </Link>
      </div>
    </div>
  )
}

export default DashboardPage

