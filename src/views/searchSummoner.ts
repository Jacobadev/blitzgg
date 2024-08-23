import axios from 'axios';
import type { GameProfiles2, Summoner } from './SummonerSearchType';
import type { SummonerProfileResponse } from '@/domain/models';

export async function fetchSummoners(searchQuery: string): Promise<Summoner> {
  const query = `
    query($boostGameScore: Boolean, $boostShardScore: [String!], $game: SupportedGame!, $name: String!, $page: Int, $perPage: Int, $prefetchPages: Int, $shards: [String!]) {
      gameProfiles2(boostGameScore: $boostGameScore, boostShardScore: $boostShardScore, game: $game, name: $name, page: $page, perPage: $perPage, prefetchPages: $prefetchPages, shards: $shards) {
        found
        hits {
          game
          id
          metadata
          name
          searchScore
          shard
          snippet
          textMatchScore
        }
        timer {
          endTimestamp
          postProcessing
          preProcessing
          searching
          startTimestamp
          total
        }
      }
    }
  `;

  // Define a valid shard value for the game
  const shards = ['br1', 'na1']; // Example valid shards for LEAGUE

  const variables = {
    boostGameScore: false,
    boostShardScore: [],
    game: 'LEAGUE',
    name: searchQuery,
    page: 1,
    perPage: 50,
    prefetchPages: 1,
    shards: shards, // Pass the valid shards here
  };

  try {
    const response = await axios.post<Summoner>('https://search.iesdev.com/graphql', {
      query,
      variables,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching summoners:', error);
    throw error; // Re-throw the error for the caller to handle it
  }
}
