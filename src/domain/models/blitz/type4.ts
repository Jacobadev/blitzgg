// https://league-player.iesdev.com/graphql?query=query+PlayerChampionStats%28%24leagueProfileId%3AID%21+%24region%3ARegion%21+%24queue%3AQueue%21+%24championId%3AInt+%24role%3ARole%29%7BplayerChampionsStats%28leagueProfileId%3A%24leagueProfileId+region%3A%24region+queue%3A%24queue+championId%3A%24championId+role%3A%24role%29%7BbasicStats%7Bassists+deaths+kills+lp+lpEstimate+visionScore+wins%7DccStats%7BtimeCcOthers+totalTimeCcDealt%7DchampionId+damageStats%7BdamageDealt+damageHealed+damageMagicDealt+damagePhysicalDealt+damageSelfMitigated+damageTaken+damageToChampions+damageToObjectives+damageToTowers+damageTrueDealt%7DfirstStats%7BfirstBlood+firstInhibitorKill+firstTowerKill%7DgameCount+gameDuration+goldDiffAtLaneEnd+goldStats%7BgoldEarned+goldSpent%7DlastPlayed+minionStats%7BminionsKilledEnemyJungle+minionsKilledNeutral+minionsKilledTeamJungle+minionsKilledTotal%7DmultikillStats%7BdoubleKills+killingSprees+pentaKills+quadraKills+tripleKills%7Dqueue+role+wardStats%7BwardsKilled+wardsPlaced+wardsPurchased%7D%7D%7D&variables=%7B%22region%22%3A%22NA1%22%2C%22leagueProfileId%22%3A%22236162828%22%2C%22queue%22%3A%22RANKED_SOLO_5X5%22%7D
// Desempenho de Campeão
//

export interface Root {
    data: Data
}

export interface Data {
    playerChampionsStats: PlayerChampionsStat[]
}

export interface PlayerChampionsStat {
    basicStats: BasicStats
    ccStats: CcStats
    championId: string
    damageStats: DamageStats
    firstStats: FirstStats
    gameCount: number
    gameDuration: number
    goldDiffAtLaneEnd: number
    goldStats: GoldStats
    lastPlayed: string
    minionStats: MinionStats
    multikillStats: MultikillStats
    queue: number
    role: string
    wardStats: WardStats
}

export interface BasicStats {
    assists: number
    deaths: number
    kills: number
    lp: any
    lpEstimate: number
    visionScore: number
    wins: number
}

export interface CcStats {
    timeCcOthers: number
    totalTimeCcDealt: number
}

export interface DamageStats {
    damageDealt: number
    damageHealed: number
    damageMagicDealt: number
    damagePhysicalDealt: number
    damageSelfMitigated: number
    damageTaken: number
    damageToChampions: number
    damageToObjectives: number
    damageToTowers: number
    damageTrueDealt: number
}

export interface FirstStats {
    firstBlood: number
    firstInhibitorKill: number
    firstTowerKill: number
}

export interface GoldStats {
    goldEarned: number
    goldSpent: number
}

export interface MinionStats {
    minionsKilledEnemyJungle: any
    minionsKilledNeutral: number
    minionsKilledTeamJungle: any
    minionsKilledTotal: number
}

export interface MultikillStats {
    doubleKills: number
    killingSprees: number
    pentaKills: number
    quadraKills: number
    tripleKills: number
}

export interface WardStats {
    wardsKilled: number
    wardsPlaced: number
    wardsPurchased: number
}
