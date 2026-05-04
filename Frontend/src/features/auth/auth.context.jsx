import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api.js";


export const AuthContext = createContext()


export const AuthProvider = ({ children }) => { 

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Check for existing session ONCE when the app mounts
    useEffect(() => {
        const checkSession = async () => {
            try {
                console.log("🔄 Checking user session...")
                const data = await getMe()
                console.log("✅ User session found:", data.user)
                setUser(data.user)
            } catch (err) {
                console.log("ℹ️ No active session")
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        checkSession()
    }, [])

    return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading}} >
            {children}
        </AuthContext.Provider>
    )

    
}