import axios from "axios"
import type { AxiosError } from "axios/index"


const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000, // 10-second timeout
})

// Request Interceptor: Attach Authorization Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error("Request error:", error)
    return Promise.reject(error)
  },
)

// Response Interceptor: Handle API Errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ detail?: string }>) => {
    if (error.response) {
      const status = error.response.status
      const message = error.response.data?.detail || `Error ${status}: An error occurred`

      if (status === 401) {
        console.warn("Unauthorized: Redirecting to login...")
        // Optional: Redirect to login page
        // window.location.href = "/login"
      } else if (status === 403) {
        console.warn("Forbidden: You don’t have permission.")
      }

      console.error("Response error:", message)
      throw new Error(message)
    } else if (error.request) {
      console.error("Network error:", error.request)
      throw new Error("Network error. Please check your connection.")
    } else {
      console.error("Unexpected error:", error.message)
      throw new Error("An unexpected error occurred.")
    }
  },
)

export default api
