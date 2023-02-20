import { resetCharacters } from '@/data/data'
import { useState, useContext, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Card from '../../components/Card/Card'
import Dialog from '../../components/Dialog/Dialog'
import FormItem from '../../components/FormItem/FormItem'
import Radio from '../../components/Input/Radio'
import NotificationContext from '../../context/NotifcationContext'
import socket from  '../../socket/socket'
import { AutobanOptions } from "@/data/data"
import { ssGetUser, ssSetAutoban, ssSetSelection } from '../../storage/session'
import { User } from '../../types/storage'
import Select from 'react-select'
import Checkbox from '@/components/Input/Checkbox'
import axios from 'axios'

const Room = () => {
  const navigate = useNavigate();
  const {notificationHandler} = useContext(NotificationContext)
  const [showDialog, setShowDialog] = useState(false)
  const [gameType, setGameType] = useState<string>()
  const [mode, setMode] = useState<number>()
  const [withTimer, setWithTimer] = useState<string>()
  const [time, setTime] = useState<number>()
  const [audience, setAudience] = useState<User[]>([])
  const [players, setPlayers] = useState<User[]>([])
  const [firstPick, setFirstPick] = useState<string>()
  const { roomId } = useParams()
  const [user, _] = useState(ssGetUser())
  const [autoban, setAutoban] = useState<any[]>()

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
    socket.on('getAllPlayersInRoom', (users: User[]) => setAudience(users))
    resetCharacters()
    socket.on('startGame', ({ autoban, gameType, mode, withTimer, game, noOfPicks, noOfBans }) => {
      const selectionArr = game.players.map((player: User) => {
        return {
          player: player,
          selection: {
            picks: {
              characters: Array(Number(noOfPicks)),
              pointer: 0
            },
            bans: {
              characters: Array(Number(noOfBans)),
              pointer: 0
            }
          },
        }
      })
      ssSetSelection(selectionArr)
      ssSetAutoban(autoban)
      navigate(`/game?gameType=${gameType}&withTimer=${withTimer}${mode ? `&mode=${mode}` : ''}`)
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

  function handleSetTime(value: string) {
    setWithTimer(value)
    if (value === 'No') {
      setTime(0)
    }
  }

  function startGame() {
    const form = {
      gameType,
      mode,
      players,
      withTimer,
      time,
      firstPick: Number(firstPick),
      roomId,
      autoban: autoban
    }
    socket.emit('startGame', form)
  }

  function handleChangeAutoban(e: any) {
    setAutoban(e)
  }

  function handleSetPlayers(userId: any) {
    let newPlayers: any = [...players]
    let playerExists = players.find((player: User) => player.id === userId)

    if (!playerExists) {
      const newPlayer = audience.find((user: User) => user.id === userId)
      newPlayers.push(newPlayer)
    }
    if (playerExists) {
      newPlayers = newPlayers.filter((player: User) => player.id !== userId)
    }

    setFirstPick(undefined)

    setPlayers(newPlayers)
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  return (
    <>
      <div className='h-full flex justify-center items-center'>
        {
          user.isHost ? 
          <div className="mr-2">
          <Card title="Game Settings" className='w-[40rem]'>
            <FormItem label="Game Type" labelPosition='left' labelWidth="w-[7rem]">
              <div className='flex flex-wrap w-full'>
                <Radio name='type' id='std' label='Standard' value='std' onChange={(value: string) => setGameType(value)} />
                <Radio name='type' id='abyss' label='Abyss' value='abyss' onChange={(value: string) => setGameType(value)} />
              </div>
            </FormItem>
            {
              gameType === 'std'
              && 
              (
                <FormItem label="Mode" labelPosition='left' labelWidth="w-[7rem]">
                  <div className='flex flex-wrap w-full'>
                    <Radio name='mode' id='1v1' label='1v1' value='1v1' onChange={(value: number) => setMode(value)} />
                    <Radio name='mode' id='2v2' label='2v2' value='2v2' onChange={(value: number) => setMode(value)} />
                    <Radio name='mode' id='3v3' label='3v3' value='3v3' onChange={(value: number) => setMode(value)} />
                    <Radio name='mode' id='4v4' label='4v4' value='4v4' onChange={(value: number) => setMode(value)} />
                    <Radio name='mode' id='kingOfTeyvat' label='King of Teyvat' value='kingOfTeyvat' onChange={(value: number) => setMode(value)} />
                    <Radio name='mode' id='fight2DaTop' label='Fight 2 Da Top' value='fight2DaTop' onChange={(value: number) => setMode(value)} />
                  </div>
                </FormItem>
              )
            }
            <FormItem label="Auto Bans" labelPosition='left' labelWidth="w-[7rem]">
              <Select isMulti closeMenuOnSelect={false} options={AutobanOptions} onChange={handleChangeAutoban} className="w-full" />
            </FormItem>
            <FormItem label="With Timer" labelPosition='left' labelWidth="w-[7rem]">
              <div className='flex flex-wrap w-full'>
                <Radio name='with-timer' id='Yes' label='Yes' value='Yes' onChange={(value: string) => handleSetTime(value)} />
                <Radio name='with-timer' id='No' label='No' value='No' onChange={(value: string) => handleSetTime(value)} />
              </div>
            </FormItem>
            {
              withTimer === 'Yes'
              &&
              (
                <FormItem label="Timer (Seconds)" labelPosition='left' labelWidth="w-[7rem]">
                  <div className='flex flex-wrap w-full'>
                    <Radio name='timer' id='15' label='15' value={15} onChange={(value: number) => setTime(Number(value))} />
                    <Radio name='timer' id='30' label='30' value={30} onChange={(value: number) => setTime(Number(value))} />
                    <Radio name='timer' id='45' label='45' value={45} onChange={(value: number) => setTime(Number(value))} />
                    <Radio name='timer' id='60' label='60' value={60} onChange={(value: number) => setTime(Number(value))} />
                  </div>
                </FormItem>
              )
            }
            <FormItem label="Audience" labelPosition='left' labelWidth="w-[7rem]">
              <div className="flex flex-wrap w-full">
                {audience.map((player: User, index: any) => {
                  return (
                    <Checkbox key={player.id} name="audience" id={index} label={player.name} value={player.id} onChange={(value: string) => handleSetPlayers(value)}/>
                  )
                })}
              </div>
            </FormItem>
            <FormItem label="First Pick" labelPosition='left' labelWidth="w-[7rem]">
              <div className="flex flex-wrap w-full">
                {players.map((player: User, index: any) => {
                  return (
                    <Radio key={player.id} name="first-pick" id={player.id} label={player.name} value={index} onChange={(value: string) => setFirstPick(value)}/>
                  )
                })}
              </div>
            </FormItem>
            <div className="flex justify-end">
              <Button type='text' size="sm" onClick={() => openInfo()}>Help</Button>
              <Button type='primary' size="sm" onClick={() => copyLink()}>Share Room Link</Button>
              <Button type='success' size="sm" disabled={players.length !== 2 || !(firstPick && (gameType !== 'std' || mode) && (withTimer !== 'Yes' || time))} onClick={() => startGame()}>Start Game</Button>
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
            Standard is a team versus team setup with a maximum of 4 characters per team. Abyss Floor 12 is an 8 versus 8 team setup
          </p>
          <h3 className='text-md font-semibold mb-1'>Mode</h3>
          <p className='text-sm text-gray-700 mb-4'>
            <span className="font-semibold">(Standard only)</span> Choose 1 of specific team sizes
          </p>
          <h3 className='text-md font-semibold mb-1'>Auto Bans</h3>
          <p className='text-sm text-gray-700 mb-4'>
            Select from a number of categories pertaining to a certain group of characters <span className="font-semibold">(Anemo characters, adult characters, etc)</span>. If this is set, the characters that are related to one of the set auto bans will not be visible from the character table, giving the players a tighter selection of characters
          </p>
          <h3 className='text-md font-semibold mb-1'>With Timer</h3>
          <p className='text-sm text-gray-700 mb-4'>
            Choose whether or not to include a timer
          </p>
          <h3 className='text-md font-semibold mb-1'>Timer (Seconds)</h3>
          <p className='text-sm text-gray-700 mb-4'>
            Choose 1 between choices of time (15 seconds, 30 seconds, 45 seconds, 60 seconds). Will only be visible if <span className="font-semibold">With Timer</span> is set to <span className="font-semibold">Yes</span>
          </p>
          <h3 className='text-md font-semibold mb-1'>Audience</h3>
          <p className='text-sm text-gray-700 mb-4'>
            A list of people who have entered your room. Here, you can choose the players to participate in the drafting (exactly 2 players only)
          </p>
          <h3 className='text-md font-semibold mb-1'>First Pick</h3>
          <p className='text-sm text-gray-700 mb-4'>
            Choose which player to go first <span className="font-semibold">(options will be visible once you select them from the Audience field)</span>
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