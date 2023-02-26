type Element = {
  [key: string]: Type
}

type Type = {
  name: string
  image: string
}

export const Rarities = {
  None: 'None',
  Rare: 'Rare',
  VeryRare: 'VeryRare'
}

export const Sexes = {
  Male: 'Male',
  Female: 'Female',
  Any: 'Any'
}

export const BodyTypes = {
  Child: 'Child',
  Teenager: 'Teenager',
  Adult: 'Adult'
}

export const Weapons = {
  Sword: 'Sword',
  Claymore: 'Claymore',
  Polearm: 'Polearm',
  Bow: 'Bow',
  Catalyst: 'Catalyst'
}

export const Regions = {
  Mondstadt: 'Mondstadt',
  Liyue: 'Liyue',
  Inazuma: 'Inazuma',
  Sumeru: 'Sumeru',
  None: 'None'
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

export type Character = {
  name: string
  vision: string
  image: string | null
  rarity?: string
  sex?: string
  bodyType?: string
  weapon?: string
  region?: string
}

type Panel = {
  [key: keyof typeof Elements]: Character[]
}

export const Characters: Character[] = [
  {
    name: 'Albedo',
    vision: Elements.Geo.name,
    image: 'Albedo.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Male,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Sword,
    region: Regions.Mondstadt
  },
  {
    name: 'Aloy',
    vision: Elements.Cryo.name,
    image: 'Aloy.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Bow,
    region: Regions.None
  },
  {
    name: 'Alhaitham',
    vision: Elements.Dendro.name,
    image: 'Alhaitham.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Male,
    bodyType: BodyTypes.Adult,
    weapon: Weapons.Sword,
    region: Regions.Sumeru
  },
  {
    name: 'Amber',
    vision: Elements.Pyro.name,
    image: 'Amber.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Bow,
    region: Regions.Mondstadt
  },
  {
    name: 'Arataki Itto',
    vision: Elements.Geo.name,
    image: 'Arataki Itto.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Male,
    bodyType: BodyTypes.Adult,
    weapon: Weapons.Claymore,
    region: Regions.Inazuma
  },
  {
    name: 'Barbara',
    vision: Elements.Hydro.name,
    image: 'Barbara.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Catalyst,
    region: Regions.Mondstadt
  },
  {
    name: 'Beidou',
    vision: Elements.Electro.name,
    image: 'Beidou.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Adult,
    weapon: Weapons.Claymore,
    region: Regions.Liyue
  },
  {
    name: 'Bennett',
    vision: Elements.Pyro.name,
    image: 'Bennett.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Male,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Sword,
    region: Regions.Mondstadt
  },
  {
    name: 'Candace',
    vision: Elements.Hydro.name,
    image: 'Candace.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Adult,
    weapon: Weapons.Polearm,
    region: Regions.Sumeru
  },
  {
    name: 'Chongyun',
    vision: Elements.Cryo.name,
    image: 'Chongyun.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Male,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Claymore,
    region: Regions.Liyue
  },
  {
    name: 'Collei',
    vision: Elements.Dendro.name,
    image: 'Collei.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Bow,
    region: Regions.Sumeru
  },
  {
    name: 'Cyno',
    vision: Elements.Electro.name,
    image: 'Cyno.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Male,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Polearm,
    region: Regions.Sumeru
  },
  {
    name: 'Diluc',
    vision: Elements.Pyro.name,
    image: 'Diluc.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Male,
    bodyType: BodyTypes.Adult,
    weapon: Weapons.Claymore,
    region: Regions.Mondstadt
  },
  {
    name: 'Diona',
    vision: Elements.Cryo.name,
    image: 'Diona.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Child,
    weapon: Weapons.Bow,
    region: Regions.Mondstadt
  },
  {
    name: 'Dori',
    vision: Elements.Electro.name,
    image: 'Dori.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Child,
    weapon: Weapons.Claymore,
    region: Regions.Sumeru
  },
  {
    name: 'Eula',
    vision: Elements.Cryo.name,
    image: 'Eula.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Adult,
    weapon: Weapons.Claymore,
    region: Regions.Mondstadt
  },
  {
    name: 'Faruzan',
    vision: Elements.Anemo.name,
    image: 'Faruzan.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Bow,
    region: Regions.Sumeru
  },
  {
    name: 'Fischl',
    vision: Elements.Electro.name,
    image: 'Fischl.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Bow,
    region: Regions.Mondstadt
  },
  {
    name: 'Ganyu',
    vision: Elements.Cryo.name,
    image: 'Ganyu.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Bow,
    region: Regions.Liyue
  },
  {
    name: 'Gorou',
    vision: Elements.Geo.name,
    image: 'Gorou.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Male,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Bow,
    region: Regions.Inazuma
  },
  {
    name: 'Hu Tao',
    vision: Elements.Pyro.name,
    image: 'Hu Tao.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Polearm,
    region: Regions.Liyue
  },
  {
    name: 'Jean',
    vision: Elements.Anemo.name,
    image: 'Jean.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Adult,
    weapon: Weapons.Sword,
    region: Regions.Mondstadt
  },
  {
    name: 'Kaedahara Kazuha',
    vision: Elements.Anemo.name,
    image: 'Kaedahara Kazuha.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Male,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Sword,
    region: Regions.Liyue
  },
  {
    name: 'Kaeya',
    vision: Elements.Cryo.name,
    image: 'Kaeya.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Male,
    bodyType: BodyTypes.Adult,
    weapon: Weapons.Sword,
    region: Regions.Mondstadt
  },
  {
    name: 'Kamisato Ayaka',
    vision: Elements.Cryo.name,
    image: 'Kamisato Ayaka.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Sword,
    region: Regions.Inazuma
  },
  {
    name: 'Kamisato Ayato',
    vision: Elements.Hydro.name,
    image: 'Kamisato Ayato.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Male,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Sword,
    region: Regions.Inazuma
  },
  {
    name: 'Keqing',
    vision: Elements.Electro.name,
    image: 'Keqing.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Sword,
    region: Regions.Liyue
  },
  {
    name: 'Klee',
    vision: Elements.Pyro.name,
    image: 'Klee.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Child,
    weapon: Weapons.Catalyst,
    region: Regions.Mondstadt
  },
  {
    name: 'Kujou Sara',
    vision: Elements.Electro.name,
    image: 'Kujou Sara.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Adult,
    weapon: Weapons.Bow,
    region: Regions.Inazuma
  },
  {
    name: 'Kuki Shinobu',
    vision: Elements.Electro.name,
    image: 'Kuki Shinobu.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Sword,
    region: Regions.Inazuma
  },
  {
    name: 'Layla',
    vision: Elements.Cryo.name,
    image: 'Layla.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Sword,
    region: Regions.Sumeru
  },
  {
    name: 'Lisa',
    vision: Elements.Electro.name,
    image: 'Lisa.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Adult,
    weapon: Weapons.Catalyst,
    region: Regions.Mondstadt
  },
  {
    name: 'Mona',
    vision: Elements.Hydro.name,
    image: 'Mona.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Catalyst,
    region: Regions.Mondstadt
  },
  {
    name: 'Nahida',
    vision: Elements.Dendro.name,
    image: 'Nahida.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Child,
    weapon: Weapons.Catalyst,
    region: Regions.Sumeru
  },
  {
    name: 'Nilou',
    vision: Elements.Hydro.name,
    image: 'Nilou.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Sword,
    region: Regions.Sumeru
  },
  {
    name: 'Ningguang',
    vision: Elements.Geo.name,
    image: 'Ningguang.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Adult,
    weapon: Weapons.Catalyst,
    region: Regions.Liyue
  },
  {
    name: 'Noelle',
    vision: Elements.Geo.name,
    image: 'Noelle.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Claymore,
    region: Regions.Mondstadt
  },
  {
    name: 'Qiqi',
    vision: Elements.Cryo.name,
    image: 'Qiqi.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Child,
    weapon: Weapons.Sword,
    region: Regions.Liyue
  },
  {
    name: 'Raiden Shogun',
    vision: Elements.Electro.name,
    image: 'Raiden Shogun.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Adult,
    weapon: Weapons.Polearm,
    region: Regions.Inazuma
  },
  {
    name: 'Razor',
    vision: Elements.Electro.name,
    image: 'Razor.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Male,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Claymore,
    region: Regions.Mondstadt
  },
  {
    name: 'Rosaria',
    vision: Elements.Cryo.name,
    image: 'Rosaria.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Adult,
    weapon: Weapons.Polearm,
    region: Regions.Mondstadt
  },
  {
    name: 'Sangonomiya Kokomi',
    vision: Elements.Hydro.name,
    image: 'Sangonomiya Kokomi.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Catalyst,
    region: Regions.Inazuma
  },
  {
    name: 'Sayu',
    vision: Elements.Anemo.name,
    image: 'Sayu.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Child,
    weapon: Weapons.Claymore,
    region: Regions.Inazuma
  },
  {
    name: 'Shenhe',
    vision: Elements.Cryo.name,
    image: 'Shenhe.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Adult,
    weapon: Weapons.Polearm,
    region: Regions.Liyue
  },
  {
    name: 'Shikanoin Heizou',
    vision: Elements.Anemo.name,
    image: 'Shikanoin Heizou.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Male,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Catalyst,
    region: Regions.Inazuma
  },
  {
    name: 'Sucrose',
    vision: Elements.Anemo.name,
    image: 'Sucrose.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Catalyst,
    region: Regions.Mondstadt
  },
  {
    name: 'Tartaglia',
    vision: Elements.Hydro.name,
    image: 'Tartaglia.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Male,
    bodyType: BodyTypes.Adult,
    weapon: Weapons.Bow,
    region: Regions.Liyue
  },
  {
    name: 'Thoma',
    vision: Elements.Pyro.name,
    image: 'Thoma.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Male,
    bodyType: BodyTypes.Adult,
    weapon: Weapons.Polearm,
    region: Regions.Inazuma
  },
  {
    name: 'Tighnari',
    vision: Elements.Dendro.name,
    image: 'Tighnari.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Male,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Bow,
    region: Regions.Sumeru
  },
  {
    name: 'Traveler',
    vision: Elements.Unaligned.name,
    image: 'Traveler.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Any,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Sword,
    region: Regions.None
  },
  {
    name: 'Venti',
    vision: Elements.Anemo.name,
    image: 'Venti.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Male,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Bow,
    region: Regions.Mondstadt
  },
  {
    name: 'Wanderer',
    vision: Elements.Anemo.name,
    image: 'Wanderer.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Male,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Catalyst,
    region: Regions.Sumeru
  },
  {
    name: 'Xiangling',
    vision: Elements.Pyro.name,
    image: 'Xiangling.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Polearm,
    region: Regions.Liyue
  },
  {
    name: 'Xiao',
    vision: Elements.Anemo.name,
    image: 'Xiao.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Male,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Polearm,
    region: Regions.Liyue
  },
  {
    name: 'Xingqiu',
    vision: Elements.Hydro.name,
    image: 'Xingqiu.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Male,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Sword,
    region: Regions.Liyue
  },
  {
    name: 'Xinyan',
    vision: Elements.Pyro.name,
    image: 'Xinyan.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Claymore,
    region: Regions.Liyue
  },
  {
    name: 'Yae Miko',
    vision: Elements.Electro.name,
    image: 'Yae Miko.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Adult,
    weapon: Weapons.Catalyst,
    region: Regions.Inazuma
  },
  {
    name: 'Yanfei',
    vision: Elements.Pyro.name,
    image: 'Yanfei.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Catalyst,
    region: Regions.Liyue
  },
  {
    name: 'Yaoyao',
    vision: Elements.Dendro.name,
    image: 'Yaoyao.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Child,
    weapon: Weapons.Polearm,
    region: Regions.Liyue
  },
  {
    name: 'Yelan',
    vision: Elements.Hydro.name,
    image: 'Yelan.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Adult,
    weapon: Weapons.Bow,
    region: Regions.Liyue
  },
  {
    name: 'Yoimiya',
    vision: Elements.Pyro.name,
    image: 'Yoimiya.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Bow,
    region: Regions.Inazuma
  },
  {
    name: 'Yun Jin',
    vision: Elements.Geo.name,
    image: 'Yun Jin.webp',
    rarity: Rarities.Rare,
    sex: Sexes.Female,
    bodyType: BodyTypes.Teenager,
    weapon: Weapons.Polearm,
    region: Regions.Liyue
  },
  {
    name: 'Zhongli',
    vision: Elements.Geo.name,
    image: 'Zhongli.webp',
    rarity: Rarities.VeryRare,
    sex: Sexes.Male,
    bodyType: BodyTypes.Adult,
    weapon: Weapons.Polearm,
    region: Regions.Liyue
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

const imageTypes: string[] = []
imageTypes.push('Thumbnail')
imageTypes.push('Splash')
imageTypes.push('Panel')
imageTypes.push('Admin Panel')
imageTypes.push('VS')

export const imageList: string[] = Characters.map((character: Character) => {
  return imageTypes.map((type: string) => {
    return `assets/Characters/${type}/${character.image}`
  })
}).flat()

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

export type Autoban = {
  readonly value: string,
  readonly label: string
}

export const AutobanOptions: Autoban[] = [
  {
    value: Elements.Anemo.name,
    label: 'Anemo Characters'
  },
  {
    value: Elements.Geo.name,
    label: 'Geo Characters'
  },
  {
    value: Elements.Electro.name,
    label: 'Electro Characters'
  },
  {
    value: Elements.Dendro.name,
    label: 'Dendro Characters'
  },
  {
    value: Elements.Hydro.name,
    label: 'Hydro Characters'
  },
  {
    value: Elements.Pyro.name,
    label: 'Pyro Characters'
  },
  {
    value: Elements.Cryo.name,
    label: 'Cryo Characters'
  },
  {
    value: Sexes.Male,
    label: 'Male Characters'
  },
  {
    value: Sexes.Female,
    label: 'Female Characters'
  },
  {
    value: Rarities.Rare,
    label: '4-Star Characters'
  },
  {
    value: Rarities.VeryRare,
    label: '5-Star Characters'
  },
  {
    value: BodyTypes.Child,
    label: 'Body Type: Child'
  },
  {
    value: BodyTypes.Teenager,
    label: 'Body Type: Teenager'
  },
  {
    value: BodyTypes.Adult,
    label: 'Body Type: Adult'
  },
  {
    value: Weapons.Sword,
    label: 'Sword Users'
  },
  {
    value: Weapons.Claymore,
    label: 'Claymore Users'
  },
  {
    value: Weapons.Polearm,
    label: 'Polearm Users'
  },
  {
    value: Weapons.Bow,
    label: 'Bow Users'
  },
  {
    value: Weapons.Catalyst,
    label: 'Catalyst Users'
  },
  {
    value: Regions.Mondstadt,
    label: 'Mondstadt-released Characters'
  },
  {
    value: Regions.Liyue,
    label: 'Liyue-released Characters'
  },
  {
    value: Regions.Inazuma,
    label: 'Inazuma-released Characters'
  },
  {
    value: Regions.Sumeru,
    label: 'Sumeru-released Characters'
  }
]