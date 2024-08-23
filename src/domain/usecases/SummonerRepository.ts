import type { MatchListResponse, SummonerProfileResponse } from '../models'
import type { RiotName, Response, Repository } from '../repository/repository'
import { useFetch } from '@vueuse/core'
export class BlitzRepository implements Repository {
  private readonly baseUrl: string

  constructor() {
    this.baseUrl = 'https://riot.iesdev.com/graphql?query=query+LeagueProfile%28%24summoner_name%3AString+%24summoner_id%3AString+%24account_id%3AString+%24region%3ARegion%21+%24puuid%3AString+%24gameName%3AString+%24tagLine%3AString%29%7BleagueProfile%28summoner_name%3A%24summoner_name+summoner_id%3A%24summoner_id+account_id%3A%24account_id+region%3A%24region+puuid%3A%24puuid+gameName%3A%24gameName+tagLine%3A%24tagLine%29%7Branks%28first%3A30%29%7Bqueue+tier+rank+wins+losses+leaguePoints+insertedAt%7Did+accountId+puuid+summonerId+summonerName+summonerLevel+profileIconId+riotAccount%7Bid+puuid+gameName+tagLine%7DupdatedAt+latestRanks%7Bqueue+tier+rank+wins+losses+leaguePoints+insertedAt%7D%7D%7D&variables=%7B%22'
  }

  async getLeagueProfile(riotName: string, region: string): Promise<Response<SummonerProfileResponse>> {
    const riot_name = this.getRiotName(riotName)
    ''
    const url = `${this.baseUrl}region%22%3A%22${region}1%22%2C%22gameName%22%3A%22${encodeURIComponent(riot_name.gameName)}%22%2C%22tagLine%22%3A%22${encodeURIComponent(riot_name.tagLine)}%22%7D`

    try {
      const { data: summonerData, statusCode } =
        await useFetch<SummonerProfileResponse>(url).json()

      if (statusCode.value === 200) {
        return { status: 'success', data: summonerData.value }
      } else {
        return { status: 'error', data: {} as SummonerProfileResponse }
      }
    } catch (error) {
      return { status: 'error', data: {} as SummonerProfileResponse }
    }
  }
  async getMatchList(): Promise<Response<MatchListResponse>> {
    const baseurl =
      'https://riot.iesdev.com/graphql?query=query+LeagueMatchlist%28%24region%3ARegion%21%2C%24puuid%3AID%21%29%7Bmatchlist%28region%3A%24region%2Cpuuid%3A%24puuid%29%7Bmatches%7Bid+playerMatch%7Bid+playerMatchStats%7Blp+deltaLp+kills+deaths+assists%7D%7D%7D%7D%7D&variables=%7B%22region%22%3A%22NA1%22%2C%22puuid%22%3A%225cGou2nmAdB-qCkqT7hLb_f0ZjbQHv7wsDqGnJpA_J9e8_B2lKjxyw2RQO-azNnS9de3PwYoJqtqdQ%22%7D'
    try {
      const { data: matchList, statusCode } =
        await useFetch<MatchListResponse>(baseurl).json()
      if (statusCode.value === 200) {
        return { status: 'success', data: matchList.value }
      } else {
        return { status: 'error', data: {} as MatchListResponse }
      }
    } catch (error) {
      return { status: 'error', data: {} as MatchListResponse }
    }
  }
  getRiotName(riotName: string): RiotName {
    if (!riotName.includes('#')) {
      throw new Error('Summoner must contain tagline E.G. (#NA1)')
    }
    let [gameName, tagLine] = riotName.split('#')
    tagLine = tagLine.toUpperCase()
    return { gameName, tagLine }
  }
}

