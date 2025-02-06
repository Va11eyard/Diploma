import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000, // 10 second timeout
})

// Add request interceptor for error handling
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

// Define a type for the expected error structure
interface ApiError {
  isAxiosError: boolean
  response?: {
    data?: {
      detail?: string
    }
    status?: number
  }
  request?: any
  message?: string
}

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const apiError = error as ApiError
    if (apiError.isAxiosError) {
      if (apiError.response) {
        console.error("Response error:", apiError.response.data)
        throw new Error(
          apiError.response.data?.detail || `Error ${apiError.response?.status || "unknown"}: An error occurred`,
        )
      } else if (apiError.request) {
        console.error("Network error:", apiError.request)
        throw new Error("Network error. Please check your connection.")
      }
    } else {
      console.error("Unexpected error:", apiError.message)
      throw new Error("An unexpected error occurred.")
    }
  },
)

export default api

