import api from "./api"

interface LoginResponse {
  access_token: string
  token_type: string
}

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post<LoginResponse>(
      "/login",
      new URLSearchParams({
        username: email,
        password: password,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    )
    localStorage.setItem("token", response.data.access_token)
    return response.data
  } catch (error: any) {
    console.error("Login error:", error.message)
    throw new Error(error.message || "Login failed. Please try again.")
  }
}

export const register = async (email: string, password: string) => {
  try {
    const response = await api.post<{ message: string }>("/register", { email, password })
    return response.data
  } catch (error: any) {
    console.error("Registration error:", error.message)
    throw new Error(error.message || "Registration failed. Please try again.")
  }
}

export const resetPasswordRequest = async (email: string) => {
  try {
    const response = await api.post<{ message: string }>("/reset-password-request", { email })
    return response.data
  } catch (error: any) {
    console.error("Reset password request error:", error.message)
    throw new Error(error.message || "Failed to send reset password email. Please try again.")
  }
}

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const response = await api.post<{ message: string }>("/reset-password", { token, new_password: newPassword })
    return response.data
  } catch (error: any) {
    console.error("Reset password error:", error.message)
    throw new Error(error.message || "Failed to reset password. Please try again.")
  }
}

export const logout = () => {
  localStorage.removeItem("token")
}

