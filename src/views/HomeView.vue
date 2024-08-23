<script setup lang="ts">
import { PlusCircledIcon } from '@radix-icons/vue'
import { onMounted, ref } from 'vue'
import ProfileTable from './ProfileTable.vue'
import DarkModeToggle from './DarkModeToggle.vue'
import SearchSummonerInput from './SearchSummonerInput.vue'
import { BlitzRepository } from '@/domain/usecases/SummonerRepository'
import type { LeagueProfile, SummonerProfileResponse } from '@/domain/models/blitz/LeagueProfile'

const repo = new BlitzRepository()
const profiles = ref<LeagueProfile[]>([])
const isLoading = ref(true)
const regions = ['NA', 'BR']
const summonerRegion = ref<string>('BR')
const summonerName = ref('')

async function addProfile() {
  const response = await repo.getLeagueProfile(summonerName.value, summonerRegion.value)
  if (!response.data) {
    return console.log('error')
  }
  for (const error in response.data.errors) {
    if (error)
      console.log(error)
  }
  if (response.data.errors.length < 0)
    profiles.value.push(response.data.data.leagueProfile)
}

isLoading.value = false
</script>

<template>
  <header class="fixed w-screen   top-0 px-24 ">
    <div class="flex justify-between gap-4 bg-foreground/10 mt-4 rounded-lg px-8 py-3 w-full">
      <DarkModeToggle />
      <div class="space-x-4">
        <Button variant="secondary" size="sm">
          Login
        </Button>
        <Button variant="default" size="sm">
          Sign Up
        </Button>
      </div>
    </div>
  </header>
  <h1 class="text-6xl  pt-36 text-center">
    Welcome to
  </h1>
  <h1 class=" w-full mb-4 pb-4  title font-bold text-6xl text-center ">
    Blitzgg scrapper
  </h1>
  <p class="text-center pb-6">
    The main solution to <span class="font-medium line-through text-foreground/70">steal</span><span
      class="font-medium text-blue-500 ">
      borrow
    </span> <br>
    data from people who
    have much to share.
  </p>

  <div class="flex flex-col items-center gap-4 justify-center w-full">
    <div class="flex justify-center gap-4">
      <SearchSummonerInput v-model="summonerName" />
      {{ profiles }}
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
    <Button size="lg" @click="addProfile">
      <PlusCircledIcon class="mr-2" />
      Add profile
    </Button>
  </div>
  <main v-if="!isLoading && profiles.length > 0" class="mt-12 flex justify-center ">
    <ProfileTable v-for="profile in profiles" :key="profile.summonerId" :league-profile="profile" />
  </main>
</template>

<style scoped>
.title {
  background: #77CFFF;
  background: linear-gradient(to right, #77CF93 6%, #1DFF28 15%, #FF6A25 62%, #0F0674 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

}
</style>
