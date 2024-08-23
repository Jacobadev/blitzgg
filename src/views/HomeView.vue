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
    if (response.data.errors) {
      response.data.errors.forEach((error) => {
        if (error.code === 'not_found') {
          errorMessage.value = error.message
        }
      })
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
      <div class="px-24 bg-gradient-to-r from-background via-popover-foreground/10  mb-12  to-background pt-0.5 w-full">
        <!-- <h2 class="text-3xl font-bold mb-4"> -->
        <!--   Summoners -->
        <!-- </h2> -->
      </div>

      <div class="flex items-center justify-center gap-4">
        <div class="relative mb-6 flex flex-col justify-center gap-1.5 items-center">
          <SearchSummonerInput v-model="summonerName" />
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
        <Button size="rounded" @click="handleClick">
          <PlusCircledIcon class="mr-3" />
          Add Summoner
        </Button>
      </div>

      <main class="flex mt-12 justify-center ">
        <ProfileTable :profiles="profiles" />
      </main>
    </div>
  </div>
</template>
