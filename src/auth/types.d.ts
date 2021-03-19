export interface LoginData {
    username: string,
    password: string
}

export interface Tokens {
    token: string,
    refreshToken: string
}

export interface User {
    username: string,
    roles: Array,
    iat: number,
    exp: number
}