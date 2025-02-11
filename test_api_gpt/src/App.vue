<template>
<div id="wrp_11">

  <Transition name="fade">
    <intro_dialog v-if="show_dialog" @hide_dialog="hide_dialog"/>
  </Transition>

  <div v-if="0" style="max-width: 100vw;">
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>

  <AiChat />

</div>
</template>


<script setup>
  import {ref} from 'vue'
  import AiChat from './pages/ai_chat.vue'
  import intro_dialog from './pages/intro_dialog.vue'

  let show_dialog = ref(true)

  function hide_dialog(){
    show_dialog.value = false
  }
</script>


<style>
#wrp_11{
  height:100dvh;
  display: flex;
  flex-direction: column;
}

body{
  font-size: 16px;
  font-weight: 500;
}

.logo {
  height: 4rem;
  padding: 0.5rem;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

@media (max-width: 1200px) {
  body{  font-size: 19px;   font-weight: 500;}
}

</style>


<style scoped>

/* transition-fade */

.fade-leave-active {
  transition: opacity 0.8s ease 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
