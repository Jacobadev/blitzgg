<script setup lang="ts">
import { computed, ref } from 'vue'

const summoners = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]
const selectedValue = defineModel<string>({ required: true })

const open = ref(false)
const query = ref('')

const filteredSummoners = computed(() =>
  summoners.filter(summoner =>
    summoner.label.toLowerCase().includes(query.value.toLowerCase()),
  ),
)
const showDropdown = computed(() => query.value.length > 0 && filteredSummoners.value.length > 0)
function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  query.value = target.value
}
function setModel(value: string) {
  selectedValue.value = value
  open.value = false
  query.value = ''
}
</script>

<template>
  {{ query }}
  <Command>
    <Input v-model="query" placeholder="Game Name + Tag Line" class="h-9 max-w-[180px]" @input="onInput" />

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
