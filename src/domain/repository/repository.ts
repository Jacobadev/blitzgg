import type { MatchListResponse, SummonerProfileResponse } from "../models"
export type RiotName = {


  gameName: string
  tagLine: string
}
export type Response<T> = { status: string; data: T }
export interface Repository {
  getLeagueProfile: (riotName: string, region: string) => Promise<Response<SummonerProfileResponse>>
  getMatchList: () => Promise<Response<MatchListResponse>>
  getRiotName: (riotName: string) => RiotName
}
