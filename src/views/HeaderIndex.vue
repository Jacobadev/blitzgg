<script setup lang="ts">
import DarkModeToggle from './DarkModeToggle.vue'
</script>

<template>
  <header class="fixed w-screen max-w-[1680px] mx-auto  top-0 px-24 ">
    <div class="flex justify-between gap-4 bg-foreground/10 mt-4 rounded-lg px-8 py-3 w-full">
      <DarkModeToggle />
      <div class="flex gap-4 items-center">
        <Button variant="secondary" size="sm">
          Login
        </Button>
        <Button variant="default" size="sm">
          Sign Up
        </Button>
      </div>
    </div>
  </header>
</template>
