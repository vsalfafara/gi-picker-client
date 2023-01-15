import { resetCharacters } from '@/data/data'
import { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Card from '../../components/Card/Card'
import Dialog from '../../components/Dialog/Dialog'
import FormItem from '../../components/FormItem/FormItem'
import Radio from '../../components/Input/Radio'
import NotificationContext from '../../context/NotifcationContext'
import socket from  '../../socket/socket'
import { lsGetUser } from '../../storage/localStorage'
import { User } from '../../types/storage'

const Room = () => {
  const navigate = useNavigate();
  const {notificationHandler} = useContext(NotificationContext)
  const [showDialog, setShowDialog] = useState(false)
  const [gameType, setGameType] = useState<string>()
  const [gameTypeError, setGameTypeError] = useState(false)
  const [mode, setMode] = useState<string>()
  const [modeError, setModeError] = useState(false)
  const [players, setPlayers] = useState<User[]>([])
  const [firstPick, setFirstPick] = useState<string>()
  const [firstPickError, setFirstPickError] = useState(false)
  const { roomId } = useParams()
  const [user, _] = useState(lsGetUser())

  useEffect(() => {
    if (user) {
      socket.emit('rejoinRoom', user)
      if (user.isHost) {
        socket.emit('getAllPlayersInRoom', user.roomId)
      }
    }
    return () => {
      socket.off('rejoinRoom')
    }
  }, [])
  
  useEffect(() => {
    socket.on('getAllPlayersInRoom', (users: User[]) => setPlayers(users))
    resetCharacters()
    socket.on('startGame', (mode: string) => {
      navigate(`/game?mode=${mode}`)
    })
    return () => {
      socket.off('getAllPlayersInRoom');
      socket.off('startGame');
    }
  }, [socket])
  
  function copyLink() {
    if (roomId) {
      navigator.clipboard.writeText(`${window.location.host}/${roomId}`)
      
      notificationHandler({
        type: 'success',
        message: 'Room link is copied!',
        withIcon: true
      })
    } else {
      notificationHandler({
        type: 'danger',
        message: 'Something went wrong...',
        withIcon: true
      })
    }
  }

  function openInfo() {
    setShowDialog(true)
  }

  function closeInfo() {
    setShowDialog(false)
  }

  function startGame() {
    const form = {
      gameType,
      mode,
      players,
      firstPick: Number(firstPick),
      roomId
    }
    socket.emit('startGame', form)
  }

  return (
    <>
      <div className='inset-0 flex items-center justify-center'>
        {
          user.isHost ? 
          <div className="mr-2">
          <Card title="Game Settings" className='w-[30rem]'>
            <FormItem label="Game Type" labelPosition='left' labelWidth="w-[7rem]">
              <div className='flex'>
                <Radio name='type' id='std' label='Standard' value='std' onChange={(value: string) => setGameType(value)} />
                <Radio name='type' id='abyss' label='Abyss Floor 12' value='abyss' onChange={(value: string) => setGameType(value)} disabled />
              </div>
            </FormItem>
            {
              gameType === 'std'
              && 
              <FormItem label="Mode" labelPosition='left' labelWidth="w-[7rem]">
                <div className='flex'>
                  <Radio name='mode' id='1v1' label='1v1' value='1v1' onChange={(value: string) => setMode(value)} />
                  <Radio name='mode' id='2v2' label='2v2' value='2v2' onChange={(value: string) => setMode(value)} />
                  <Radio name='mode' id='3v3' label='3v3' value='3v3' onChange={(value: string) => setMode(value)} />
                  <Radio name='mode' id='4v4' label='4v4' value='4v4' onChange={(value: string) => setMode(value)} />
                </div>
              </FormItem>
            }
            <FormItem label="First Pick" labelPosition='left' labelWidth="w-[7rem]">
              <div className="flex">
                {players.map((player: User, index: any) => {
                  return (
                    <Radio key={player.id} name="first-pick" id={player.id} label={player.name} value={index} onChange={(value: string) => setFirstPick(value)}/>
                  )
                })}
              </div>
            </FormItem>
            <div className="flex justify-end">
              <Button type='text' onClick={() => openInfo()}>Help</Button>
              <Button type='primary' onClick={() => copyLink()}>Share Room Link</Button>
              <Button type='success' disabled={players.length !== 2 || !(gameType && mode && firstPick)} onClick={() => startGame()}>Start Game</Button>
            </div>
          </Card>
        </div>
        :
        <Card>
          <h1>Waiting for the host to start the game...</h1>
        </Card>
        }
      </div>
      <Dialog title='Game Settings' show={showDialog} width="w-[500px]" handleCloseOutside={closeInfo}>
        <div className='mt-2'>
          <h3 className='text-md font-semibold mb-1'>Game Type</h3>
          <p className='text-sm text-gray-700 mb-4'>
            Standard is a team versus team setup with a maximum of 4 characters per team. Abyss Floor 12 is an 8 versus 8 team setup <span className="font-semibold">(currently not available)</span>
          </p>
          <h3 className='text-md font-semibold mb-1'>Mode</h3>
          <p className='text-sm text-gray-700 mb-4'>
            <span className="font-semibold">(Standard only)</span> Choose 1 of specific team sizes
          </p>
          <h3 className='text-md font-semibold mb-1'>First Pick</h3>
          <p className='text-sm text-gray-700 mb-4'>
            Choose which player to go first <span className="font-semibold">(options will be visible once players enter the room)</span>
          </p>
          <p className='text-sm text-gray-700 mb-4'>
            In order for the game master to start the game, the room must consist of at least 2 players.
          </p>
        </div>
        <div className='mt-8 flex justify-end'>
          <Button size="sm" onClick={closeInfo}>Got it, thanks!</Button>
        </div>
      </Dialog>
    </>
  )
}

export default Room