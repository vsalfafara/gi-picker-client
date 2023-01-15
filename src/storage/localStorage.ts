import CryptoJS from 'crypto-js';
import { User } from '../types/storage'

const key = import.meta.env.VITE_CRYPTO_SECRET

export const lsSetUser = (user: User) => {
  const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(user), key).toString();
  sessionStorage.setItem('user', encryptedUser)
}

export const lsGetUser = () => {
  const user = sessionStorage.getItem('user')
  if (user) {
    const decryptedUser = CryptoJS.AES.decrypt(user, key)
    return JSON.parse(decryptedUser.toString(CryptoJS.enc.Utf8))
  }
  return false
}

export const lsSetPlayer = (player: number) => {
  sessionStorage.setItem('player', player.toString())
}

export const lsGetPlayer = () => {
  return Number(sessionStorage.getItem('player'))
}

export const clearLocalStorage = () => {
  sessionStorage.clear();
}