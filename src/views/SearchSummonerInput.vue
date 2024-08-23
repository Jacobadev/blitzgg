<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { fetchSummoners } from './searchSummoner'
import type { Summoner } from './SummonerSearchType'

const summoners = ref<Summoner>({} as Summoner)

// Query model definition
const query = ref('')

const { data, error, isLoading, refetch } = useQuery(
  {
    queryKey: ['summoners', query.value],
    queryFn: () => fetchSummoners(query.value),
    enabled: false, // Only fetch when refetch is triggered
  },
)

// Watch query for changes and refetch data
watch(query, (newQuery) => {
  if (newQuery) {
    refetch().then((response) => {
      if (response.data?.data)
        summoners.value = response.data
      console.error('Error fetching summoners:', error)
    })
  }
  else {
    summoners.value = {} as Summoner
  }
})
const selectedAccounts = ref<string[]>([])
const filteredSummoners = computed(() => {
  const hits = summoners.value.data?.gameProfiles2?.hits || []
  return hits
    .filter(summoner => summoner.searchScore > 0) // Ensure valid searchScore
    .sort((a, b) => b.searchScore - a.searchScore) // Sort by searchScore, descending
})

// Determine if the dropdown should be shown
const showDropdown = computed(() => query.value.length > 0 && filteredSummoners.value.length > 0)
</script>

<template>
  <Command>
    <Input v-model="query" placeholder="Game Name + Tag Line" class="h-9 w-full" />
    <CommandList v-if="showDropdown" class=" max-w-[300px] max-h-[250px]">
      <CommandGroup>
        <CommandItem v-for="summoner in filteredSummoners" :key="summoner.id" :value="summoner.name"
          @select="(value) => selectedAccounts.push(value.toString())">
          <div class="flex justify-center items-center gap-4">
            <Avatar>
              <AvatarImage
                :src="`https://blitz-cdn.blitz.gg/blitz/lol/profileicon/${summoner.metadata.profileIconId}.webp`" />
            </Avatar>
            <p>{{ summoner.name }}</p>

            <div class="h-2 w-2 rounded-full bg-muted-foreground" />
            <p class="text-muted">
              {{ summoner.game }}
            </p>
            <p class="text-muted">
              {{ summoner.metadata.gameRank }}
            </p>
          </div>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
