<script lang="ts" setup>
import type { LeagueProfile } from '@/domain/models/blitz/LeagueProfile'

defineProps<{
  leagueProfiles: LeagueProfile[]
}>()
</script>

<template>
  <Card class="shadow-xl shadow-orange-400/5">
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
        <TableBody v-show="leagueProfiles && leagueProfiles.length > 0">
          <TransitionGroup name="summoners">
            <TableRow v-for="leagueProfile in leagueProfiles" :key="leagueProfile.id" class="bg-accent">
              <TableCell>
                <div class="font-medium">
                  {{ leagueProfile.summonerName }}
                </div>
              </TableCell>
              <TableCell v-if="leagueProfile.ranks.length > 0" class="hidden sm:table-cell">
                {{ leagueProfile.ranks[0].tier }} {{ leagueProfile.ranks[0].leaguePoints }} LP
              </TableCell>
              <TableCell v-else class="hidden sm:table-cell">
                Unranked
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
          </TransitionGroup>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>

<styles scoped>
</styles>
