<script setup lang="ts">
import { PlusCircledIcon } from '@radix-icons/vue'
import { onMounted, ref } from 'vue'
import ProfileTable from './ProfileTable.vue'
import SearchSummonerInput from './SearchSummonerInput.vue'
import HeaderIndex from './HeaderIndex.vue'
import HeroTitle from './HeroTitle.vue'
import { BlitzRepository } from '@/domain/usecases/SummonerRepository'
import type { LeagueProfile, SummonerProfileResponse } from '@/domain/models/blitz/LeagueProfile'

const repo = new BlitzRepository()
const profiles = ref<LeagueProfile[]>([])
const isLoading = ref(true)
const regions = ['NA', 'BR']
const summonerRegion = ref<string>('BR')
const summonerName = ref('')
const errorMessage = ref('')
async function getProfile() {
  try {
    const response = await repo.getLeagueProfile(summonerName.value, summonerRegion.value)
    if (!response.data) {
      return console.log('Response data not found')
    }
    if (response.data.errors.length > 0) {
      response.data.errors.forEach((error) => {
        if (error.code === 'not_found') {
          errorMessage.value = error.message
        }
      })
    }
    for (const error in response.data.errors) {
      if (error)
        return console.log(error)
    }
    if (!profiles.value.includes(response.data.data.leagueProfile)) {
      profiles.value.push(response.data.data.leagueProfile)
    }
    else {
      errorMessage.value = `Summoner ${response.data.data.leagueProfile.summonerName}Profile already added`
    }
  }
  catch (error) {
    console.log(error)
    errorMessage.value = error as string
  }
}
async function handleClick() {
  errorMessage.value = ''
  isLoading.value = true
  await getProfile()
  isLoading.value = false
}
</script>

<template>
  <div class="max-w-[1680px] mx-auto">
    <HeaderIndex />
    <HeroTitle />

    <div class="flex flex-col items-center gap-4 justify-center w-full">
      <div class="flex justify-center gap-4">
        <div class="relative mb-6 flex flex-col gap-1.5 items-end">
          <SearchSummonerInput v-model="summonerName" />
          <span class="absolute -bottom-6 left-1 min-w-max  text-sm font-medium text-red-400">{{ errorMessage }}</span>
        </div>
        <Select>
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Select a region" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Regions</SelectLabel>
              <SelectItem v-for="region in regions" :key="region" :value="region">
                {{ region }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button size="lg" @click="handleClick">
        <PlusCircledIcon class="mr-3" />
        Add Summoner
      </Button>
    </div>
    <main class="mt-12 flex justify-center ">
      <ProfileTable v-for="profile in profiles" :key="profile.summonerId" :league-profile="profile" />
    </main>
  </div>
</template>
