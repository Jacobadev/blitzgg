// https://riot.iesdev.com/graphql?query=query+LeagueProfile%28%24summoner_name%3AString+%24summoner_id%3AString+%24account_id%3AString+%24region%3ARegion%21+%24puuid%3AString+%24gameName%3AString+%24tagLine%3AString%29%7BleagueProfile%28summoner_name%3A%24summoner_name+summoner_id%3A%24summoner_id+account_id%3A%24account_id+region%3A%24region+puuid%3A%24puuid+gameName%3A%24gameName+tagLine%3A%24tagLine%29%7Branks%28first%3A30%29%7Bqueue+tier+rank+wins+losses+leaguePoints+insertedAt%7Did+accountId+puuid+summonerId+summonerName+summonerLevel+profileIconId+riotAccount%7Bid+puuid+gameName+tagLine%7DupdatedAt+latestRanks%7Bqueue+tier+rank+wins+losses+leaguePoints+insertedAt%7D%7D%7D&variables=%7B%22region%22%3A%22NA1%22%2C%22gameName%22%3A%22A+Yordle%22%2C%22tagLine%22%3A%22BR2%22%7D
export interface SummonerProfileResponse {
  data: Data
  errors: Error[]
}

export interface Data {
  leagueProfile: LeagueProfile
}

export interface LeagueProfile {
  accountId: string
  id: string
  latestRanks: LatestRank[]
  profileIconId: number
  puuid: string
  ranks: Rank[]
  riotAccount: RiotAccount
  summonerId: string
  summonerLevel: number
  summonerName: string
  updatedAt: string
}

export interface LatestRank {
  insertedAt: string
  leaguePoints: number
  losses: number
  queue: string
  rank: string
  tier: string
  wins: number
}

export interface Rank {
  insertedAt: string
  leaguePoints: number
  losses: number
  queue: string
  rank: string
  tier: string
  wins: number
}

export interface RiotAccount {
  gameName: string
  id: string
  puuid: string
  tagLine: string
}


export interface Error {
  code: string
  details: Details
  locations: Location[]
  message: string
  path: string[]
  request_id: string
}

export interface Details {
  api_name: string
  http_code: number
  response: Response
}

export interface Response {
  data: Data
  struct: string
}

export interface Data {
  body: string
  headers: string[]
  request: Request
  status: number
}

export interface Request {
  data: Data2
  struct: string
}

export interface Data2 {
  body: any
  headers: string[]
  host: string
  method: string
  path: string
  port: number
  private: Private
  query: any
  scheme: string
  unix_socket: any
}

export interface Private { }

export interface Location {
  column: number
  line: number
}
