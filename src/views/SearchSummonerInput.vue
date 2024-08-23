<script setup lang="ts">
const model = defineModel<string>()
</script>
<template>
  <div class="space-y-2">
    <!-- <Label class="text-muted-foreground font-medium text-sm">Summoner Name</Label> -->
    <Input placeholder="Game Name + Tag Line" class="max-w-[180px]" v-model="model">
    </Input>
  </div>
</template>
