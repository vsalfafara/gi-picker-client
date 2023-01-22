import io from "socket.io-client"
import { ssSetPlayer, ssSetUser } from "../storage/session"
import { User } from "../types/storage"

const socket = io(import.meta.env.VITE_SOCKET)

socket.on('setUser', (user: User) => {
  ssSetUser(user)
})

socket.on('setPlayer', (player: number) => {
  ssSetPlayer(player)
})

export default socket