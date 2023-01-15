import io from "socket.io-client"
import { lsSetPlayer, lsSetUser } from "../storage/localStorage"
import { User } from "../types/storage"

const socket = io(import.meta.env.VITE_SOCKET)

socket.on('setUser', (user: User) => {
  lsSetUser(user)
})

socket.on('setPlayer', (player: number) => {
  lsSetPlayer(player)
})

export default socket