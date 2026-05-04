import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout } from "../services/auth.api.js";



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context


    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            console.log("🔐 Attempting login with:", email)
            const data = await login({ email, password })
            console.log("✅ Login successful, user:", data.user)
            setUser(data.user)
            return data.user
        } catch (err) {
            console.error("❌ Login failed:", err.response?.data || err.message)
            alert("Login failed: " + (err.response?.data?.message || err.message))
            throw err
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            console.log("📝 Attempting register with:", email)
            const data = await register({ username, email, password })
            console.log("✅ Register successful, user:", data.user)
            setUser(data.user)
            return data.user
        } catch (err) {
            console.error("❌ Register failed:", err.response?.data || err.message)
            alert("Registration failed: " + (err.response?.data?.message || err.message))
            throw err
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            console.log("👋 Logging out...")
            const data = await logout()
            console.log("✅ Logout successful")
            setUser(null)
        } catch (err) {
            console.error("❌ Logout failed:", err.response?.data || err.message)
        } finally {
            setLoading(false)
        }
    }

    return { user, loading, handleRegister, handleLogin, handleLogout }
}