<script setup lang="ts">
import { useUser } from '../store/main'
const user = useUser()
</script>
<template>
  <div>test-butten {{ user.id }}</div>
</template>
