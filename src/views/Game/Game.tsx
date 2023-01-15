import Button from "@/components/Button/Button"
import Input from "@/components/Input/Input"
import { Character, Elements, filterCharacters, getPanels, removeCharacter, resetCharacters } from "@/data/data"
import Dialog from "@/components/Dialog/Dialog"
import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import socket from "@/socket/socket"
import { lsGetUser, lsGetPlayer } from "@/storage/localStorage"
import { User } from "@/types/storage"

type Player = {
  id: string
  name: string
  roomId: string
  isHost: boolean
}

type Turn = {
  player: User
  selection: number
  turn: number
}

const Game = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const noOfSelection = Number(params.get('mode')?.charAt(0))
  const [startGame, setStartGame] = useState(false)
  const [filter, setFilter] = useState<any>()
  const [panels, setPanels] = useState(getPanels())
  const [user] = useState(lsGetUser())
  const [players, setPlayers] = useState<User[]>([])
  const [player] = useState(lsGetPlayer())
  const [turn, setTurn] = useState<Turn>()
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
  const elements = Elements

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

  socket.off('announceTurn').on('announceTurn', (turn: Turn) => {
    setTurn(turn)
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
  })

  socket.off('select').on('select', (selection: number) => {
    setSelectionType(selection)
  })

  socket.off('goBack').on('goBack', () => {
    navigate(`/room/${user.roomId}`)
  })

  socket.off('removeCharacter').on('removeCharacter', (data) => {
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
    nextTurn()
  }

  function nextTurn() {
    socket.emit('nextTurn', user.roomId)
  }

  function goBack() {
    socket.emit('goBack', user.roomId)
  }

  function removeCharacterFromPanel() {
    const data = {
      character: selectedCharacter,
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
    if (selectedCharacter) {
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
      closeDialog()
      setSelectionType(-1)
      removeCharacter(selectedCharacter.name)
      setPanels(getPanels())
      removeCharacterFromPanel()
      nextTurn()
    }
  }

  function pickCharacter() {
    if (selectedCharacter) {
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
      closeDialog()
      setSelectionType(-1)
      removeCharacter(selectedCharacter.name)
      setPanels(getPanels())
      removeCharacterFromPanel()
      nextTurn()
    }
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
    <div className="max-w-[1500px] w-full">
      <Dialog title={`${selectionType ? 'Pick' : 'Ban'} ${selectedCharacter?.name}?`} show={showDialog} handleCloseOutside={closeDialog}>
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
      <div className="fixed top-4 right-4 flex justify-center mb-2">
        {user.isHost &&
        (
          <>
            <Button size="sm" onClick={() => start()} disabled={startGame}>Start</Button>
            <Button size="sm" type="warning" onClick={() => goBack()}>Go Back to Room</Button>
          </>
        )}
        <Button size="sm" type="danger" onClick={() => openHelp()}>Help</Button>
      </div>
      <div className="flex justify-between text-white">
        <div className="w-56 text-2xl font-bold text-center">{players[0]?.name} {user.name === players[0]?.name ? '(You)' : ''}</div>
        <div className="w-56 text-2xl font-bold text-center">{players[1]?.name} {user.name === players[1]?.name ? '(You)' : ''}</div>
      </div>
      <div className="flex mb-8 mt-4">
        <div className="flex flex-col justify-center">
          {[...player1Picks].map((character: Character, index) => {
            return (
              <div key={index} className={`h-24 w-56 border-2 border-green-400 rounded-md bg-gray-800 bg-opacity-70 my-2 first:mt-0 last:mb-0 overflow-hidden ${setBackgroundColor(character)} ${character?.forSelection ? 'animate-pulse' : ''}`}>
                <img src={character?.image} alt="" className="w-full h-auto" />
              </div>
            )
          })}
        </div>
        <div className="flex-grow mx-16 h-[425px] overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full p-4 bg-gray-800 bg-opacity-70 rounded-md">
          <div>
            <Input value={filter} placeholder="Search Character" onChange={(value: string) => handleFilter(value)}></Input>
          </div>
          <div className="flex justify-center">
            {Object.keys(elements).map((element, index: number) => {
              return (
                <div key={index} className="inline-flex flex-col">
                  <div className="h-20 w-20 m-2">
                    <img src={elements[element].image} className="h-full" />
                  </div>
                  {panels[element]?.map((panel: any, index: number) => {
                    return (
                      <div key={index} className="h-20 w-20 m-2 cursor-pointer" onClick={() => selectCharacter(panel)}>
                        <img src={panel.thumbnail} alt="" />
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          {[...player2Picks].map((character: Character, index) => {
            return (
              <div key={index} className={`h-24 w-56 border-2 border-green-400 rounded-md bg-gray-800 bg-opacity-70 my-2 first:mt-0 last:mb-0 overflow-hidden ${setBackgroundColor(character)} ${character?.forSelection ? 'animate-pulse' : ''}`}>
                <img src={character?.image} alt="" className="w-full h-auto" />
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex justify-center">
          {[...player1Bans].map((character: Character, index) => {
            return (
              <div key={index} className={`relative h-16 w-36 border-2 border-red-400 rounded-md bg-gray-800 bg-opacity-70 mx-2 first:ml-0 last:mr-0 overflow-hidden ${setBackgroundColor(character)} ${character?.forSelection ? 'animate-pulse' : ''}`}>
                <img src={character?.image} alt="" className="w-full h-auto" />
                {character && <div className="absolute top-0 left-0 h-full w-full z-10 bg-red-900 bg-opacity-40" />}
              </div>
            )
          })}
        </div>
        <div className="flex flex-row-reverse justify-center">
          {[...player2Bans].map((character: Character, index) => {
            return (
              <div key={index} className={`relative h-16 w-36 border-2 border-red-400 rounded-md bg-gray-800 bg-opacity-70 mx-2 first:mr-0 last:ml-0 overflow-hidden ${setBackgroundColor(character)} ${character?.forSelection ? 'animate-pulse' : ''}`}>
                <img src={character?.image} alt="" className="w-full h-auto" />
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