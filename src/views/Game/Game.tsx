import Button from "@/components/Button/Button"
import Input from "@/components/Input/Input"
import useImagePreloader, { Character, Characters, characterExists, Elements, filterCharacters, getPanels, NoPick, removeCharacter } from "@/data/data"
import Dialog from "@/components/Dialog/Dialog"
import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import socket from "@/socket/socket"
import { lsGetUser, lsGetPlayer } from "@/storage/localStorage"
import { User } from "@/types/storage"
import { Transition } from "@headlessui/react"

type Turn = {
  player: User
  selection: number
  turn: number
}

const imageTypes: string[] = []
imageTypes.push('Thumbnail')
imageTypes.push('Splash')
imageTypes.push('Panel')
imageTypes.push('Admin Panel')
const imageList: string[] = Characters.map((character: Character) => {
  return imageTypes.map((type: string) => {
    return `assets/Characters/${type}/${character.image}`
  })
}).flat()

const Game = () => {
  const { imagesPreloaded } = useImagePreloader(imageList)
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const noOfSelection = Number(params.get('mode')?.charAt(0))
  const withTimer = params.get('withTimer')

  const [startGame, setStartGame] = useState(false)
  const [filter, setFilter] = useState<any>()
  const [panels, setPanels] = useState(getPanels())
  const [user] = useState(lsGetUser())
  const [players, setPlayers] = useState<User[]>([])
  const [player] = useState(lsGetPlayer())
  const [_, setTurn] = useState<Turn>()
  const [selectionType, setSelectionType] = useState(-1)
  const [showDialog, setShowDialog] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState<Character>()
  const [player1Picks, setPlayer1Picks] = useState<any[]>(new Array(noOfSelection))
  const [player1Bans, setPlayer1Bans] = useState<any[]>(new Array(noOfSelection))
  const [player2Picks, setPlayer2Picks] = useState<any[]>(new Array(noOfSelection))
  const [player2Bans, setPlayer2Bans] = useState<any[]>(new Array(noOfSelection))
  const [pickPointer1, setPickPointer1] = useState(0)
  const [banPointer1, setBanPointer1] = useState(0)
  const [pickPointer2, setPickPointer2] = useState(0)
  const [banPointer2, setBanPointer2] = useState(0)
  const [showHelp, setShowHelp] = useState(false)
  const [time, setTime] = useState(0)
  const [selectType, setSelectType] = useState<number>(0)
  const elements = Elements
  const [draftStart, setDraftStart] = useState(false)
  const [showPanel, setShowPanel] = useState(false)
  const [splash, setSplash] = useState<Character>()
  const [showSplash, setShowSplash] = useState(false)

  useEffect(() => {
    socket.emit('getAllPlayersInGame', user.roomId)
    return () => {
      socket.off('getAllPlayersInGame')
    }
  }, [])
  
  useEffect(() => {
    socket.on('getAllPlayersInGame', (users: User[]) => {
      setPlayers(users)
    })
    return () => {
      socket.off('getAllPlayersInRoom');
    }
  }, [socket])

  socket.off('getTime').on('getTime', (time: number) => {
    setTime(time)
  })

  useEffect(() => {
    const character = characterExists(selectedCharacter?.name)
    if (character) {
      if (selectType === 2) {
        if (player) {
          const newArr = [...player2Picks]
          newArr[pickPointer2] = selectedCharacter
          setPlayer2Picks(newArr)
          setPickPointer2((prev: number) => ++prev)
        } else {
          const newArr = [...player1Picks]
          newArr[pickPointer1] = selectedCharacter
          setPlayer1Picks(newArr)
          setPickPointer1((prev: number) => ++prev)
        }
      } else if (selectType === 1){
        if (player) {
          const newArr = [...player2Bans]
          newArr[banPointer2] = selectedCharacter
          setPlayer2Bans(newArr)
          setBanPointer2((prev: number) => ++prev)
        } else {
          const newArr = [...player1Bans]
          newArr[banPointer1] = selectedCharacter
          setPlayer1Bans(newArr)
          setBanPointer1((prev: number) => ++prev)
        }
      }
      closeDialog()
      setSelectionType(-1)
      removeCharacter(selectedCharacter?.name)
      setPanels(getPanels())
      removeCharacterFromPanel()
      setSelectType(0)
    }
    return
  }, [selectType])

  socket.off('announceTurn').on('announceTurn', (turn: Turn) => {
    setTurn(turn)
    setShowPanel(true)
    if (turn.selection) {
      if ((turn.turn < 9 && turn.turn % 2 === 0) || (turn.turn > 8 && turn.turn % 2 !== 0)) {
        const newArr = [...player2Picks]
        newArr[pickPointer2] = {
          forSelection: true
        }
        setPlayer2Picks(newArr)
      } else {
        const newArr = [...player1Picks]
        newArr[pickPointer1] = {
          forSelection: true
        }
        setPlayer1Picks(newArr)
      }
    } else {
      if ((turn.turn < 9 && turn.turn % 2 === 0) || (turn.turn > 8 && turn.turn % 2 !== 0)) {
        const newArr = [...player2Bans]
        newArr[banPointer2] = {
          forSelection: true
        }
        setPlayer2Bans(newArr)
      } else {
        const newArr = [...player1Bans]
        newArr[banPointer1] = {
          forSelection: true
        }
        setPlayer1Bans(newArr)
      }
    }
    if (user.isHost) {
      socket.emit('startTimer', user.roomId)
    }
  })

  let draftStartInterval: ReturnType<typeof setTimeout>
  socket.off('draftStart').on('draftStart', () => {
    setDraftStart(true)
    draftStartInterval = setTimeout(() => {
      setDraftStart(false)
      if (user.isHost) {
        nextTurn()
      }
      clearTimeout(draftStartInterval)
    }, 3000) 
  })

  socket.off('nextTurn').on('nextTurn', () => {
    nextTurn()
  })

  socket.off('noPick').on('noPick', async (selection: number) => {
    setShowDialog(false)
    setSelectionType(-1)
    if (selection) {
      if (player) {
        const newArr = [...player2Picks]
        newArr[pickPointer2] = NoPick
        setPlayer2Picks(newArr)
        setPickPointer2((prev: number) => ++prev)
      } else {
        const newArr = [...player1Picks]
        newArr[pickPointer1] = NoPick
        setPlayer1Picks(newArr)
        setPickPointer1((prev: number) => ++prev)
      }
    } else {
      if (player) {
        const newArr = [...player2Bans]
        newArr[banPointer2] = NoPick
        setPlayer2Bans(newArr)
        setBanPointer2((prev: number) => ++prev)
      } else {
        const newArr = [...player1Bans]
        newArr[banPointer1] = NoPick
        setPlayer1Bans(newArr)
        setBanPointer1((prev: number) => ++prev)
      }
    }
    removeCharacterFromPanel(NoPick)
    nextTurn()
  })

  socket.off('select').on('select', (selection: number) => {
    setSelectionType(selection)
    setSelectType(0)
  })

  socket.off('goBack').on('goBack', () => {
    socket.emit('stopTimer')
    navigate(`/room/${user.roomId}`)
  })

  socket.off('removeCharacter').on('removeCharacter', (data) => {
    const character = characterExists(data.character.name)
    if (character || data.character.name === 'No Pick') {
      if (data.selectionType) {
        if (data.player) {
          const newArr = [...player2Picks]
          newArr[pickPointer2] = data.character
          setPlayer2Picks(newArr)
          setPickPointer2((prev: number) => ++prev)
        } else {
          const newArr = [...player1Picks]
          newArr[pickPointer1] = data.character
          setPlayer1Picks(newArr)
          setPickPointer1((prev: number) => ++prev)
        }
      } else {
        if (data.player) {
          const newArr = [...player2Bans]
          newArr[banPointer2] = data.character
          setPlayer2Bans(newArr)
          setBanPointer2((prev: number) => ++prev)
        } else {
          const newArr = [...player1Bans]
          newArr[banPointer1] = data.character
          setPlayer1Bans(newArr)
          setBanPointer1((prev: number) => ++prev)
        }
      }
      removeCharacter(data.character.name)
      setPanels(getPanels())
      socket.emit('stopTimer')
      if (data.character.name !== 'No Pick') {
        setSplash(data.character)
        setShowPanel(false)
        let splashDelay = setTimeout(() => {
          setShowSplash(true)
          clearTimeout(splashDelay)
        }, 300)
        let splashTimeout = setTimeout(() => {
          setShowSplash(false)
          if (user.isHost) {
            nextTurn()
          }
          clearTimeout(splashTimeout)
        }, 3000)
        let panelDelay = setTimeout(() => {
          setShowPanel(true)
          clearTimeout(panelDelay)
        }, 3400)
      }
    }
  })

  function handleFilter(value: string) {
    setFilter(value)
    filterCharacters(value)
    setPanels(getPanels())
  }

  function openDialog() {
    setShowDialog(true)
  }

  function closeDialog() {
    setShowDialog(false)
  }

  function start() {
    setStartGame(true)
    socket.emit('draftStart', user.roomId)
  }

  function nextTurn() {
    socket.emit('nextTurn', user.roomId)
  }

  function goBack() {
    socket.emit('goBack', user.roomId)
  }

  function removeCharacterFromPanel(noPick: Character | null = null) {
    const data = {
      character: noPick ? noPick : selectedCharacter,
      roomId: user.roomId,
      player,
      selectionType
    }
    socket.emit('removeCharacter', data)
  }

  function selectCharacter(character: Character) {
    if (selectionType > -1) {
      setSelectedCharacter(character)
      openDialog()
    }
  }

  function banCharacter() {
    setSelectType(1)
  }

  function pickCharacter() {
    setSelectType(2)
  }

  function closeHelp() {
    setShowHelp(false)
  }

  function openHelp() {
    setShowHelp(true)
  }

  function setBackgroundColor(character: Character) {
    const bgOpacity = 'bg-opacity-50'
    if (character?.vision === 'Anemo') return 'bg-green-300 ' + bgOpacity
    if (character?.vision === 'Geo') return 'bg-yellow-600 ' + bgOpacity
    if (character?.vision === 'Electro') return 'bg-purple-600 ' + bgOpacity
    if (character?.vision === 'Dendro') return 'bg-green-800 ' + bgOpacity
    if (character?.vision === 'Hydro') return 'bg-blue-700 ' + bgOpacity
    if (character?.vision === 'Pyro') return 'bg-red-400 ' + bgOpacity
    if (character?.vision === 'Cryo') return 'bg-blue-200 ' + bgOpacity
    if (character?.vision === 'Unaligned') return 'bg-gray-800 ' + bgOpacity
  }

  return (
    <div className="h-screen max-w-screen-2xl flex flex-col justify-center m-auto">
      <Transition
        appear={true}
        show={draftStart}
        enter="transition duration-300"
        enterFrom="opacity-0 -translate-y-8"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-300"
        leaveFrom="opacity-100 translate-y-8"
        leaveTo="opacity-0 translate-y-16"
        className="fixed top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2"
      >
        <h1 className="font-bold text-white text-6xl">Draft Starting!</h1>
      </Transition>
      <Dialog title='How to play' show={showHelp} handleCloseOutside={closeHelp} width="w-[600px]">
        <div className='mt-2'>
          <p className='text-sm text-gray-500 mb-2'>
            The game will start when the game master clicks the start button (not visible for players).
          </p>
          <p className='text-sm text-gray-500 mb-2'>
            One of the ban or pick panels will flash, indicating that side's player's turn to select a character.
          </p>
          <p className='text-sm text-gray-500 mb-2'>
            For the players, to select a character, simply click a character in the character table in the center. A dialog will appear, asking if the player wishes to proceed selecting that character. Once the character is selected, that character will be removed from the table, and the player will not be able to select a character, as this is now the other player's turn.
          </p>
          <p className='text-sm text-gray-500 mb-2'>
            To find a specific character, simply type the name of that character in the text box above the character table.
          </p>
          <p className='text-sm text-gray-500 mb-2'>
            The game ends when all players have selected the appropriate number of characters for the mode, or when the game master clicks the <span className="font-semibold">Go Back to Room</span> button (not visible for players).
          </p>
          <p className='text-sm text-gray-500 mb-8'>
            When the game master clicks the  <span className="font-semibold">Go Back to Room</span> button, the game master, including the players, will be moved back to the room page where the game master can readjust the game settings.
          </p>
          <p className='text-sm text-gray-500 mb-2'>
            <span className="font-semibold">WARNING</span>
          </p>
          <p className='text-sm text-gray-500 mb-2'>
            When you are in this page, do not attempt to refresh, as this might cause the game to break.
          </p>
        </div>
        <div className='mt-8 flex justify-end'>
          <Button size="sm" type="danger" onClick={closeHelp}>Got it!</Button>
        </div>
      </Dialog>
      <Dialog title={`${selectionType ? 'Pick' : 'Ban'} ${selectedCharacter?.name}?`} show={showDialog && (withTimer === 'Yes' && time > 1)} handleCloseOutside={closeDialog}>
        <div className='mt-2'>
          <p className='text-sm text-gray-500'>
            Do you want to {selectionType ? 'pick' : 'ban'} {selectedCharacter?.name}?
          </p>
        </div>
        <div className='mt-8 flex justify-end'>
          <Button size="sm" type="danger" onClick={closeDialog}>Uhh wait...</Button>
          {
            selectionType
            ? <Button size="sm" onClick={pickCharacter}>Yes, pick!</Button>
            : <Button size="sm" onClick={banCharacter}>Yes, ban!</Button>
          }
        </div>
      </Dialog>
      <div className="flex justify-end p-4">
        {user.isHost &&
        (
          <>
            <Button size="sm" onClick={() => start()} disabled={startGame}>Start</Button>
            <Button size="sm" type="warning" onClick={() => goBack()}>Go Back to Room</Button>
          </>
        )}
        <Button size="sm" type="danger" onClick={() => openHelp()}>Help</Button>
      </div>
      <div className="flex justify-between mb-4">
        <div className="flex">
          <div className="flex flex-col items-start">
            <div className={`${user.isHost ? 'sm:w-48 md:w-72 lg:w-96' : 'sm:w-32 md:w-56 lg:w-80'} text-2xl font-bold text-center text-white bg-yellow-600`}>
              <p>{players[0]?.name} {user.name === players[0]?.name ? '(You)' : ''}</p>
            </div>
            <div>
              {[...player1Picks].map((character: Character, index) => {
                return (
                  <div key={index} className={`${noOfSelection < 4 ? 'h-40' : 'h-32'} ${user.isHost ? 'sm:w-48 md:w-72 lg:w-96' : 'sm:w-32 md:w-56 lg:w-80'} border-4 border-yellow-600 rounded-md bg-gray-800 bg-opacity-70 last:mr-0 overflow-hidden ${setBackgroundColor(character)} ${character?.forSelection ? 'animate-pulse' : ''}`}>
                    {
                      character?.image && (
                      <Transition
                        appear={true}
                        show={!!character}
                        enter="transition-opacity duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        className={`${noOfSelection < 4 ? 'h-40' : 'h-32'} ${user.isHost ? 'sm:w-48 md:w-72 lg:w-96' : 'sm:w-32 md:w-56 lg:w-80'}`}
                      >
                        <img src={`assets/Characters/Admin Panel/${character?.image}`} alt="" className="object-cover object-center h-full w-full" />
                      </Transition>
                      )
                    }
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <Transition
          show={showSplash}
          enter="transition ease-out duration-500"
          enterFrom="opacity-0 -translate-y-28"
          enterTo="opacity-100 translate-y-0"
          leave="transition-opacity ease-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="h-[500px] w-[600px] flex justify-center items-center">
            <img src={`assets/Characters/Splash/${splash?.image}`} alt="" />
          </div>
        </Transition>
        {
          !user.isHost &&
            (
              <Transition
                show={showPanel}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacityduration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="h-[450px] overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full p-4 bg-gray-800 border-4 border-yellow-600 rounded-md">
                  <div>
                    <Input value={filter} placeholder="Search Character" onChange={(value: string) => handleFilter(value)}></Input>
                  </div>
                  <div className="flex justify-center">
                    {Object.keys(elements).map((element, index: number) => {
                      return (
                        <div key={index} className="inline-flex flex-col max-w-20 w-full">
                          <div className="max-w-20 h-auto w-auto m-2">
                            <img src={elements[element].image} className="h-auto w-full" />
                          </div>
                          {panels[element]?.map((panel: any, index: number) => {
                            return (
                              <div key={index} className="max-w-20 h-auto m-2 cursor-pointer" onClick={() => selectCharacter(panel)}>
                                <img src={`assets/Characters/Thumbnail/${panel?.image}`} className="h-auto w-auto" />
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Transition>
          )
        }
        <div className="flex">
          <div className="flex flex-col items-end">
            <div className={`${user.isHost ? 'sm:w-48 md:w-72 lg:w-96' : 'sm:w-32 md:w-56 lg:w-80'} text-2xl font-bold text-center text-white bg-yellow-600`}>
              <p>{players[1]?.name} {user.name === players[1]?.name ? '(You)' : ''}</p>
            </div>
            <div>
              {[...player2Picks].map((character: Character, index) => {
                return (
                  <div key={index} className={`${noOfSelection < 4 ? 'h-40' : 'h-32'} ${user.isHost ? 'sm:w-48 md:w-72 lg:w-96' : 'sm:w-32 md:w-56 lg:w-80'} border-4 border-yellow-600 rounded-md bg-gray-800 bg-opacity-70 last:mr-0 overflow-hidden ${setBackgroundColor(character)} ${character?.forSelection ? 'animate-pulse' : ''}`}>
                    {
                      character?.image && (
                      <Transition
                        show={!!character}
                        enter="transition-opacity duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        className={`${noOfSelection < 4 ? 'h-40' : 'h-32'} ${user.isHost ? 'sm:w-48 md:w-72 lg:w-96' : 'sm:w-32 md:w-56 lg:w-80'}`}
                      >
                        <img src={`assets/Characters/Admin Panel/${character?.image}`} alt="" className="object-cover object-center h-full w-full" />
                      </Transition>
                      )
                    }
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex justify-center">
          {[...player1Bans].map((character: Character, index) => {
            return (
              <div key={index} className={`relative sm:h-16 md:h-16 lg:h-20 sm:w-24 md:w-28 lg:w-32 border-4 border-red-400 rounded-md bg-gray-800 bg-opacity-70 overflow-hidden ${setBackgroundColor(character)} ${character?.forSelection ? 'animate-pulse' : ''}`}>
                {
                  character?.image && (
                  <Transition
                    appear={true}
                    show={!!character}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="sm:h-14 md:h-16 lg:h-20 sm:w-24 md:w-28 lg:w-32"
                  >
                    <img src={`assets/Characters/Panel/${character?.image}`} alt="" className="object-cover object-center h-full w-full" />
                  </Transition>
                  )
                }
                {character && <div className="absolute top-0 left-0 h-full w-full z-10 bg-red-900 bg-opacity-40" />}
              </div>
            )
          })}
        </div>
        {
          withTimer === 'Yes' &&
          (
            <div className="flex w-36 justify-center text-white bg-gray-800 bg-opacity-70 border-4 border-yellow-600 ">
              <span className="text-6xl font-bold">{time}</span>
            </div>
          )
        }
        <div className="flex flex-row-reverse justify-center">
          {[...player2Bans].map((character: Character, index) => {
            return (
              <div key={index} className={`relative sm:h-16 md:h-16 lg:h-20 sm:w-24 md:w-28 lg:w-32 border-4 border-red-400 rounded-md bg-gray-800 bg-opacity-70 overflow-hidden ${setBackgroundColor(character)} ${character?.forSelection ? 'animate-pulse' : ''}`}>
                {
                  character?.image && (
                  <Transition
                    appear={true}
                    show={!!character}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="sm:h-16 md:h-16 lg:h-20 sm:w-24 md:w-28 lg:w-32"
                  >
                    <img src={`assets/Characters/Panel/${character?.image}`} alt="" className="object-cover object-center h-full w-full" />
                  </Transition>
                  )
                }
                {character && <div className="absolute top-0 left-0 h-full w-full z-10 bg-red-900 bg-opacity-40" />}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Game