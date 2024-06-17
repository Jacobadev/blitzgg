<script setup lang="ts">
import log from 'loglevel'
import { BlitzRepository } from '@/domain/usecases/SummonerRepository';
const blitzRepo = new BlitzRepository()

const riotName = 'A Yordle#BR2'
try {
    const res = await blitzRepo.getLeagueProfile(riotName)
    if (res.status === 'error') {
        throw new Error('Erro ao obter perfil da liga')
    }

    log.info(res.data.data.leagueProfile.profileIconId)
} catch (error) {
    log.error('Erro:', error)
}
</script>

<template>
    <main></main>
</template>
