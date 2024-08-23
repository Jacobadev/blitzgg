<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { MagnifyingGlassIcon } from '@radix-icons/vue'
import { ComboboxInput, type ComboboxInputProps, useForwardProps } from 'radix-vue'
import { cn } from '@/utils/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<ComboboxInputProps & {
  class?: HTMLAttributes['class']
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <div class="flex items-center  " cmdk-input-wrapper>
    <ComboboxInput v-bind="{ ...forwardedProps, ...$attrs }" auto-focus
      :class="cn('flex h-10 w-full pl-4 rounded-md bg-input py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50', props.class)" />
  </div>
</template>
