type Element = {
  [key: string]: Type
}

type Type = {
  name: string
  image: string
}

export type Character = {
  name: string
  vision: string
  image: string | null
  forSelection?: boolean
}

type Panel = {
  [key: keyof typeof Elements]: Character[]
}

export const Elements: Element = {
  Anemo: {
    name: 'Anemo',
    image: 'assets/Elements/Anemo.webp'
  },
  Geo: {
    name: 'Geo',
    image: 'assets/Elements/Geo.webp'
  },
  Electro: {
    name: 'Electro',
    image: 'assets/Elements/Electro.webp'
  },
  Dendro: {
    name: 'Dendro',
    image: 'assets/Elements/Dendro.webp'
  },
  Hydro: {
    name: 'Hydro',
    image: 'assets/Elements/Hydro.webp'
  },
  Pyro: {
    name: 'Pyro',
    image: 'assets/Elements/Pyro.webp'
  },
  Cryo: {
    name: 'Cryo',
    image: 'assets/Elements/Cryo.webp'
  },
  Unaligned: {
    name: 'Unaligned',
    image: 'assets/Elements/Unaligned.webp'
  }
}

export const Characters: Character[] = [
  {
    name: 'Albedo',
    vision: Elements.Geo.name,
    image: 'Albedo.webp'
  },
  {
    name: 'Aloy',
    vision: Elements.Cryo.name,
    image: 'Aloy.webp'
  },
  {
    name: 'Alhaitham',
    vision: Elements.Dendro.name,
    image: 'Alhaitham.webp'
  },
  {
    name: 'Amber',
    vision: Elements.Pyro.name,
    image: 'Amber.webp'
  },
  {
    name: 'Arataki Itto',
    vision: Elements.Geo.name,
    image: 'Arataki Itto.webp'
  },
  {
    name: 'Barbara',
    vision: Elements.Hydro.name,
    image: 'Barbara.webp'
  },
  {
    name: 'Beidou',
    vision: Elements.Electro.name,
    image: 'Beidou.webp'
  },
  {
    name: 'Bennett',
    vision: Elements.Pyro.name,
    image: 'Bennett.webp'
  },
  {
    name: 'Candace',
    vision: Elements.Hydro.name,
    image: 'Candace.webp'
  },
  {
    name: 'Chongyun',
    vision: Elements.Cryo.name,
    image: 'Chongyun.webp'
  },
  {
    name: 'Collei',
    vision: Elements.Dendro.name,
    image: 'Collei.webp'
  },
  {
    name: 'Cyno',
    vision: Elements.Electro.name,
    image: 'Cyno.webp'
  },
  {
    name: 'Diluc',
    vision: Elements.Pyro.name,
    image: 'Diluc.webp'
  },
  {
    name: 'Diona',
    vision: Elements.Cryo.name,
    image: 'Diona.webp'
  },
  {
    name: 'Dori',
    vision: Elements.Electro.name,
    image: 'Dori.webp'
  },
  {
    name: 'Eula',
    vision: Elements.Cryo.name,
    image: 'Eula.webp'
  },
  {
    name: 'Faruzan',
    vision: Elements.Anemo.name,
    image: 'Faruzan.webp'
  },
  {
    name: 'Fischl',
    vision: Elements.Electro.name,
    image: 'Fischl.webp'
  },
  {
    name: 'Ganyu',
    vision: Elements.Cryo.name,
    image: 'Ganyu.webp'
  },
  {
    name: 'Gorou',
    vision: Elements.Geo.name,
    image: 'Gorou.webp'
  },
  {
    name: 'Hu Tao',
    vision: Elements.Pyro.name,
    image: 'Hu Tao.webp'
  },
  {
    name: 'Jean',
    vision: Elements.Anemo.name,
    image: 'Jean.webp'
  },
  {
    name: 'Kaedahara Kazuha',
    vision: Elements.Anemo.name,
    image: 'Kaedahara Kazuha.webp'
  },
  {
    name: 'Kaeya',
    vision: Elements.Cryo.name,
    image: 'Kaeya.webp'
  },
  {
    name: 'Kamisato Ayaka',
    vision: Elements.Cryo.name,
    image: 'Kamisato Ayaka.webp'
  },
  {
    name: 'Kamisato Ayato',
    vision: Elements.Hydro.name,
    image: 'Kamisato Ayato.webp'
  },
  {
    name: 'Keqing',
    vision: Elements.Electro.name,
    image: 'Keqing.webp'
  },
  {
    name: 'Klee',
    vision: Elements.Pyro.name,
    image: 'Klee.webp'
  },
  {
    name: 'Kujou Sara',
    vision: Elements.Electro.name,
    image: 'Kujou Sara.webp'
  },
  {
    name: 'Kuki Shinobu',
    vision: Elements.Electro.name,
    image: 'Kuki Shinobu.webp'
  },
  {
    name: 'Layla',
    vision: Elements.Cryo.name,
    image: 'Layla.webp'
  },
  {
    name: 'Lisa',
    vision: Elements.Electro.name,
    image: 'Lisa.webp'
  },
  {
    name: 'Mona',
    vision: Elements.Hydro.name,
    image: 'Mona.webp'
  },
  {
    name: 'Nahida',
    vision: Elements.Dendro.name,
    image: 'Nahida.webp'
  },
  {
    name: 'Nilou',
    vision: Elements.Hydro.name,
    image: 'Nilou.webp'
  },
  {
    name: 'Ningguang',
    vision: Elements.Geo.name,
    image: 'Ningguang.webp'
  },
  {
    name: 'Noelle',
    vision: Elements.Geo.name,
    image: 'Noelle.webp'
  },
  {
    name: 'Qiqi',
    vision: Elements.Cryo.name,
    image: 'Qiqi.webp'
  },
  {
    name: 'Raiden Shogun',
    vision: Elements.Electro.name,
    image: 'Raiden Shogun.webp'
  },
  {
    name: 'Razor',
    vision: Elements.Electro.name,
    image: 'Razor.webp'
  },
  {
    name: 'Rosaria',
    vision: Elements.Cryo.name,
    image: 'Rosaria.webp'
  },
  {
    name: 'Sangonomiya Kokomi',
    vision: Elements.Hydro.name,
    image: 'Sangonomiya Kokomi.webp'
  },
  {
    name: 'Sayu',
    vision: Elements.Anemo.name,
    image: 'Sayu.webp'
  },
  {
    name: 'Shenhe',
    vision: Elements.Cryo.name,
    image: 'Shenhe.webp'
  },
  {
    name: 'Shikanoin Heizou',
    vision: Elements.Anemo.name,
    image: 'Shikanoin Heizou.webp'
  },
  {
    name: 'Sucrose',
    vision: Elements.Anemo.name,
    image: 'Sucrose.webp'
  },
  {
    name: 'Tartaglia/Childe',
    vision: Elements.Hydro.name,
    image: 'Tartaglia.webp'
  },
  {
    name: 'Thoma',
    vision: Elements.Pyro.name,
    image: 'Thoma.webp'
  },
  {
    name: 'Tighnari',
    vision: Elements.Dendro.name,
    image: 'Tighnari.webp'
  },
  {
    name: 'Traveler/Aether/Lumine',
    vision: Elements.Unaligned.name,
    image: 'Traveler.webp'
  },
  {
    name: 'Venti',
    vision: Elements.Anemo.name,
    image: 'Venti.webp'
  },
  {
    name: 'Wanderer',
    vision: Elements.Anemo.name,
    image: 'Wanderer.webp'
  },
  {
    name: 'Xiangling',
    vision: Elements.Pyro.name,
    image: 'Xiangling.webp'
  },
  {
    name: 'Xiao',
    vision: Elements.Anemo.name,
    image: 'Xiao.webp'
  },
  {
    name: 'Xingqiu',
    vision: Elements.Hydro.name,
    image: 'Xingqiu.webp'
  },
  {
    name: 'Xinyan',
    vision: Elements.Pyro.name,
    image: 'Xinyan.webp'
  },
  {
    name: 'Yae Miko',
    vision: Elements.Electro.name,
    image: 'Yae Miko.webp'
  },
  {
    name: 'Yanfei',
    vision: Elements.Pyro.name,
    image: 'Yanfei.webp'
  },
  {
    name: 'Yaoyao',
    vision: Elements.Dendro.name,
    image: 'Yaoyao.webp'
  },
  {
    name: 'Yelan',
    vision: Elements.Hydro.name,
    image: 'Yelan.webp'
  },
  {
    name: 'Yoimiya',
    vision: Elements.Pyro.name,
    image: 'Yoimiya.webp'
  },
  {
    name: 'Yun Jin',
    vision: Elements.Geo.name,
    image: 'Yun Jin.webp'
  },
  {
    name: 'Zhongli',
    vision: Elements.Geo.name,
    image: 'Zhongli.webp'
  }
]

export const NoPick: Character = {
  name: 'No Pick',
  vision: Elements.Unaligned.name,
  image: 'zz.webp'
}

let modifiedCharacters = [...Characters]

let availableCharacters = [...modifiedCharacters]

export function getPanels() {
  return availableCharacters.reduce((result: Panel, character: Character) => {
    result[character.vision] = result[character.vision] || []
    result[character.vision].push(character)
    return result
  }, Object.create(null))
}

export function removeCharacter(name?: string) {
  modifiedCharacters = modifiedCharacters.filter((character: Character) => character.name !== name)
  availableCharacters = [...modifiedCharacters]
}

export function characterExists(name?: string) {
  return availableCharacters.find((character: Character) => character.name === name)
}

export function filterCharacters(name?: string) {
  if (name) {
    availableCharacters = modifiedCharacters.filter((character: Character) => character.name.toLowerCase().includes(name.toLowerCase()))
  } else {
    availableCharacters = modifiedCharacters
  }
}

export function resetCharacters() {
  modifiedCharacters = [...Characters]
  availableCharacters = [...modifiedCharacters]
}

import { useEffect, useState } from 'react'

function preloadImage (src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function() {
      resolve(img)
    }
    img.onerror = img.onabort = function() {
      reject(src)
    }
    img.src = src
  })
}

export default function useImagePreloader(imageList: string[]) {
  const [imagesPreloaded, setImagesPreloaded] = useState<boolean>(false)

  useEffect(() => {
    let isCancelled = false

    async function effect() {
      console.log('PRELOAD')

      if (isCancelled) {
        return
      }

      const imagesPromiseList: Promise<any>[] = []
      for (const i of imageList) {
        imagesPromiseList.push(preloadImage(i))
      }
  
      await Promise.all(imagesPromiseList)

      if (isCancelled) {
        return
      }

      setImagesPreloaded(true)
    }

    effect()

    return () => {
      isCancelled = true
    }
  }, [imageList])

  return { imagesPreloaded }
}