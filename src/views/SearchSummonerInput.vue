<script setup lang="ts">
const model = defineModel<string>({ required: true })
</script>

<template>
  <!-- <Label class="text-muted-foreground font-medium text-sm">Summoner Name</Label> -->
  <Input v-model="model" placeholder="Game Name + Tag Line" class="max-w-[180px]" />
</template>
