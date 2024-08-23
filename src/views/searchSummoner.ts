import axios from 'axios';

export async function fetchSummoners(searchQuery: string) {
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

  const variables = {
    boostGameScore: false,
    boostShardScore: [],
    game: 'LEAGUE',
    name: searchQuery,
    page: 1,
    perPage: 50,
    prefetchPages: 1,
    shards: [],
  };

  try {
    const response = await axios.post('https://search.iesdev.com/graphql', {
      query,
      variables,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = response.data;
    return result.data.gameProfiles2.hits.map((hit: any) => ({
      value: hit.id,
      label: hit.name,
    }));
  } catch (error) {
    console.error('Error fetching summoners:', error);
    throw error; // Re-throw the error for the caller to handle it
  }
}
