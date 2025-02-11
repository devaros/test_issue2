<template>
<div id="intro_dialog">

  <h1>Тестовое задание. </h1>

  <div style="max-width: 100vw;">
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="/src/assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>

    <Transition _Group name="slide-fade"  _tag="div" _appear>
      <div class="text_intro" v-show="slide2" :class="{hide:!slide2}">
        <div key="1" >Цели тестового задания: </div>
        <div key="2" >- Подключение к API ChatGPT и получение ответа </div>
        <div key="3" >- Распознавание с микрофона голосового сообщения в текст  </div>
        <div key="4" >- Возможность отправки распознанного голоса в ChatGPT </div>
      </div>
    </Transition>
    <br/>
    <Transition name="fade"  >
      <button  v-show="slide2" :class="{hide:!slide2}" class="bt_start btn ma-1" @click="hide_dialog"> все понятно </button>
    </Transition>

</div>
</template>

<script>
export default{
  data:()=>({
    slide2: true,
  }),

  methods:{
    hide_dialog(){
      this.slide2 = !this.slide2

      setTimeout(()=>{
        this.$emit('hide_dialog')
      },1333)

    }
  }
}
</script>


<style scoped>
#intro_dialog{
  background-color: #99eeee;
  width: 100vw;
  max-width: 800px;
  position: absolute;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 999;
}
.text_intro{
  text-align: left;
  text-align: left;
  padding-left: calc(2vw + 10px);
  overflow: auto;
  padding-right: calc(2vw + 10px);
}

/* transition slide-fade*/
.text_intro {
  overflow: hidden;
  display: block !important;
}
.text_intro.hide{
  opacity: 0;
}
.text_intro > *{
  transition: all 1.8s ease-in-out;
  transform: translateX(0px);
}


.slide-fade-leave-active {
  transition: all 1.8s ease-in-out;
}


.slide-fade-leave-from  {
  transition: all 1.8s ease-in-out;
}


.slide-fade-enter-from ,
.slide-fade-leave-to  {
  transition: all 3.8s ease-in-out;
}

.slide-fade-leave-to > div:nth-child(2n+0) {
  transform: translateX(-80px);
  filter: blur(7px);
  opacity: 0;
}
.slide-fade-leave-to > div:nth-child(2n+1) {
  transform: translateX(80px);
  filter: blur(7px);
  opacity: 0;
}


/* transition-fade */
.bt_start{
  display: block !important;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
}
.bt_start.hide{
  opacity: 0;
}

.fade-enter-active{
  transition: opacity 0.4s ease 0s;
}

.fade-leave-active {
  transition: opacity 0.4s ease 0s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
