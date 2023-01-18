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
  panel: string
  adminPanel: string
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
    image: 'assets/Characters/Panel/Albedo.webp',
    thumbnail: 'assets/Characters/Thumbnail/Albedo.webp',
    panel: 'assets/Characters/Panel/Albedo.webp',
    adminPanel: 'assets/Characters/Admin Panel/Albedo.webp'
  },
  {
    name: 'Aloy',
    vision: Elements.Cryo.name,
    image: 'assets/Characters/Panel/Aloy.webp',
    thumbnail: 'assets/Characters/Thumbnail/Aloy.webp',
    panel: 'assets/Characters/Panel/Aloy.webp',
    adminPanel: 'assets/Characters/Admin Panel/Aloy.webp'
  },
  {
    name: 'Alhaitham',
    vision: Elements.Dendro.name,
    image: 'assets/Characters/Panel/Alhaitham.webp',
    thumbnail: 'assets/Characters/Thumbnail/Alhaitham.webp',
    panel: 'assets/Characters/Panel/Alhaitham.webp',
    adminPanel: 'assets/Characters/Admin Panel/Alhaitham.webp'
  },
  {
    name: 'Amber',
    vision: Elements.Pyro.name,
    image: 'assets/Characters/Panel/Amber.webp',
    thumbnail: 'assets/Characters/Thumbnail/Amber.webp',
    panel: 'assets/Characters/Panel/Amber.webp',
    adminPanel: 'assets/Characters/Admin Panel/Amber.webp'
  },
  {
    name: 'Arataki Itto',
    vision: Elements.Geo.name,
    image: 'assets/Characters/Panel/Arataki Itto.webp',
    thumbnail: 'assets/Characters/Thumbnail/Arataki Itto.webp',
    panel: 'assets/Characters/Panel/Arataki Itto.webp',
    adminPanel: 'assets/Characters/Admin Panel/Arataki Itto.webp'
  },
  {
    name: 'Barbara',
    vision: Elements.Hydro.name,
    image: 'assets/Characters/Panel/Barbara.webp',
    thumbnail: 'assets/Characters/Thumbnail/Barbara.webp',
    panel: 'assets/Characters/Panel/Barbara.webp',
    adminPanel: 'assets/Characters/Admin Panel/Barbara.webp'
  },
  {
    name: 'Beidou',
    vision: Elements.Electro.name,
    image: 'assets/Characters/Panel/Beidou.webp',
    thumbnail: 'assets/Characters/Thumbnail/Beidou.webp',
    panel: 'assets/Characters/Panel/Beidou.webp',
    adminPanel: 'assets/Characters/Admin Panel/Beidou.webp'
  },
  {
    name: 'Bennett',
    vision: Elements.Pyro.name,
    image: 'assets/Characters/Panel/Bennett.webp',
    thumbnail: 'assets/Characters/Thumbnail/Bennett.webp',
    panel: 'assets/Characters/Panel/Bennett.webp',
    adminPanel: 'assets/Characters/Admin Panel/Bennett.webp'
  },
  {
    name: 'Candace',
    vision: Elements.Hydro.name,
    image: 'assets/Characters/Panel/Candace.webp',
    thumbnail: 'assets/Characters/Thumbnail/Candace.webp',
    panel: 'assets/Characters/Panel/Candace.webp',
    adminPanel: 'assets/Characters/Admin Panel/Candace.webp'
  },
  {
    name: 'Chongyun',
    vision: Elements.Cryo.name,
    image: 'assets/Characters/Panel/Chongyun.webp',
    thumbnail: 'assets/Characters/Thumbnail/Chongyun.webp',
    panel: 'assets/Characters/Panel/Chongyun.webp',
    adminPanel: 'assets/Characters/Admin Panel/Chongyun.webp'
  },
  {
    name: 'Collei',
    vision: Elements.Dendro.name,
    image: 'assets/Characters/Panel/Collei.webp',
    thumbnail: 'assets/Characters/Thumbnail/Collei.webp',
    panel: 'assets/Characters/Panel/Collei.webp',
    adminPanel: 'assets/Characters/Admin Panel/Collei.webp'
  },
  {
    name: 'Cyno',
    vision: Elements.Electro.name,
    image: 'assets/Characters/Panel/Cyno.webp',
    thumbnail: 'assets/Characters/Thumbnail/Cyno.webp',
    panel: 'assets/Characters/Panel/Cyno.webp',
    adminPanel: 'assets/Characters/Admin Panel/Cyno.webp'
  },
  {
    name: 'Diluc',
    vision: Elements.Pyro.name,
    image: 'assets/Characters/Panel/Diluc.webp',
    thumbnail: 'assets/Characters/Thumbnail/Diluc.webp',
    panel: 'assets/Characters/Panel/Diluc.webp',
    adminPanel: 'assets/Characters/Admin Panel/Diluc.webp'
  },
  {
    name: 'Diona',
    vision: Elements.Cryo.name,
    image: 'assets/Characters/Panel/Diona.webp',
    thumbnail: 'assets/Characters/Thumbnail/Diona.webp',
    panel: 'assets/Characters/Panel/Diona.webp',
    adminPanel: 'assets/Characters/Admin Panel/Diona.webp'
  },
  {
    name: 'Dori',
    vision: Elements.Electro.name,
    image: 'assets/Characters/Panel/Dori.webp',
    thumbnail: 'assets/Characters/Thumbnail/Dori.webp',
    panel: 'assets/Characters/Panel/Dori.webp',
    adminPanel: 'assets/Characters/Admin Panel/Dori.webp'
  },
  {
    name: 'Eula',
    vision: Elements.Cryo.name,
    image: 'assets/Characters/Panel/Eula.webp',
    thumbnail: 'assets/Characters/Thumbnail/Eula.webp',
    panel: 'assets/Characters/Panel/Eula.webp',
    adminPanel: 'assets/Characters/Admin Panel/Eula.webp'
  },
  {
    name: 'Faruzan',
    vision: Elements.Anemo.name,
    image: 'assets/Characters/Panel/Faruzan.webp',
    thumbnail: 'assets/Characters/Thumbnail/Faruzan.webp',
    panel: 'assets/Characters/Panel/Faruzan.webp',
    adminPanel: 'assets/Characters/Admin Panel/Faruzan.webp'
  },
  {
    name: 'Fischl',
    vision: Elements.Electro.name,
    image: 'assets/Characters/Panel/Fischl.webp',
    thumbnail: 'assets/Characters/Thumbnail/Fischl.webp',
    panel: 'assets/Characters/Panel/Fischl.webp',
    adminPanel: 'assets/Characters/Admin Panel/Fischl.webp'
  },
  {
    name: 'Ganyu',
    vision: Elements.Cryo.name,
    image: 'assets/Characters/Panel/Ganyu.webp',
    thumbnail: 'assets/Characters/Thumbnail/Ganyu.webp',
    panel: 'assets/Characters/Panel/Ganyu.webp',
    adminPanel: 'assets/Characters/Admin Panel/Ganyu.webp'
  },
  {
    name: 'Gorou',
    vision: Elements.Geo.name,
    image: 'assets/Characters/Panel/Gorou.webp',
    thumbnail: 'assets/Characters/Thumbnail/Gorou.webp',
    panel: 'assets/Characters/Panel/Gorou.webp',
    adminPanel: 'assets/Characters/Admin Panel/Gorou.webp'
  },
  {
    name: 'Hu Tao',
    vision: Elements.Pyro.name,
    image: 'assets/Characters/Panel/Hu Tao.webp',
    thumbnail: 'assets/Characters/Thumbnail/Hu Tao.webp',
    panel: 'assets/Characters/Panel/Hu Tao.webp',
    adminPanel: 'assets/Characters/Admin Panel/Hu Tao.webp'
  },
  {
    name: 'Jean',
    vision: Elements.Anemo.name,
    image: 'assets/Characters/Panel/Jean.webp',
    thumbnail: 'assets/Characters/Thumbnail/Jean.webp',
    panel: 'assets/Characters/Panel/Jean.webp',
    adminPanel: 'assets/Characters/Admin Panel/Jean.webp'
  },
  {
    name: 'Kaedahara Kazuha',
    vision: Elements.Anemo.name,
    image: 'assets/Characters/Panel/Kaedahara Kazuha.webp',
    thumbnail: 'assets/Characters/Thumbnail/Kaedahara Kazuha.webp',
    panel: 'assets/Characters/Panel/Kaedahara Kazuha.webp',
    adminPanel: 'assets/Characters/Admin Panel/Kaedahara Kazuha.webp'
  },
  {
    name: 'Kaeya',
    vision: Elements.Cryo.name,
    image: 'assets/Characters/Panel/Kaeya.webp',
    thumbnail: 'assets/Characters/Thumbnail/Kaeya.webp',
    panel: 'assets/Characters/Panel/Kaeya.webp',
    adminPanel: 'assets/Characters/Admin Panel/Kaeya.webp'
  },
  {
    name: 'Kamisato Ayaka',
    vision: Elements.Cryo.name,
    image: 'assets/Characters/Panel/Kamisato Ayaka.webp',
    thumbnail: 'assets/Characters/Thumbnail/Kamisato Ayaka.webp',
    panel: 'assets/Characters/Panel/Kamisato Ayaka.webp',
    adminPanel: 'assets/Characters/Admin Panel/Kamisato Ayaka.webp'
  },
  {
    name: 'Kamisato Ayato',
    vision: Elements.Hydro.name,
    image: 'assets/Characters/Panel/Kamisato Ayato.webp',
    thumbnail: 'assets/Characters/Thumbnail/Kamisato Ayato.webp',
    panel: 'assets/Characters/Panel/Kamisato Ayato.webp',
    adminPanel: 'assets/Characters/Admin Panel/Kamisato Ayato.webp'
  },
  {
    name: 'Keqing',
    vision: Elements.Electro.name,
    image: 'assets/Characters/Panel/Keqing.webp',
    thumbnail: 'assets/Characters/Thumbnail/Keqing.webp',
    panel: 'assets/Characters/Panel/Keqing.webp',
    adminPanel: 'assets/Characters/Admin Panel/Keqing.webp'
  },
  {
    name: 'Klee',
    vision: Elements.Pyro.name,
    image: 'assets/Characters/Panel/Klee.webp',
    thumbnail: 'assets/Characters/Thumbnail/Klee.webp',
    panel: 'assets/Characters/Panel/Klee.webp',
    adminPanel: 'assets/Characters/Admin Panel/Klee.webp'
  },
  {
    name: 'Kujou Sara',
    vision: Elements.Electro.name,
    image: 'assets/Characters/Panel/Kujou Sara.webp',
    thumbnail: 'assets/Characters/Thumbnail/Kujou Sara.webp',
    panel: 'assets/Characters/Panel/Kujou Sara.webp',
    adminPanel: 'assets/Characters/Admin Panel/Kujou Sara.webp'
  },
  {
    name: 'Kuki Shinobu',
    vision: Elements.Electro.name,
    image: 'assets/Characters/Panel/Kuki Shinobu.webp',
    thumbnail: 'assets/Characters/Thumbnail/Kuki Shinobu.webp',
    panel: 'assets/Characters/Panel/Kuki Shinobu.webp',
    adminPanel: 'assets/Characters/Admin Panel/Kuki Shinobu.webp'
  },
  {
    name: 'Layla',
    vision: Elements.Cryo.name,
    image: 'assets/Characters/Panel/Layla.webp',
    thumbnail: 'assets/Characters/Thumbnail/Layla.webp',
    panel: 'assets/Characters/Panel/Layla.webp',
    adminPanel: 'assets/Characters/Admin Panel/Layla.webp'
  },
  {
    name: 'Lisa',
    vision: Elements.Electro.name,
    image: 'assets/Characters/Panel/Lisa.webp',
    thumbnail: 'assets/Characters/Thumbnail/Lisa.webp',
    panel: 'assets/Characters/Panel/Lisa.webp',
    adminPanel: 'assets/Characters/Admin Panel/Lisa.webp'
  },
  {
    name: 'Mona',
    vision: Elements.Hydro.name,
    image: 'assets/Characters/Panel/Mona.webp',
    thumbnail: 'assets/Characters/Thumbnail/Mona.webp',
    panel: 'assets/Characters/Panel/Mona.webp',
    adminPanel: 'assets/Characters/Admin Panel/Mona.webp'
  },
  {
    name: 'Nahida',
    vision: Elements.Dendro.name,
    image: 'assets/Characters/Panel/Nahida.webp',
    thumbnail: 'assets/Characters/Thumbnail/Nahida.webp',
    panel: 'assets/Characters/Panel/Nahida.webp',
    adminPanel: 'assets/Characters/Admin Panel/Nahida.webp'
  },
  {
    name: 'Nilou',
    vision: Elements.Hydro.name,
    image: 'assets/Characters/Panel/Nilou.webp',
    thumbnail: 'assets/Characters/Thumbnail/Nilou.webp',
    panel: 'assets/Characters/Panel/Nilou.webp',
    adminPanel: 'assets/Characters/Admin Panel/Nilou.webp'
  },
  {
    name: 'Ningguang',
    vision: Elements.Geo.name,
    image: 'assets/Characters/Panel/Ningguang.webp',
    thumbnail: 'assets/Characters/Thumbnail/Ningguang.webp',
    panel: 'assets/Characters/Panel/Ningguang.webp',
    adminPanel: 'assets/Characters/Admin Panel/Ningguang.webp'
  },
  {
    name: 'Noelle',
    vision: Elements.Geo.name,
    image: 'assets/Characters/Panel/Noelle.webp',
    thumbnail: 'assets/Characters/Thumbnail/Noelle.webp',
    panel: 'assets/Characters/Panel/Noelle.webp',
    adminPanel: 'assets/Characters/Admin Panel/Noelle.webp'
  },
  {
    name: 'Qiqi',
    vision: Elements.Cryo.name,
    image: 'assets/Characters/Panel/Qiqi.webp',
    thumbnail: 'assets/Characters/Thumbnail/Qiqi.webp',
    panel: 'assets/Characters/Panel/Qiqi.webp',
    adminPanel: 'assets/Characters/Admin Panel/Qiqi.webp'
  },
  {
    name: 'Raiden Shogun',
    vision: Elements.Electro.name,
    image: 'assets/Characters/Panel/Raiden Shogun.webp',
    thumbnail: 'assets/Characters/Thumbnail/Raiden Shogun.webp',
    panel: 'assets/Characters/Panel/Raiden Shogun.webp',
    adminPanel: 'assets/Characters/Admin Panel/Raiden Shogun.webp'
  },
  {
    name: 'Razor',
    vision: Elements.Electro.name,
    image: 'assets/Characters/Panel/Razor.webp',
    thumbnail: 'assets/Characters/Thumbnail/Razor.webp',
    panel: 'assets/Characters/Panel/Razor.webp',
    adminPanel: 'assets/Characters/Admin Panel/Razor.webp'
  },
  {
    name: 'Rosaria',
    vision: Elements.Cryo.name,
    image: 'assets/Characters/Panel/Rosaria.webp',
    thumbnail: 'assets/Characters/Thumbnail/Rosaria.webp',
    panel: 'assets/Characters/Panel/Rosaria.webp',
    adminPanel: 'assets/Characters/Admin Panel/Rosaria.webp'
  },
  {
    name: 'Sangonomiya Kokomi',
    vision: Elements.Hydro.name,
    image: 'assets/Characters/Panel/Sangonomiya Kokomi.webp',
    thumbnail: 'assets/Characters/Thumbnail/Sangonomiya Kokomi.webp',
    panel: 'assets/Characters/Panel/Sangonomiya Kokomi.webp',
    adminPanel: 'assets/Characters/Admin Panel/Sangonomiya Kokomi.webp'
  },
  {
    name: 'Sayu',
    vision: Elements.Anemo.name,
    image: 'assets/Characters/Panel/Sayu.webp',
    thumbnail: 'assets/Characters/Thumbnail/Sayu.webp',
    panel: 'assets/Characters/Panel/Sayu.webp',
    adminPanel: 'assets/Characters/Admin Panel/Sayu.webp'
  },
  {
    name: 'Shenhe',
    vision: Elements.Cryo.name,
    image: 'assets/Characters/Panel/Shenhe.webp',
    thumbnail: 'assets/Characters/Thumbnail/Shenhe.webp',
    panel: 'assets/Characters/Panel/Shenhe.webp',
    adminPanel: 'assets/Characters/Admin Panel/Shenhe.webp'
  },
  {
    name: 'Shikanoin Heizou',
    vision: Elements.Anemo.name,
    image: 'assets/Characters/Panel/Shikanoin Heizou.webp',
    thumbnail: 'assets/Characters/Thumbnail/Shikanoin Heizou.webp',
    panel: 'assets/Characters/Panel/Shikanoin Heizou.webp',
    adminPanel: 'assets/Characters/Admin Panel/Shikanoin Heizou.webp'
  },
  {
    name: 'Sucrose',
    vision: Elements.Anemo.name,
    image: 'assets/Characters/Panel/Sucrose.webp',
    thumbnail: 'assets/Characters/Thumbnail/Sucrose.webp',
    panel: 'assets/Characters/Panel/Sucrose.webp',
    adminPanel: 'assets/Characters/Admin Panel/Sucrose.webp'
  },
  {
    name: 'Tartaglia/Childe',
    vision: Elements.Hydro.name,
    image: 'assets/Characters/Panel/Tartaglia.webp',
    thumbnail: 'assets/Characters/Thumbnail/Tartaglia.webp',
    panel: 'assets/Characters/Panel/Tartaglia.webp',
    adminPanel: 'assets/Characters/Admin Panel/Tartaglia.webp'
  },
  {
    name: 'Thoma',
    vision: Elements.Pyro.name,
    image: 'assets/Characters/Panel/Thoma.webp',
    thumbnail: 'assets/Characters/Thumbnail/Thoma.webp',
    panel: 'assets/Characters/Panel/Thoma.webp',
    adminPanel: 'assets/Characters/Admin Panel/Thoma.webp'
  },
  {
    name: 'Tighnari',
    vision: Elements.Dendro.name,
    image: 'assets/Characters/Panel/Tighnari.webp',
    thumbnail: 'assets/Characters/Thumbnail/Tighnari.webp',
    panel: 'assets/Characters/Panel/Tighnari.webp',
    adminPanel: 'assets/Characters/Admin Panel/Tighnari.webp'
  },
  {
    name: 'Traveler/Aether/Lumine',
    vision: Elements.Unaligned.name,
    image: 'assets/Characters/Panel/Traveler.webp',
    thumbnail: 'assets/Characters/Thumbnail/Traveler.webp',
    panel: 'assets/Characters/Panel/Traveler.webp',
    adminPanel: 'assets/Characters/Admin Panel/Traveler.webp'
  },
  {
    name: 'Venti',
    vision: Elements.Anemo.name,
    image: 'assets/Characters/Panel/Venti.webp',
    thumbnail: 'assets/Characters/Thumbnail/Venti.webp',
    panel: 'assets/Characters/Panel/Venti.webp',
    adminPanel: 'assets/Characters/Admin Panel/Venti.webp'
  },
  {
    name: 'Wanderer',
    vision: Elements.Anemo.name,
    image: 'assets/Characters/Panel/Wanderer.webp',
    thumbnail: 'assets/Characters/Thumbnail/Wanderer.webp',
    panel: 'assets/Characters/Panel/Wanderer.webp',
    adminPanel: 'assets/Characters/Admin Panel/Wanderer.webp'
  },
  {
    name: 'Xiangling',
    vision: Elements.Pyro.name,
    image: 'assets/Characters/Panel/Xiangling.webp',
    thumbnail: 'assets/Characters/Thumbnail/Xiangling.webp',
    panel: 'assets/Characters/Panel/Xiangling.webp',
    adminPanel: 'assets/Characters/Admin Panel/Xiangling.webp'
  },
  {
    name: 'Xiao',
    vision: Elements.Anemo.name,
    image: 'assets/Characters/Panel/Xiao.webp',
    thumbnail: 'assets/Characters/Thumbnail/Xiao.webp',
    panel: 'assets/Characters/Panel/Xiao.webp',
    adminPanel: 'assets/Characters/Admin Panel/Xiao.webp'
  },
  {
    name: 'Xingqiu',
    vision: Elements.Hydro.name,
    image: 'assets/Characters/Panel/Xingqiu.webp',
    thumbnail: 'assets/Characters/Thumbnail/Xingqiu.webp',
    panel: 'assets/Characters/Panel/Xingqiu.webp',
    adminPanel: 'assets/Characters/Admin Panel/Xingqiu.webp'
  },
  {
    name: 'Xinyan',
    vision: Elements.Pyro.name,
    image: 'assets/Characters/Panel/Xinyan.webp',
    thumbnail: 'assets/Characters/Thumbnail/Xinyan.webp',
    panel: 'assets/Characters/Panel/Xinyan.webp',
    adminPanel: 'assets/Characters/Admin Panel/Xinyan.webp'
  },
  {
    name: 'Yae Miko',
    vision: Elements.Electro.name,
    image: 'assets/Characters/Panel/Yae Miko.webp',
    thumbnail: 'assets/Characters/Thumbnail/Yae Miko.webp',
    panel: 'assets/Characters/Panel/Yae Miko.webp',
    adminPanel: 'assets/Characters/Admin Panel/Yae Miko.webp'
  },
  {
    name: 'Yanfei',
    vision: Elements.Pyro.name,
    image: 'assets/Characters/Panel/Yanfei.webp',
    thumbnail: 'assets/Characters/Thumbnail/Yanfei.webp',
    panel: 'assets/Characters/Panel/Yanfei.webp',
    adminPanel: 'assets/Characters/Admin Panel/Yanfei.webp'
  },
  {
    name: 'Yaoyao',
    vision: Elements.Dendro.name,
    image: 'assets/Characters/Panel/Yaoyao.webp',
    thumbnail: 'assets/Characters/Thumbnail/Yaoyao.webp',
    panel: 'assets/Characters/Panel/Yaoyao.webp',
    adminPanel: 'assets/Characters/Admin Panel/Yaoyao.webp'
  },
  {
    name: 'Yelan',
    vision: Elements.Hydro.name,
    image: 'assets/Characters/Panel/Yelan.webp',
    thumbnail: 'assets/Characters/Thumbnail/Yelan.webp',
    panel: 'assets/Characters/Panel/Yelan.webp',
    adminPanel: 'assets/Characters/Admin Panel/Yelan.webp'
  },
  {
    name: 'Yoimiya',
    vision: Elements.Pyro.name,
    image: 'assets/Characters/Panel/Yoimiya.webp',
    thumbnail: 'assets/Characters/Thumbnail/Yoimiya.webp',
    panel: 'assets/Characters/Panel/Yoimiya.webp',
    adminPanel: 'assets/Characters/Admin Panel/Yelan.webp'
  },
  {
    name: 'Yun Jin',
    vision: Elements.Geo.name,
    image: 'assets/Characters/Panel/Yun Jin.webp',
    thumbnail: 'assets/Characters/Thumbnail/Yun Jin.webp',
    panel: 'assets/Characters/Panel/Yun Jin.webp',
    adminPanel: 'assets/Characters/Admin Panel/Yun Jin.webp'
  },
  {
    name: 'Zhongli',
    vision: Elements.Geo.name,
    image: 'assets/Characters/Panel/Zhongli.webp',
    thumbnail: 'assets/Characters/Thumbnail/Zhongli.webp',
    panel: 'assets/Characters/Panel/Zhongli.webp',
    adminPanel: 'assets/Characters/Admin Panel/Zhongli.webp'
  }
]

export const NoPick: Character = {
  name: 'No Pick',
  vision: Elements.Unaligned.name,
  image: 'assets/Characters/Panel/zz.webp',
  thumbnail: 'assets/Characters/Panel/Zhongli.webp',
  panel: 'assets/Characters/Panel/zz.webp',
  adminPanel: 'assets/Characters/Panel/zz.webp'
}

let modifiedCharacters = [...Characters]

let availableCharacters = [...modifiedCharacters]

export function getPanels() {
  return availableCharacters.reduce((result: any, character: Character) => {
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