import axios, { AxiosResponse } from 'axios'
import { Tokens, LoginData } from '../src/auth/types'

const baseUrl = 'http://localhost:1234'

export const postLogin = async (data: LoginData): Promise<AxiosResponse<Tokens>> => {
    const response: AxiosResponse<Tokens> = await axios.post(
        baseUrl + '/api/login', {
            ...data
        }
    )
    return response
}

export const refreshToken = async (tokens: Tokens): Promise<AxiosResponse<Tokens>> => {
    const response: AxiosResponse<Tokens> = await axios.post(
        baseUrl + '/api/token/refresh', {
            refreshToken: tokens.refreshToken
        }
    )
    return response
}