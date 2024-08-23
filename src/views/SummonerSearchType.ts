export interface Summoner {
  data: GameProfile
}

export interface GameProfile {
  gameProfiles2: GameProfiles2
}

export interface GameProfiles2 {
  found: number
  hits: Hit[]
  timer: Timer
}

export interface Hit {
  game: string
  id: string
  metadata: Metadata
  name: string
  searchScore: number
  shard: string
  snippet: string
  textMatchScore: number
}

export interface Metadata {
  gameName: string
  gameRank?: string
  profileIconId: string
  tagLine: string
}

export interface Timer {
  endTimestamp: string
  postProcessing: number
  preProcessing: number
  searching: number
  startTimestamp: string
  total: number
}
