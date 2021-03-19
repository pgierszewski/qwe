import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import AuthManager from './src/auth/authManager';
import { User } from './src/auth/types'
import Login from './views/Login';

const App: React.FC = () => {
  const [user, setUser] = useState<User>({username: "", roles: [], iat: 0, exp: 0})
  useEffect(() => {
    getUser()
  }, [])

  const getUser = async() => {
    try {
      const user = await AuthManager.getUser()
      setUser(user)
      console.log(user)
    } catch (e) {
  
    }
  }
  return (
    <View>
      <Login/>
      <div>{user.username}</div>
    </View>
  );
}

export default App