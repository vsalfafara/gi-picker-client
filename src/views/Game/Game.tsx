import Button from "@/components/Button/Button"
import Input from "@/components/Input/Input"
import useImagePreloader, { Characters, Character, imageList, characterExists, Elements, filterCharacters, getPanels, NoPick, removeCharacter, Autoban } from "@/data/data"
import Dialog from "@/components/Dialog/Dialog"
import { useContext, useEffect, useRef, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import socket from "@/socket/socket"
import { ssGetUser, ssGetSelection, ssGetAutoban } from "@/storage/session"
import { User } from "@/types/storage"
import { Transition } from "@headlessui/react"
import NotificationContext from '../../context/NotifcationContext'
import axios from "axios"
import { amberGamesCols, kingOfTeyvatCols, abyssCols } from "@/data/sheets"

const sheets = {
  3: import.meta.env.VITE_SHEET_API_STANDARD_3V3,
  abyss: import.meta.env.VITE_SHEET_API_ABYSS
}

type Turn = {
  player: User
  selection: number
  turn: number
}

type Chat = {
  user: User
  message: string
}

type Selection = {
  bans: {
    characters: Character[],
    pointer: number
  }
  picks: {
    characters: Character[],
    pointer: number
  }
}

type Selections = {
  player: User
  selection: Selection
}

const Game = () => {
  const { imagesPreloaded } = useImagePreloader(imageList)
  const navigate = useNavigate()
  const {notificationHandler} = useContext(NotificationContext)
  const [params] = useSearchParams()
  const gameType = params.get('gameType')
  const mode = params.get('mode')
  const withTimer = params.get('withTimer')
  const [turn, setTurn] = useState<Turn>()
  const [showTurn, setShowTurn] = useState(false)
  const startGame = useRef<boolean>(false)
  const [filter, setFilter] = useState<any>()
  const [panels, setPanels] = useState(getPanels())
  const [user] = useState(ssGetUser())
  const [selectionType, setSelectionType] = useState(-1)
  const [showDialog, setShowDialog] = useState(false)
  const selectedCharacter = useRef<Character>(NoPick)
  const [showHelp, setShowHelp] = useState(false)
  const [time, setTime] = useState(0)
  const selectType = useRef<number>(0)
  const elements = Elements
  const [draftStart, setDraftStart] = useState(false)
  const showPanel = useRef(false)
  const [splash, setSplash] = useState<Character>()
  const [showSplash, setShowSplash] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [chatArr, setChatArr] = useState<Chat[]>([])
  const [message, setMessage] = useState('')
  const [newMessage, setNewMessage] = useState(false)
  const [hideDraft, setHideDraft] = useState(false)
  const [showVSScreen, setShowVSScreen] = useState(false)
  const [showVS, setShowVS] = useState(false)
  const [showPlayerPanel1, setShowPlayerPanel1] = useState(false)
  const [showPlayerPanel2, setShowPlayerPanel2] = useState(false)
  const selection = useRef<Selections[]>(ssGetSelection())
  const autoban = useRef<any>(ssGetAutoban())
  const selected = useRef(false)
  const sheetData = useRef<any>([])
  const dataSaved = useRef(false)
  const newSheetRow = useRef<any>()
  const colReference = useRef(0)
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  useEffect(() => {
    if (autoban.current.length) {
      const bans = JSON.parse(autoban.current).map((ban: Autoban) => ban.value.toLowerCase())
      const autobannedCharacters = Characters.filter((character: Character) => {
        return (
          bans.includes(character.sex?.toLowerCase()) ||
          bans.includes(character.rarity?.toLowerCase()) ||
          bans.includes(character.bodyType?.toLowerCase()) ||
          bans.includes(character.weapon?.toLowerCase()) ||
          bans.includes(character.region?.toLowerCase()) ||
          bans.includes(character.vision?.toLowerCase())
        )
      })
      autobannedCharacters.forEach((character: Character) => removeCharacter(character.name))
      setPanels(getPanels())
    }

    let draftStartInterval: ReturnType<typeof setTimeout>
    socket.on('draftStart', () => {
      setDraftStart(true)
      startGame.current = true
      draftStartInterval = setTimeout(() => {
        setDraftStart(false)
        if (user.isHost) {
          nextTurn()
        }
        clearTimeout(draftStartInterval)
      }, 3000) 
    })

    socket.on('nextTurn', () => {
      if (user.isHost) {
        nextTurn()
      }
    })

    socket.on('getTime', (time: number) => {
      setTime(time)
      if (time < 1) {
        setSelectionType(-1)
        setShowDialog(false)
        selected.current = true
      }
    })

    socket.on('chat', (chat: any) => {
      setChatArr(chat)
      setNewMessage(true)
    })
    
    socket.on('disconnected', (name: string) => {
      notificationHandler({
        type: 'danger',
        message: `${name} disconnected`,
        withIcon: true
      })
    })

    socket.on('announceTurn', (turnData: Turn) => {
      setTurn(turnData)
      const showTurnDelay = setTimeout(() => {
        setShowTurn(true)
        if (turnData.player.id === user.id) {
          showPanel.current = true
          selected.current = false
        }
        clearTimeout(showTurnDelay)
      }, 400)
      if (user.isHost) {
        socket.emit('startTimer', user.roomId)
      }
    })
    
    socket.on('noPick', async (turn: Turn) => {
      setSelectionType(-1)
      selectedCharacter.current = NoPick
      if (turn.selection) {
        selectType.current = 2
      } else {
        selectType.current = 1
      }
      addToSelection()
    })

    socket.on('select', (selection: number) => {
      setSelectionType(selection)
      selectType.current = 0
    })

    socket.on('goBack', () => {
      socket.emit('stopTimer')
      navigate(`/room/${user.roomId}`)
    })

    socket.on('setNewSelection', (data: any) => {
      selection.current = data.newSelection
    })

    socket.on('removeCharacterFromPanel', (data) => {
      const character = characterExists(data.character.name)
      if (character) {
        removeCharacter(data.character.name)
        setPanels(getPanels())
        setSplash(data.character)
        showPanel.current = false
        setShowTurn(false)
        const splashDelay = setTimeout(() => {
          setShowSplash(true)
          clearTimeout(splashDelay)
        }, 500)
        const splashTimeout = setTimeout(() => {
          setShowSplash(false)
          clearTimeout(splashTimeout)
        }, 3000)
      }
      if (user.isHost) {
        socket.emit('stopTimer')
        const delay = data.character.name === 'No Pick' ? 0 : 3000
        const turnDelay = setTimeout(() => {
          nextTurn()
          clearTimeout(turnDelay)
        }, delay)
      }
    })

    socket.on('gameCompleted', () => {
      if (user.isHost) {
        sheetData.current.unshift(selection.current[1].player.name)
        sheetData.current.unshift(selection.current[0].player.name)
      }
      setHideDraft(true)
      const handleShowVSScreenDelay = setTimeout(() => {
        setShowVSScreen(true)
        clearTimeout(handleShowVSScreenDelay)
        const handlePlayer1PanelDelay = setTimeout(() => {
          setShowPlayerPanel1(true)
          clearTimeout(handlePlayer1PanelDelay)
          const handleVSDelay = setTimeout(() => {
            setShowVS(true)
            clearTimeout(handleVSDelay)
            const handlePlayer2PanelDelay = setTimeout(() => {
              setShowPlayerPanel2(true)
              clearTimeout(handlePlayer2PanelDelay)
            }, 300)
          }, 700)
        }, 500)
      }, 600)
    })

    socket.on('setSheetData', (data: any) => {
      sheetData.current = data.sheetData
      colReference.current = data.colReference
    })

    return () => {
      socket.off('draftStart')
      socket.off('getTime');
      socket.off('chat')
      socket.off('disconnected')
      socket.off('announceTurn')
      socket.off('noPick')
      socket.off('select')
      socket.off('goBack')
      socket.off('setNewSelection')
      socket.off('removeCharacterFromPanel')
    }
  }, [])
  
  function addToSelection() {
    const character = characterExists(selectedCharacter?.current.name)
    if (character || (selectedCharacter && selectedCharacter.current.name === 'No Pick')) {
      let newSelection = [...selection.current]
      newSelection = newSelection.map((selections: Selections) => {
        if (selections.player.id === user.id) {
          if (selectType.current === 2) {
            selections.selection.picks.characters[selections.selection.picks.pointer] = selectedCharacter.current
            selections.selection.picks.pointer++
          } else if (selectType.current === 1){
            selections.selection.bans.characters[selections.selection.bans.pointer] = selectedCharacter.current
            selections.selection.bans.pointer++
          }
        }
        return selections
      })
      if (!sheetData.current.length) {
        sheetData.current.push('EOL')
      }
      sheetData.current.push(selectedCharacter.current.name)
      setShowDialog(false)
      showPanel.current = false
      setSelectionType(-1)
      if (startGame.current) {
        removeCharacterFromPanel()
        socket.emit('setNewSelection', {newSelection, roomId: user.roomId})
        socket.emit('setSheetData', {sheetData: sheetData.current, roomId: user.roomId, colReference: colReference.current})
      }
    }
  }

  function handleFilter(value: string) {
    setFilter(value)
    filterCharacters(value)
    setPanels(getPanels())
  }

  function start() {
    startGame.current = true
    socket.emit('draftStart', user.roomId)
  }

  function nextTurn() {
    socket.emit('nextTurn', user.roomId)
  }

  function goBack() {
    socket.emit('goBack', user.roomId)
  }

  function removeCharacterFromPanel() {
    const data = {
      character: selectedCharacter.current,
      roomId: user.roomId
    }
    socket.emit('removeCharacterFromPanel', data)
  }

  function selectCharacter(character: Character) {
    if (selectionType !== -1) {
      selectedCharacter.current = character
      setShowDialog(true)
    }
  }

  function banCharacter() {
    selected.current = true
    selectType.current = 1
    addToSelection()
  }

  function pickCharacter() {
    selected.current = true
    selectType.current = 2
    addToSelection()
  }

  function closeHelp() {
    setShowHelp(false)
  }

  function openHelp() {
    setShowHelp(true)
  }

  function closeChat() {
    setShowChat(false)
  }

  function openChat() {
    setShowChat(true)
    setNewMessage(false)
  }

  function sendChat() {
    const chat = {
      user: user,
      message: message,
    }
    let newChat = [...chatArr]
    newChat.push(chat)
    setChatArr(newChat)
    setMessage('')
    socket.emit('chat', newChat)
  }
  
  async function getRows() {
    const nextRow = await axios.get(`${import.meta.env.VITE_SOCKET}getData/${mode ? mode : gameType}`, axiosConfig)
    return nextRow.data
  }

  async function saveData() {
    dataSaved.current = true
    const newSheetRow = await getRows()
    const endpoint = `${import.meta.env.VITE_SOCKET}saveData`
    const eolIndex = sheetData.current.findIndex((data: any) => data === 'EOL')
    const playersInSheet = Array.from(new Set(sheetData.current.slice(0, eolIndex)))
    const selectionInSheet = sheetData.current.slice(eolIndex + 1)
    let cols: any = []
    if (gameType === 'std') {
      if (mode === 'amberGames') {
        cols = amberGamesCols
      } else if (mode === 'kingOfTeyvat') {
        cols = kingOfTeyvatCols
      }
    } else if (gameType === 'abyss') {
      cols = abyssCols
    }
    const data = selectionInSheet.map((sheetData: any, index: number) => {
      const selection = []
      selection.push(sheetData)
      selection.push(`=IF(${cols[index]}${newSheetRow} <> "No Pick", IMAGE(FILTER(Characters!C2:C,Characters!A2:A=${cols[index]}${newSheetRow})), "X")`)
      return selection
    })
    data.unshift(playersInSheet)
    const body = {
      mode: mode ? mode : gameType,
      sheetData: data.flatMap((data: any) => data)
    }
    const response = await axios.post(
      endpoint,
      JSON.stringify(body),
      axiosConfig
    )
    if (response.status === 200) {
      notificationHandler({
        type: 'success',
        message: 'Data saved!',
        withIcon: true
      })
    } else {
      notificationHandler({
        type: 'danger',
        message: 'Something went wrong...',
        withIcon: true
      })
      dataSaved.current = false
    }
  }

  function getCharacterBorder(character: Character) {
    let border = 'border-gray-700'
    if (character?.vision === 'Anemo') border = 'border-green-300'
    else if (character?.vision === 'Geo') border = 'border-yellow-600'
    else if (character?.vision === 'Electro') border = 'border-purple-600'
    else if (character?.vision === 'Dendro') border = 'border-green-800'
    else if (character?.vision === 'Hydro') border = 'border-blue-700'
    else if (character?.vision === 'Pyro') border = 'border-red-400'
    else if (character?.vision === 'Cryo') border = 'border-blue-200'
    return border
  }

  return (
    <div className="h-full max-w-screen-2xl flex flex-col justify-center m-auto">
      {
        showVSScreen &&
        (
        <div className="flex flex-col items-center justify-start text-white h-[684px] relative">
          {
            user.isHost && 
            (
              <div className="absolute top-0 right-2 z-10">
                {
                  ((gameType === 'std' && (mode === 'amberGames' || mode === 'kingOfTeyvat') || gameType === 'abyss')) &&
                  (
                    <Button size="sm" type="success" onClick={() => saveData()}>Save Data</Button>
                  )
                }
                <Button size="sm" type="warning" onClick={() => goBack()}>Go Back to Room</Button>
              </div>
            )
          }
          <Transition
            show={showPlayerPanel1}
            enter="transition duration-700"
            enterFrom="opacity-0 translate-x-24"
            enterTo="opacity-100 translate-x-0"
          >
            <h1 className="text-4xl text-center">{selection.current[0]?.player.name}</h1>
            <div className="flex my-2">
            { 
              [...selection.current[0]?.selection.picks.characters].map((character: Character, index: number) => {
                return character.name !== 'No Pick' ? (
                  <div key={index} className={`bg-gray-800 bg-opacity-70 h-64 w-44 mx-2 border-4 overflow-hidden rounded-xl ${getCharacterBorder(character)}`}>
                    <img src={`assets/Characters/VS/${character?.image}`} className="object-cover object-center h-full w-full" />
                  </div>
                ) : null
              })
            }
            </div>
          </Transition>
          <Transition
            show={showVS}
            enter="transition duration-300"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
          >
            <h1 className="text-6xl italic text-center">VS</h1>
          </Transition>
          <Transition
              show={showPlayerPanel2}
              enter="transition duration-700"
              enterFrom="opacity-0 -translate-x-24"
              enterTo="opacity-100 translate-x-0"
            >
              <div className="flex my-2">
              { 
                [...selection.current[1]?.selection.picks.characters].map((character: Character, index: number) => {
                  return character.name !== 'No Pick' ? (
                    <div key={index} className={`bg-gray-800 bg-opacity-70 h-64 w-44 mx-2 border-4 overflow-hidden rounded-xl ${getCharacterBorder(character)}`}>
                      <img src={`assets/Characters/VS/${character?.image}`} className="object-cover object-center h-full w-full" />
                    </div>
                  ) : null
                })
              }
              </div>
            <h1 className="text-4xl text-center">{selection.current[1]?.player.name}</h1>
          </Transition>
        </div>
        )
      }
      <Transition
        appear={true}
        show={!hideDraft}
        leave="transition duration-500"
        leaveFrom="opacity-100 translate-y-8"
        leaveTo="opacity-0 translate-y-16"
      >
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
        <Dialog title="Chat" show={showChat} handleCloseOutside={closeChat}>
          <>
            <div className="mb-4 border-2 border-gray-300 px-1 h-96 overflow-x-scroll">
              {
                chatArr.map((chat: Chat, index: number) => {
                  return (
                    <div key={index} className={`px-4 py-2 m-2 bg-purple-100 ${chat.user.id === user.id ? 'text-right' : 'text-left'}`}>
                      <p className={`text-sm text-purple-900 mb-2`}>
                        <span className={`${chat.user.id === user.id ? 'flex flex-row-reverse' : ''}`}>
                          {chat.user.isHost && (<span className={`${chat.user.id === user.id ? 'ml-2' : 'mr-2'}`}>&#128081;</span>)}
                          <span>{chat.user.name}</span>
                        </span>
                      </p>
                      <p className="text-sm">{chat.message}</p>
                    </div>
                  )
                })
              }
            </div>
            <div className="flex items-center">
              <Input type="text" value={message} placeholder="Type a message here" onChange={(value: string) => setMessage(value)}></Input>
              <Button size="sm" type="primary" onClick={sendChat}>Send</Button>
            </div>
          </>
        </Dialog>
        <Dialog title='How to play' show={showHelp} handleCloseOutside={closeHelp} width="w-[600px]">
          <div className='mt-2'>
            <p className='text-sm text-gray-500 mb-2'>
              The game will start when the game master clicks the start button (not visible for players).
            </p>
            <p className='text-sm text-gray-500 mb-2'>
              A text will be displayed on the center of this page. This is the indicator for who is now selecting a character.
            </p>
            <p className='text-sm text-gray-500 mb-2'>
              For the players, to select a character, simply click a character in the character table in the center. A dialog will appear, asking if the player wishes to proceed selecting that character. Once the character is selected, that character will be removed from the table, and the player will not be able to select a character, as this is now the other player's turn.
            </p>
            <p className='text-sm text-gray-500 mb-2'>
              To find a specific character, simply type the name of that character in the text box above the character table.
            </p>
            <p className='text-sm text-gray-500 mb-2'>
              The game ends when all players have selected the appropriate number of characters for the mode, or when the game master clicks the <span className="font-semibold">Go Back to Room</span> button (not visible for players or viewers).
            </p>
            <p className='text-sm text-gray-500 mb-8'>
              When the game master clicks the  <span className="font-semibold">Go Back to Room</span> button, the game master, including the players and viewers, will be moved back to the room page where the game master can readjust the game settings.
            </p>
            <p className='text-sm text-gray-500 mb-2'>
              <span className="font-semibold">WARNING</span>
            </p>
            <p className='text-sm text-gray-500 mb-2'>
              When you are in this page, do not attempt to refresh, as this might cause the game to break. Also, if you are a player, do not press <span className="italic">alt + tab</span> or change windows, as this will cause some characters to not appear in your character panel
            </p>
          </div>
          <div className='mt-8 flex justify-end'>
            <Button size="sm" type="danger" onClick={closeHelp}>Got it!</Button>
          </div>
        </Dialog>
        <Dialog title={`${selectionType ? 'Pick' : 'Ban'} ${selectedCharacter?.current.name}?`} show={showDialog} handleCloseOutside={() => setShowDialog(false)}>
          <div className='mt-2'>
            <p className='text-sm text-gray-500'>
              Do you want to {selectionType ? 'pick' : 'ban'} {selectedCharacter?.current.name}?
            </p>
          </div>
          {
            withTimer === 'No' || (withTimer === 'Yes' && time > 0)
            ? (
              <div className='mt-8 flex justify-end'>
                <Button size="sm" type="danger" onClick={() => setShowDialog(false)}>Uhh wait...</Button>
                {
                  selectionType
                  ? <Button size="sm" onClick={pickCharacter} disabled={selected.current}>Yes, pick!</Button>
                  : <Button size="sm" onClick={banCharacter} disabled={selected.current}>Yes, ban!</Button>
                }
              </div>
            )
            : (
              <div>no</div>
            )
          }
        </Dialog>
        <div className="flex justify-center h-16 my-2 relative">
          {
            withTimer === 'Yes' &&
            (
              <div className="flex w-36 justify-center items-center text-white bg-gray-800 bg-opacity-70 border-4 border-yellow-600 ">
                <span className="text-6xl font-bold pb-[.5rem]">{time}</span>
              </div>
            )
          }
          <div className="absolute right-0 h-full flex items-center">
            {user.isHost &&
            (
              <>
                <Button size="sm" onClick={start} disabled={startGame.current}>Start</Button>
                <Button size="sm" type="warning" onClick={goBack}>Go Back to Room</Button>
              </>
            )}
            <Button size="sm" type="success" onClick={openChat}>
              { newMessage && <span className="absolute -top-2 -right-2 h-4 w-4 bg-red-500 rounded-full" />}
              Chat
            </Button>
            <Button size="sm" type="danger" onClick={openHelp}>Help</Button>
          </div>
        </div>
        <div className="flex justify-between mb-4 min-h-[500px]">
          <div className="flex flex-col justify-center">
            <div className="sm:w-48 md:w-72 lg:w-96 text-2xl font-bold text-center text-white bg-yellow-600">
              <p>{selection.current[0]?.player.name} {user.id === selection.current[0]?.player.id ? '(You)' : ''}</p>
            </div>
            <div className="flex flex-wrap sm:w-48 md:w-72 lg:w-96">
              {[...selection.current[0]?.selection.picks.characters].map((character: Character, index: number) => {
                return (
                  <div key={index} className={`${gameType === 'std' ? 'h-40 w-full' : 'h-32 w-1/2'} border-4 border-yellow-600 rounded-md bg-gray-800 bg-opacity-70 last:mr-0 overflow-hidden`}>
                    {
                      character && <img src={`assets/Characters/Admin Panel/${character?.image}`} alt="" className="object-cover object-center h-full w-full" />
                    }
                  </div>
                )
              })}
            </div>
            <div className="flex flex-wrap">
              {[...selection.current[0]?.selection.bans.characters].map((character: Character, index) => {
                return (
                  <div key={index} className="relative sm:h-16 md:h-16 lg:h-20 sm:w-24 md:w-28 lg:w-32 border-4 border-red-400 rounded-md bg-gray-800 bg-opacity-70 overflow-hidden">
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
          </div>
          <div className="flex flex-col items-center w-full justify-center">
            <Transition
              show={showSplash}
              enter="transition ease-out duration-500"
              enterFrom="opacity-0 -translate-y-28"
              enterTo="opacity-100 translate-y-0"
              leave="transition-opacity ease-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="h-96 w-full flex justify-center items-center">
                <img src={`assets/Characters/Splash/${splash?.image}`} className="h-auto w-full" alt="" />
              </div>
            </Transition>
            <Transition
              appear={true}
              show={showTurn}
              enter="transition duration-300"
              enterFrom="opacity-0 -translate-y-8"
              enterTo="opacity-100 translate-y-0"
              leave="transition duration-300"
              leaveFrom="opacity-100 translate-y-8"
              leaveTo="opacity-0 translate-y-16"
            >
              <div className={`bg-opacity-40 rounded-lg p-3 ${turn?.selection ? 'bg-green-500' : 'bg-red-500'}`}>
                <h1 className='font-bold text-white italic text-3xl'>{turn?.player.id === user.id ? 'Your' : `${turn?.player.name}'s`} turn to {turn?.selection ? 'pick' : 'ban'}</h1>
              </div>
            </Transition>
            {
              !user.isHost &&
                (
                  <Transition
                    show={showPanel.current}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
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
          </div>
          <div className="flex">
            <div className="flex flex-col justify-center items-end">
              <div className="sm:w-48 md:w-72 lg:w-96 text-2xl font-bold text-center text-white bg-yellow-600">
                <p>{selection.current[1]?.player.name} {user.id === selection.current[1]?.player.id ? '(You)' : ''}</p>
              </div>
              <div className="flex flex-wrap sm:w-48 md:w-72 lg:w-96">
                {[...selection.current[1]?.selection.picks.characters].map((character: Character, index) => {
                  return (
                    <div key={index} className={`${gameType === 'std' ? 'h-40 w-full' : 'h-32 w-1/2'} border-4 border-yellow-600 rounded-md bg-gray-800 bg-opacity-70 last:mr-0 overflow-hidden`}>
                      {
                        character && <img src={`assets/Characters/Admin Panel/${character?.image}`} alt="" className="object-cover object-center h-full w-full" />
                      }
                    </div>
                  )
                })}
              </div>
              <div className="flex flex-row-reverse flex-wrap justify-start">
                {[...selection.current[1]?.selection.bans.characters].map((character: Character, index) => {
                  return (
                    <div key={index} className="relative sm:h-16 md:h-16 lg:h-20 sm:w-24 md:w-28 lg:w-32 border-4 border-red-400 rounded-md bg-gray-800 bg-opacity-70 overflow-hidden">
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
        </div>
      </Transition>
    </div>
  )
}

export default Game