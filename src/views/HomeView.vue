<script setup lang="ts">
import type { LeagueProfile, SummonerProfileResponse } from '@/domain/models/blitz/LeagueProfile';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { BlitzRepository } from '@/domain/usecases/SummonerRepository';
const repo = new BlitzRepository()
const profile = ref<LeagueProfile>({} as LeagueProfile)
const isLoading = ref(true)
onMounted(async () => {
  const response = await repo.getLeagueProfile('AYordleWithADog#NA1', 'NA')
  profile.value = response.data.data.leagueProfile
  isLoading.value = false
})
</script>

<template>
  <main v-if="!isLoading" class="flex justify-center ">
    <table class="min-w-max bg-white shadow-lg rounded-lg">
      <thead>
        <tr class="bg-gray-800 text-white text-left">
          <th class="py-3 px-6">Campo</th>
          <th class="py-3 px-6">Valor</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-200">
          <td class="py-3 px-6">Account ID</td>
          <td class="py-3 px-6">{{ profile.accountId }}</td>
        </tr>
        <tr class="bg-gray-50 border-b border-gray-200">
          <td class="py-3 px-6">Summoner ID</td>
          <td class="py-3 px-6">{{ profile.summonerId }}</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="py-3 px-6">Puuid</td>
          <td class="py-3 px-6">{{ profile.puuid }}</td>
        </tr>
        <tr class="bg-gray-50 border-b border-gray-200">
          <td class="py-3 px-6">Summoner Level</td>
          <td class="py-3 px-6">{{ profile.summonerLevel }}</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="py-3 px-6">Profile Icon ID</td>
          <td class="py-3 px-6">{{ profile.profileIconId }}</td>
        </tr>
        <tr class="bg-gray-50 border-b border-gray-200">
          <td class="py-3 px-6">Summoner Name</td>
          <td class="py-3 px-6">{{ profile.summonerName }}</td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="py-3 px-6">Updated At</td>
          <td class="py-3 px-6">{{ profile.updatedAt }}</td>
        </tr>
        <tr class="bg-gray-50 border-b border-gray-200">
          <td class="py-3 px-6">Latest Ranks</td>
          <td class="py-3 px-6">
            <ul>
              <li v-for="(rank, index) in profile.latestRanks" :key="index">
                {{ rank.tier }} {{ rank.rank }} {{ rank.leaguePoints }}LP wins: <span class="text-green-500">{{
                  rank.wins
                  }}</span> losses:<span class="text-red-500">{{ rank.losses }}</span>
              </li>
            </ul>
          </td>
        </tr>
        <tr class="border-b border-gray-200">
          <td class="py-3 px-6">Ranks</td>
          <td class="py-3 px-6">
            <ul>
              <li v-for="(rank, index) in profile.ranks" :key="index">
                {{ rank.tier }} {{ rank.rank }}
              </li>
            </ul>
          </td>
        </tr>
        <tr class="bg-gray-50">
          <td class="py-3 px-6">Riot Account</td>
          <td class="py-3 px-6">{{ profile.riotAccount.gameName }}</td>
        </tr>
      </tbody>
    </table>
  </main>

</template>
