// https://riot.iesdev.com/graphql?query=query+LeagueMatchlist%28%24region%3ARegion%21%2C%24puuid%3AID%21%29%7Bmatchlist%28region%3A%24region%2Cpuuid%3A%24puuid%29%7Bmatches%7Bid+playerMatch%7Bid+playerMatchStats%7Blp+deltaLp+kills+deaths+assists%7D%7D%7D%7D%7D&variables=%7B%22region%22%3A%22NA1%22%2C%22puuid%22%3A%225cGou2nmAdB-qCkqT7hLb_f0ZjbQHv7wsDqGnJpA_J9e8_B2lKjxyw2RQO-azNnS9de3PwYoJqtqdQ%22%7D
export interface MatchListResponse {
    data: Data
}

export interface Data {
    matchlist: Matchlist
}

export interface Matchlist {
    matches: Match[]
}

export interface Match {
    id: string
    playerMatch?: PlayerMatch
}

export interface PlayerMatch {
    id: string
    playerMatchStats: PlayerMatchStats
}

export interface PlayerMatchStats {
    assists: number
    deaths: number
    deltaLp: any
    kills: number
    lp: any
}
