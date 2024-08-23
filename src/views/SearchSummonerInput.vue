<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { CaretSortIcon, CheckIcon } from '@radix-icons/vue'

const summoners = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]

const open = ref(false)
const value = ref('')
const query = ref('')

// Filtered summoners based on the user's query
const filteredSummoners = computed(() =>
  summoners.filter(summoner =>
    summoner.label.toLowerCase().includes(query.value.toLowerCase()),
  ),
)
const showDropdown = computed(() => query.value.length > 0 && filteredSummoners.value.length > 0)
watch(query, () => { query.value })
function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  query.value = target.value
}
const model = defineModel({ required: true })
function setModel(value: string) {
  model.value = value
  open.value = false
  query.value = ''
}
</script>

<template>
  <Command>
    <CommandInput class="h-9" placeholder="Search summoner..." :value="query" @input="onInput" />

    <CommandList v-if="showDropdown">
      <CommandGroup>
        <CommandItem v-for="summoner in filteredSummoners" :key="summoner.value" :value="summoner.value"
          @select="() => setModel(summoner.value)">
          {{ summoner.label }}
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>

<!-- <script setup lang="ts"> -->
<!-- const model = defineModel<string>({ required: true }) -->
<!---->
<!-- </script> -->
<!---->
<!-- <template> -->
<!--   <!-- <Label class="text-muted-foreground font-medium text-sm">Summoner Name</Label> --> -->
<!--   <Input v-model="model" @update:model-value="" placeholder="Game Name + Tag Line" class="max-w-[180px]" /> -->
<!-- </template> -->
