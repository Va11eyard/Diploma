import type React from "react"
import Login from "../components/Auth/Login"

interface LoginPageProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginPage: React.FC<LoginPageProps> = ({ setIsAuthenticated }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Login setIsAuthenticated={setIsAuthenticated} />
    </div>
  )
}

export default LoginPage

