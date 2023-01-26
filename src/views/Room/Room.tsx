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
import { ssGetUser, ssSetAutoban, ssSetSelection } from '../../storage/session'
import { User } from '../../types/storage'

const Room = () => {
  const navigate = useNavigate();
  const {notificationHandler} = useContext(NotificationContext)
  const [showDialog, setShowDialog] = useState(false)
  const [gameType, setGameType] = useState<string>()
  const [mode, setMode] = useState<string>()
  const [withTimer, setWithTimer] = useState<string>()
  const [time, setTime] = useState<number>()
  const [players, setPlayers] = useState<User[]>([])
  const [firstPick, setFirstPick] = useState<string>()
  const { roomId } = useParams()
  const [user, _] = useState(ssGetUser())
  const autobans = useRef([
    {
      type: 'None',
      value: null,
      display: 'None'
    },
    {
      type: 'Sexes',
      value: 'Male',
      display: 'Male Characters'
    },
    {
      type: 'Sexes',
      value: 'Female',
      display: 'Female Characters'
    },
    {
      type: 'Rarities',
      value: 'Rare',
      display: '4-Star Characters'
    },
    {
      type: 'Rarities',
      value: 'VeryRare',
      display: '5-Star Characters'
    },
    {
      type: 'BodyTypes',
      value: 'Child',
      display: 'Body Type: Child'
    },
    {
      type: 'BodyTypes',
      value: 'Teenager',
      display: 'Body Type: Teenager'
    },
    {
      type: 'BodyTypes',
      value: 'Adult',
      display: 'Body Type: Adult'
    },
    {
      type: 'Weapons',
      value: 'Sword',
      display: 'Sword Users'
    },
    {
      type: 'Weapons',
      value: 'Claymore',
      display: 'Claymore Users'
    },
    {
      type: 'Weapons',
      value: 'Polearm',
      display: 'Polearm Users'
    },
    {
      type: 'Weapons',
      value: 'Bow',
      display: 'Bow Users'
    },
    {
      type: 'Weapons',
      value: 'Catalyst',
      display: 'Catalyst Users'
    },
    {
      type: 'Regions',
      value: 'Mondstadt',
      display: 'Mondstadt Characters'
    },
    {
      type: 'Regions',
      value: 'Liyue',
      display: 'Liyue Characters'
    },
    {
      type: 'Regions',
      value: 'Inazuma',
      display: 'Inazuma Characters'
    },
    {
      type: 'Regions',
      value: 'Sumeru',
      display: 'Sumeru Characters'
    },
  ])
  const [autoban, setAutoban] = useState<any>(JSON.stringify(autobans.current[0]))

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
    socket.on('startGame', ({ autoban, mode, withTimer, game }) => {
    const noOfSelections = Number(mode.charAt(0))

    const selectionArr = game.players.map((player: User) => {
      return {
        player: player,
        selection: {
          bans: {
            characters: new Array(noOfSelections),
            pointer: 0
          },
          picks: {
            characters: new Array(noOfSelections),
            pointer: 0
          }
        },
      }
    })
    ssSetSelection(selectionArr)
    ssSetAutoban(autoban)
      navigate(`/game?mode=${mode}&withTimer=${withTimer}`)
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
      autoban: JSON.parse(autoban)
    }
    socket.emit('startGame', form)
  }

  return (
    <>
      <div className='h-full flex justify-center items-center'>
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
            <FormItem label="Auto Bans" labelPosition='left' labelWidth="w-[7rem]">
              <select defaultValue={JSON.stringify(autobans.current[0])} onChange={(e) => setAutoban(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-gray-200 border-gray-600 placeholder-gray-600 focus:ring-blue-500 focus:border-blue-500">
                {
                  autobans.current.map((autoban: any, index: number) => {
                    return (
                      <option key={index} value={JSON.stringify(autoban)}>{autoban.display}</option>
                    )
                  })
                }
              </select>
            </FormItem>
            <FormItem label="With Timer" labelPosition='left' labelWidth="w-[7rem]">
              <div className='flex'>
                <Radio name='with-timer' id='Yes' label='Yes' value='Yes' onChange={(value: string) => handleSetTime(value)} />
                <Radio name='with-timer' id='No' label='No' value='No' onChange={(value: string) => handleSetTime(value)} />
              </div>
            </FormItem>
            {
              withTimer === 'Yes'
              &&
              <FormItem label="Timer (Seconds)" labelPosition='left' labelWidth="w-[7rem]">
                <div className='flex'>
                  <Radio name='timer' id='15' label='15' value={15} onChange={(value: number) => setTime(Number(value))} />
                  <Radio name='timer' id='30' label='30' value={30} onChange={(value: number) => setTime(Number(value))} />
                  <Radio name='timer' id='45' label='45' value={45} onChange={(value: number) => setTime(Number(value))} />
                  <Radio name='timer' id='60' label='60' value={60} onChange={(value: number) => setTime(Number(value))} />
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
              <Button type='success' disabled={players.length !== 2 || !(gameType && mode && firstPick && (withTimer !== 'Yes' || time))} onClick={() => startGame()}>Start Game</Button>
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