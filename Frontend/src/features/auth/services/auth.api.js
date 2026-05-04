import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})


/**
 * @description Service to login user with email and password.
 */
export const login = async ({ email, password }) => {
    const response = await api.post("/api/auth/login", { email, password })
    return response.data
}


/**
 * @description Service to register a new user.
 */
export const register = async ({ username, email, password }) => {
    const response = await api.post("/api/auth/register", { username, email, password })
    return response.data
}


/**
 * @description Service to logout user.
 */
export const logout = async () => {
    const response = await api.get("/api/auth/logout")
    return response.data
}


/**
 * @description Service to get currently logged in user details.
 */
export const getMe = async () => {
    const response = await api.get("/api/auth/get-me")
    return response.data
}
