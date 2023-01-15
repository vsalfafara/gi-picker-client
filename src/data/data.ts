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
  image: string
  thumbnail: string
  flash?: string
  forSelection?: boolean;
}

type Panel = {
  [key: string]: Character[]
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
    image: 'assets/Characters/Flash/Albedo.webp',
    thumbnail: 'assets/Characters/Thumbnail/Albedo.webp',
  },
  {
    name: 'Aloy',
    vision: Elements.Cryo.name,
    image: 'assets/Characters/Flash/Aloy.webp',
    thumbnail: 'assets/Characters/Thumbnail/Aloy.webp',
  },
  {
    name: 'Amber',
    vision: Elements.Pyro.name,
    image: 'assets/Characters/Flash/Amber.webp',
    thumbnail: 'assets/Characters/Thumbnail/Amber.webp',
  },
  {
    name: 'Arataki Itto',
    vision: Elements.Geo.name,
    image: 'assets/Characters/Flash/Arataki Itto.webp',
    thumbnail: 'assets/Characters/Thumbnail/Arataki Itto.webp',
  },
  {
    name: 'Barbara',
    vision: Elements.Hydro.name,
    image: 'assets/Characters/Flash/Barbara.webp',
    thumbnail: 'assets/Characters/Thumbnail/Barbara.webp',
  },
  {
    name: 'Beidou',
    vision: Elements.Electro.name,
    image: 'assets/Characters/Flash/Beidou.webp',
    thumbnail: 'assets/Characters/Thumbnail/Beidou.webp',
  },
  {
    name: 'Bennett',
    vision: Elements.Pyro.name,
    image: 'assets/Characters/Flash/Bennett.webp',
    thumbnail: 'assets/Characters/Thumbnail/Bennett.webp',
  },
  {
    name: 'Candace',
    vision: Elements.Hydro.name,
    image: 'assets/Characters/Flash/Candace.webp',
    thumbnail: 'assets/Characters/Thumbnail/Candace.webp',
  },
  {
    name: 'Chongyun',
    vision: Elements.Cryo.name,
    image: 'assets/Characters/Flash/Chongyun.webp',
    thumbnail: 'assets/Characters/Thumbnail/Chongyun.webp',
  },
  {
    name: 'Collei',
    vision: Elements.Dendro.name,
    image: 'assets/Characters/Flash/Collei.webp',
    thumbnail: 'assets/Characters/Thumbnail/Collei.webp',
  },
  {
    name: 'Cyno',
    vision: Elements.Electro.name,
    image: 'assets/Characters/Flash/Cyno.webp',
    thumbnail: 'assets/Characters/Thumbnail/Cyno.webp',
  },
  {
    name: 'Diluc',
    vision: Elements.Pyro.name,
    image: 'assets/Characters/Flash/Diluc.webp',
    thumbnail: 'assets/Characters/Thumbnail/Diluc.webp',
    flash: 'assets/Characters/flash/Diluc.webp'
  },
  {
    name: 'Diona',
    vision: Elements.Cryo.name,
    image: 'assets/Characters/Flash/Diona.webp',
    thumbnail: 'assets/Characters/Thumbnail/Diona.webp',
  },
  {
    name: 'Dori',
    vision: Elements.Electro.name,
    image: 'assets/Characters/Flash/Dori.webp',
    thumbnail: 'assets/Characters/Thumbnail/Dori.webp',
  },
  {
    name: 'Eula',
    vision: Elements.Cryo.name,
    image: 'assets/Characters/Flash/Eula.webp',
    thumbnail: 'assets/Characters/Thumbnail/Eula.webp',
  },
  {
    name: 'Faruzan',
    vision: Elements.Anemo.name,
    image: 'assets/Characters/Flash/Faruzan.webp',
    thumbnail: 'assets/Characters/Thumbnail/Faruzan.webp'
  },
  {
    name: 'Fischl',
    vision: Elements.Electro.name,
    image: 'assets/Characters/Flash/Fischl.webp',
    thumbnail: 'assets/Characters/Thumbnail/Fischl.webp',
  },
  {
    name: 'Ganyu',
    vision: Elements.Cryo.name,
    image: 'assets/Characters/Flash/Ganyu.webp',
    thumbnail: 'assets/Characters/Thumbnail/Ganyu.webp',
  },
  {
    name: 'Gorou',
    vision: Elements.Geo.name,
    image: 'assets/Characters/Flash/Gorou.webp',
    thumbnail: 'assets/Characters/Thumbnail/Gorou.webp',
  },
  {
    name: 'Hu Tao',
    vision: Elements.Pyro.name,
    image: 'assets/Characters/Flash/Hu Tao.webp',
    thumbnail: 'assets/Characters/Thumbnail/Hu Tao.webp',
  },
  {
    name: 'Jean',
    vision: Elements.Anemo.name,
    image: 'assets/Characters/Flash/Jean.webp',
    thumbnail: 'assets/Characters/Thumbnail/Jean.webp',
  },
  {
    name: 'Kaedahara Kazuha',
    vision: Elements.Anemo.name,
    image: 'assets/Characters/Flash/Kaedahara Kazuha.webp',
    thumbnail: 'assets/Characters/Thumbnail/Kaedahara Kazuha.webp',
  },
  {
    name: 'Kaeya',
    vision: Elements.Cryo.name,
    image: 'assets/Characters/Flash/Kaeya.webp',
    thumbnail: 'assets/Characters/Thumbnail/Kaeya.webp',
  },
  {
    name: 'Kamisato Ayaka',
    vision: Elements.Cryo.name,
    image: 'assets/Characters/Flash/Kamisato Ayaka.webp',
    thumbnail: 'assets/Characters/Thumbnail/Kamisato Ayaka.webp',
  },
  {
    name: 'Kamisato Ayato',
    vision: Elements.Hydro.name,
    image: 'assets/Characters/Flash/Kamisato Ayato.webp',
    thumbnail: 'assets/Characters/Thumbnail/Kamisato Ayato.webp',
  },
  {
    name: 'Keqing',
    vision: Elements.Electro.name,
    image: 'assets/Characters/Flash/Keqing.webp',
    thumbnail: 'assets/Characters/Thumbnail/Keqing.webp',
  },
  {
    name: 'Klee',
    vision: Elements.Pyro.name,
    image: 'assets/Characters/Flash/Klee.webp',
    thumbnail: 'assets/Characters/Thumbnail/Klee.webp',
  },
  {
    name: 'Kujou Sara',
    vision: Elements.Electro.name,
    image: 'assets/Characters/Flash/Kujou Sara.webp',
    thumbnail: 'assets/Characters/Thumbnail/Kujou Sara.webp',
  },
  {
    name: 'Kuki Shinobu',
    vision: Elements.Electro.name,
    image: 'assets/Characters/Flash/Kuki Shinobu.webp',
    thumbnail: 'assets/Characters/Thumbnail/Kuki Shinobu.webp',
  },
  {
    name: 'Layla',
    vision: Elements.Cryo.name,
    image: 'assets/Characters/Flash/Layla.webp',
    thumbnail: 'assets/Characters/Thumbnail/Layla.webp'
  },
  {
    name: 'Lisa',
    vision: Elements.Electro.name,
    image: 'assets/Characters/Flash/Lisa.webp',
    thumbnail: 'assets/Characters/Thumbnail/Lisa.webp',
  },
  {
    name: 'Mona',
    vision: Elements.Hydro.name,
    image: 'assets/Characters/Flash/Mona.webp',
    thumbnail: 'assets/Characters/Thumbnail/Mona.webp',
  },
  {
    name: 'Nahida',
    vision: Elements.Dendro.name,
    image: 'assets/Characters/Flash/Nahida.webp',
    thumbnail: 'assets/Characters/Thumbnail/Nahida.webp',
  },
  {
    name: 'Nilou',
    vision: Elements.Hydro.name,
    image: 'assets/Characters/Flash/Nilou.webp',
    thumbnail: 'assets/Characters/Thumbnail/Nilou.webp',
  },
  {
    name: 'Ningguang',
    vision: Elements.Geo.name,
    image: 'assets/Characters/Flash/Ningguang.webp',
    thumbnail: 'assets/Characters/Thumbnail/Ningguang.webp',
  },
  {
    name: 'Noelle',
    vision: Elements.Geo.name,
    image: 'assets/Characters/Flash/Noelle.webp',
    thumbnail: 'assets/Characters/Thumbnail/Noelle.webp',
  },
  {
    name: 'Qiqi',
    vision: Elements.Cryo.name,
    image: 'assets/Characters/Flash/Qiqi.webp',
    thumbnail: 'assets/Characters/Thumbnail/Qiqi.webp',
  },
  {
    name: 'Raiden Shogun',
    vision: Elements.Electro.name,
    image: 'assets/Characters/Flash/Raiden Shogun.webp',
    thumbnail: 'assets/Characters/Thumbnail/Raiden Shogun.webp',
  },
  {
    name: 'Razor',
    vision: Elements.Electro.name,
    image: 'assets/Characters/Flash/Razor.webp',
    thumbnail: 'assets/Characters/Thumbnail/Razor.webp',
  },
  {
    name: 'Rosaria',
    vision: Elements.Cryo.name,
    image: 'assets/Characters/Flash/Rosaria.webp',
    thumbnail: 'assets/Characters/Thumbnail/Rosaria.webp',
  },
  {
    name: 'Sangonomiya Kokomi',
    vision: Elements.Hydro.name,
    image: 'assets/Characters/Flash/Sangonomiya Kokomi.webp',
    thumbnail: 'assets/Characters/Thumbnail/Sangonomiya Kokomi.webp',
  },
  {
    name: 'Sayu',
    vision: Elements.Anemo.name,
    image: 'assets/Characters/Flash/Sayu.webp',
    thumbnail: 'assets/Characters/Thumbnail/Sayu.webp',
  },
  {
    name: 'Shenhe',
    vision: Elements.Cryo.name,
    image: 'assets/Characters/Flash/Shenhe.webp',
    thumbnail: 'assets/Characters/Thumbnail/Shenhe.webp',
  },
  {
    name: 'Shikanoin Heizou',
    vision: Elements.Anemo.name,
    image: 'assets/Characters/Flash/Shikanoin Heizou.webp',
    thumbnail: 'assets/Characters/Thumbnail/Shikanoin Heizou.webp',
  },
  {
    name: 'Sucrose',
    vision: Elements.Anemo.name,
    image: 'assets/Characters/Flash/Sucrose.webp',
    thumbnail: 'assets/Characters/Thumbnail/Sucrose.webp',
  },
  {
    name: 'Tartaglia/Childe',
    vision: Elements.Hydro.name,
    image: 'assets/Characters/Flash/Tartaglia.webp',
    thumbnail: 'assets/Characters/Thumbnail/Tartaglia.webp',
  },
  {
    name: 'Thoma',
    vision: Elements.Pyro.name,
    image: 'assets/Characters/Flash/Thoma.webp',
    thumbnail: 'assets/Characters/Thumbnail/Thoma.webp',
  },
  {
    name: 'Tighnari',
    vision: Elements.Dendro.name,
    image: 'assets/Characters/Flash/Tighnari.webp',
    thumbnail: 'assets/Characters/Thumbnail/Tighnari.webp',
  },
  {
    name: 'Traveler/Aether/Lumine',
    vision: Elements.Unaligned.name,
    image: 'assets/Characters/Flash/Traveler.webp',
    thumbnail: 'assets/Characters/Thumbnail/Traveler.webp'
  },
  {
    name: 'Venti',
    vision: Elements.Anemo.name,
    image: 'assets/Characters/Flash/Venti.webp',
    thumbnail: 'assets/Characters/Thumbnail/Venti.webp',
  },
  {
    name: 'Wanderer',
    vision: Elements.Anemo.name,
    image: 'assets/Characters/Flash/Wanderer.webp',
    thumbnail: 'assets/Characters/Thumbnail/Wanderer.webp'
  },
  {
    name: 'Xiangling',
    vision: Elements.Pyro.name,
    image: 'assets/Characters/Flash/Xiangling.webp',
    thumbnail: 'assets/Characters/Thumbnail/Xiangling.webp',
  },
  {
    name: 'Xiao',
    vision: Elements.Anemo.name,
    image: 'assets/Characters/Flash/Xiao.webp',
    thumbnail: 'assets/Characters/Thumbnail/Xiao.webp',
  },
  {
    name: 'Xingqiu',
    vision: Elements.Hydro.name,
    image: 'assets/Characters/Flash/Xingqiu.webp',
    thumbnail: 'assets/Characters/Thumbnail/Xingqiu.webp',
  },
  {
    name: 'Xinyan',
    vision: Elements.Pyro.name,
    image: 'assets/Characters/Flash/Xinyan.webp',
    thumbnail: 'assets/Characters/Thumbnail/Xinyan.webp',
  },
  {
    name: 'Yae Miko',
    vision: Elements.Electro.name,
    image: 'assets/Characters/Flash/Yae Miko.webp',
    thumbnail: 'assets/Characters/Thumbnail/Yae Miko.webp',
  },
  {
    name: 'Yanfei',
    vision: Elements.Pyro.name,
    image: 'assets/Characters/Flash/Yanfei.webp',
    thumbnail: 'assets/Characters/Thumbnail/Yanfei.webp',
  },
  {
    name: 'Yelan',
    vision: Elements.Hydro.name,
    image: 'assets/Characters/Flash/Yelan.webp',
    thumbnail: 'assets/Characters/Thumbnail/Yelan.webp',
  },
  {
    name: 'Yoimiya',
    vision: Elements.Pyro.name,
    image: 'assets/Characters/Flash/Yoimiya.webp',
    thumbnail: 'assets/Characters/Thumbnail/Yoimiya.webp',
  },
  {
    name: 'Yun Jin',
    vision: Elements.Geo.name,
    image: 'assets/Characters/Flash/Yun Jin.webp',
    thumbnail: 'assets/Characters/Thumbnail/Yun Jin.webp',
  },
  {
    name: 'Zhongli',
    vision: Elements.Geo.name,
    image: 'assets/Characters/Flash/Zhongli.webp',
    thumbnail: 'assets/Characters/Thumbnail/Zhongli.webp',
  }
]

let modifiedCharacters = [...Characters]

let availableCharacters = [...modifiedCharacters]

export function getPanels() {
  return availableCharacters.reduce((result: any, character: Character) => {
    result[character.vision] = result[character.vision] || []
    result[character.vision].push(character)
    return result
  }, Object.create(null))
}

export function removeCharacter(name: string) {
  modifiedCharacters = modifiedCharacters.filter((character: Character) => character.name !== name)
  availableCharacters = [...modifiedCharacters]
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