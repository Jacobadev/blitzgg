// https://league-player.iesdev.com/graphql?query=query+playstyles%28%24region%3ARegion%21%2C%24leagueProfileId%3AID%21%2C%24queue%3AQueue%29%7Bplaystyles%28region%3A%24region%2CleagueProfileId%3A%24leagueProfileId%2Cqueue%3A%24queue%29%7BaverageDeathsAt_10Min+averageFirstWardTime+averageGankDeaths+averageLaningPhaseDeaths+averageLaningPhaseSoloKills+averageWardsPlaced+championCounts%7Bcount+id%7DfirstGankedLaneCounts%7Bcount+id%7DlargestCritical+largestKillingSpree+largestMultiKill+lastFewWins+lastGame+recentlyPlayedWith%7BgameName+games+leagueProfileId+profileIconId+summonerName+tagLine+wins%7Droles%7Bcount+name%7DteammateCounts%7Bcount+id%7DtotalGames+updatedAt%7D%7D&variables=%7B%22region%22%3A%22NA1%22%2C%22leagueProfileId%22%3A%22236162828%22%7D
//
//
//

export interface Root {
    data: Data
}

export interface Data {
    playstyles: Playstyles
}

export interface Playstyles {
    averageDeathsAt_10Min: number
    averageFirstWardTime: number
    averageGankDeaths: number
    averageLaningPhaseDeaths: number
    averageLaningPhaseSoloKills: number
    averageWardsPlaced: number
    championCounts: ChampionCount[]
    firstGankedLaneCounts: FirstGankedLaneCount[]
    largestCritical: number
    largestKillingSpree: number
    largestMultiKill: number
    lastFewWins: boolean[]
    lastGame: string
    recentlyPlayedWith: RecentlyPlayedWith[]
    roles: Role[]
    teammateCounts: TeammateCount[]
    totalGames: number
    updatedAt: string
}

export interface ChampionCount {
    count: number
    id: string
}

export interface FirstGankedLaneCount {
    count: number
    id: string
}

export interface RecentlyPlayedWith {
    gameName: string
    games: number
    leagueProfileId: any
    profileIconId: number
    summonerName: string
    tagLine: string
    wins: number
}

export interface Role {
    count: number
    name: string
}

export interface TeammateCount {
    count: number
    id: string
}
