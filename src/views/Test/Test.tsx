
import Button from "@/components/Button/Button"
import { Character, Characters } from "@/data/data"
import { Transition } from "@headlessui/react"
import { useRef, useState } from "react"
const Test = () => {
  const player1Charas = ['Albedo', 'Alhaitham', 'Klee', 'Traveler/Aether/Lumine']
  const player2Charas = ['Kamisato Ayaka', 'Jean', 'Sangonomiya Kokomi', 'Cyno']
  const player1 = useRef(Characters.filter((character: Character) => player1Charas.includes(character.name)))
  const player2 = useRef(Characters.filter((character: Character) => player2Charas.includes(character.name)))
  const [showAnimation, setShowAnimation] = useState(false)

  function getCharacterBorder(character: Character) {
    let border = 'border-gray-700'
    if (character.vision === 'Anemo') border = 'border-green-300'
    else if (character.vision === 'Geo') border = 'border-yellow-600'
    else if (character.vision === 'Electro') border = 'border-purple-600'
    else if (character.vision === 'Dendro') border = 'border-green-800'
    else if (character.vision === 'Hydro') border = 'border-blue-700'
    else if (character.vision === 'Pyro') border = 'border-red-400'
    else if (character.vision === 'Cryo') border = 'border-blue-200'
    return border
  }

  function handleShowAnimation() {
    setShowAnimation(!showAnimation)
  }

  return (
    <div className="flex flex-col justify-center items-center text-white">
      <Button onClick={handleShowAnimation}>Click</Button>
      <h1 className="text-4xl">test</h1>
        <Transition
          appear={true}
          show={showAnimation}
          enter="transition duration-1000"
          enterFrom="opacity-0 translate-x-24"
          enterTo="opacity-100 translate-x-0"
          leave="transition-opacity duration-1000"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex">
          { 
            player1.current.map((character: Character, index: number) => {
              return (
                <div key={index} className={`bg-gray-800 bg-opacity-70 h-64 w-44 mx-2 border-4 overflow-hidden rounded-xl ${getCharacterBorder(character)}`}>
                  <img src={`assets/Characters/VS/${character.image}`} className="object-cover object-center h-full w-full" />
                </div>
              )
            })
          }
          </div>
        </Transition>
      <h1 className="text-6xl italic text-center bg-gray-800 bg-opacity-70 px-8 my-4 rounded-full">VS</h1>
      <Transition
          appear={true}
          show={showAnimation}
          enter="transition duration-1000"
          enterFrom="opacity-0 -translate-x-24"
          enterTo="opacity-100 translate-x-0"
          leave="transition-opacity duration-1000"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex">
          { 
            player2.current.map((character: Character, index: number) => {
              return (
                <div key={index} className={`bg-gray-800 bg-opacity-70 h-64 w-44 mx-2 border-4 overflow-hidden rounded-xl ${getCharacterBorder(character)}`}>
                  <img src={`assets/Characters/VS/${character.image}`} className="object-cover object-center h-full w-full" />
                </div>
              )
            })
          }
          </div>
        </Transition>
      <h1 className="text-4xl">test</h1>
    </div>
  )
}

export default Test