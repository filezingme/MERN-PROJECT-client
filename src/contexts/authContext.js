import {createContext, useReducer, useEffect} from 'react'
import {authReducer} from '../reducers/authReducer'
import {API_URL} from '../constants/commonContant'
import {LOCAL_STORAGE_TOKEN_NAME, SET_AUTH} from '../constants/authConstant'
import axios from 'axios'
import setAuthTokenUtil from '../utils/setAuthTokenUtil'


export const authContext = createContext()


const AuthContextProvider = ({children}) => {
    const [authState, dispath] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })


    //Authenticate user
    const loadUser = async () => {
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthTokenUtil(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }

        try {
            const response = await axios.get(`${API_URL}/auth`)
            if (response.data.success) {
                dispath({
                    type: SET_AUTH, 
                    payload: {isAuthenticated: true, user: response.data.user}
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthTokenUtil(null)

            dispath({
                type: SET_AUTH, 
                payload: {isAuthenticated: false, user: null}
            })
        }
    }


    useEffect(() => {
        loadUser()
    }, [])


    //Login
    const loginUser = async userForm => {
        try {

            const response = await axios.post(`${API_URL}/auth/login`, userForm)

            if (response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)

            await loadUser()
                
            return response.data

        } catch (error) {
            if (error.response.data)
                return error.response.data
            else
                return { success: false, message: error.message }
        }
    }


    //Register
    const registerUser = async userForm => {
        try {

            const response = await axios.post(`${API_URL}/auth/register`, userForm)

            if (response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)

            await loadUser()
                
            return response.data

        } catch (error) {
            if (error.response.data)
                return error.response.data
            else
                return { success: false, message: error.message }
        }
    }


    //Logout
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        
        dispath({
            type: SET_AUTH, 
            payload: {isAuthenticated: false, user: null}
        })
    }


    //Context data
    const authContextData = {loginUser, registerUser, logoutUser, authState}


    ///Return provider
    return (
        <authContext.Provider value={authContextData}>
            {children}
        </authContext.Provider>
    )
}

export default AuthContextProvider