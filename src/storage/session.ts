import CryptoJS from 'crypto-js';
import { User } from '../types/storage'

const key = import.meta.env.VITE_CRYPTO_SECRET

export const ssSetUser = (user: User) => {
  const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(user), key).toString();
  sessionStorage.setItem('user', encryptedUser)
}

export const ssGetUser = () => {
  const user = sessionStorage.getItem('user')
  if (user) {
    const decryptedUser = CryptoJS.AES.decrypt(user, key)
    return JSON.parse(decryptedUser.toString(CryptoJS.enc.Utf8))
  }
  return false
}

export const ssSetPlayer = (player: number) => {
  sessionStorage.setItem('player', player.toString())
}

export const ssGetPlayer = () => {
  return Number(sessionStorage.getItem('player'))
}

export const ssSetSelection = (selection: any) => {
  const encryptedSelection = CryptoJS.AES.encrypt(JSON.stringify(selection), key).toString();
  sessionStorage.setItem('selection', encryptedSelection)
}

export const ssGetSelection = () => {
  const selection = sessionStorage.getItem('selection')
  if (selection) {
    const decryptedSelection = CryptoJS.AES.decrypt(selection, key)
    return JSON.parse(decryptedSelection.toString(CryptoJS.enc.Utf8))
  }
  return false
}



export const clearLocalStorage = () => {
  sessionStorage.clear();
}