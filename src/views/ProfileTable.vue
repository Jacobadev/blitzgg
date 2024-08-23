<script lang="ts" setup>
import type { LeagueProfile } from '@/domain/models/blitz/LeagueProfile'

defineProps<{
  leagueProfile: LeagueProfile
}>()
</script>

<template>
  <Card class="shadow-xl shadow-white/5">
    <CardHeader class="px-7">
      <CardTitle>Accounts</CardTitle>
      <CardDescription>
        Here is the accounts added
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead class="hidden sm:table-cell">
              Current Rank
            </TableHead>
            <TableHead class="hidden sm:table-cell">
              Status
            </TableHead>
            <TableHead class="hidden md:table-cell">
              Wins/Losses
            </TableHead>
            <TableHead class="text-right">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow class="bg-accent">
            <TableCell>
              <div class="font-medium">
                {{ leagueProfile.summonerName }}
              </div>
            </TableCell>
            <TableCell v-if="leagueProfile.ranks" class="hidden sm:table-cell">
              {{ leagueProfile.ranks[0].tier }}

              {{ leagueProfile.ranks[0].leaguePoints }} LP
            </TableCell>
            <TableCell class="hidden sm:table-cell">
              <Badge class="text-xs" variant="secondary">
                {{ leagueProfile.riotAccount.gameName }}
              </Badge>
            </TableCell>
            <TableCell class="hidden md:table-cell">
              {{ leagueProfile.ranks[0].wins }}-{{ leagueProfile.ranks[0].losses }}
            </TableCell>
            <TableCell class="text-right" />
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>
