import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUser = defineStore('user', () => {
  const id = ref(5)

  return { id }
})
