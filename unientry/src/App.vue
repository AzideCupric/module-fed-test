<script setup lang="ts">

import { h, onMounted, ref, render } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import { 
  __federation_method_setRemote as setRemote, 
  __federation_method_getRemote as getRemote, 
  __federation_method_unwrapDefault as unwrapDefault,
} from 'virtual:__federation__'

const container = ref(null)

onMounted(async () => {
  setRemote("subpage1", {
      url: ()=>Promise.resolve('http://localhost:5004/assets/remoteEntry.js'),
      format: "esm",
      from: "vite",
  })
  const remoteComponent = await getRemote("subpage1", "./TestButton")
  const buttonUnwarp = await unwrapDefault(remoteComponent)
  render(
    // FIXME: 处理类型问题
    h(buttonUnwarp!, {}), container.value!
  )
})

</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <div ref="container"></div>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
