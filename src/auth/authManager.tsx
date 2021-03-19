import AsyncStorage from '@react-native-async-storage/async-storage'
import { postLogin, refreshToken } from '../../utils/api'
import { LoginData, Tokens, User } from './types'
import jwt_decode from "jwt-decode";

const emptyTokens: Tokens = {token: "", refreshToken: ""}
const emptyUser: User = {username: "", roles: [], iat: 0, exp: 0}

class AuthManager
{
    async getUser(): Promise<User> {
        let tokens = await this.getTokens()

        if (tokens.token == '') {
            return emptyUser
        }

        let user: User = jwt_decode(tokens.token)

        return user
    }

    async refreshToken() {
        let tokens = await this.getTokens()
        let response = await refreshToken(tokens)

        console.log(response.data)
        await AsyncStorage.setItem(
            '@Store:user',
            JSON.stringify(response.data)
        )
    }

    async getTokens(): Promise<Tokens> {
        let tokens = await AsyncStorage.getItem('@Store:user')

        if (tokens) {
            return JSON.parse(tokens);    
        }
        
        return emptyTokens
    }

    async login(loginData: LoginData) {
        let response = await postLogin(loginData)
        console.log(response.data)
        await AsyncStorage.setItem(
            '@Store:user',
            JSON.stringify(response.data)
        )
    }

    async logout() {
        await AsyncStorage.removeItem('@Store:user')
    }
}

export default new AuthManager