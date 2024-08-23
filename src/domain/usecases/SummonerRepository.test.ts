import { test, expect, beforeEach } from 'vitest'
import { BlitzRepository } from './SummonerRepository'

let repository: BlitzRepository

beforeEach(() => {
  repository = new BlitzRepository()
})

test('Should return LeagueProfile', async () => {
  const riotName = 'A Yordle#BR2'
  const result = await repository.getLeagueProfile(riotName, 'BR')
  expect(result.status).toBe('success')
})

test('Should return MatchList', async () => {
  const result = await repository.getMatchList()
  expect(result.status).toBe('success')
})
