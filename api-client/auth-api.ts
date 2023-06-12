import { LoginPayload } from "../models/auth";
import axiosClient from "./axios-client";

export const authApi = {
    login(payload: LoginPayload){
        return axiosClient.post('/login', payload)
    },
    getProfile(){
        return axiosClient.get('/profile')
    },
    logout(){
        return axiosClient.post('/logout')
    }
}