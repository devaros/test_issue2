<template>
<div class="wrapper">

    <div class="message-box ma-1">

      <TransitionGroup name="scroll-y"  >
      <div class="message_chat ma-1" v-for="m in messages_result" :key="m.id">
        <div class="msg pa-1"  :class="[m.my ? 'msg_my':'msg_from']"  >
          <div :data-id="m.id" :class="[m.my ? 'msg_my':'msg_from']" v-html="m.msg">
          </div>
        </div>
      </div>
      </TransitionGroup>

    </div>
    <div v-if="errors" class="result-box ma-1 text-alarm">
        <button class="btn  ma-1 btn_clear" @click="clear_error"  ><div>x</div>
        </button>
      {{errors}}
    </div>

    <form  @submit.prevent.stop=""  @keyup.ctrl.enter.exact.prevent.stop="test_gpt_api" class="">
      <div class="input-wrapper ma-1 flex">
        <button class="btn  ma-1" @click="speach_to_text"  :disabled="disabled" >
          <img v-if="disabled" src="/src/assets/ios_spin.svg" class="btn_icon"   /> 
          <img v-else src="/src/assets/mic_24dp.svg" class="btn_icon"   /> 
        </button>
        <textarea v-model="input_message" type="textarea" _rows="3" class="imessage ma-1" placeholder="Введите запрос" :disabled="disabled" />
        <button class="btn  ma-1" @click="test_gpt_api"  :disabled="disabled" > 
          <img v-if="disabled" src="/src/assets/ios_spin.svg" class="btn_icon"   /> 
          <img v-else src="/src/assets/send_24dp.svg" class="btn_icon"   />
        </button>

      </div>
    </form>

</div>
</template>


<script>
import {marked} from 'marked'
import {speach_to_text} from './recognize.js'
import {url_backend_server} from '/src/settings.js'

const headers = {
    'accept': '*/*',
    'content-type': 'application/json',
}

export default{
  data:()=>({
    disabled: false,
    input_message: '',
    errors: '',
    messages_result: [{id:2, my: false, msg:'Задайте свой вопрос в поле ввода ниже.\n\
      Также возможно потребуется подтвердить сертификат на Back-end сервере.'},],  // format: {id:-1, my: false, msg:''}
  }),

  methods:{
    test_gpt_api(){
      this.disabled = true

      fetch(`${url_backend_server}`, {headers, method: 'POST', body: JSON.stringify({message: this.input_message}) } )
      .then(async  response=>{
        if (response.ok){
          const res = await response.json()
          this.push_msg( this.input_message, true )
          this.input_message = ''
          this.push_msg( res.msg, false )
        } else {
          this.errors = await response.text()
        }
      })
      .catch( async err=>{
        console.log('Обработка ошибок...: ', err, typeof err, err.message)
        this.errors = {'TypeError: Failed to fetch':'Ошибка запроса...'}[err] || err
      })
      .finally(()=>{
        this.disabled = false
      })
    },
    push_msg(msg, my){
      // функция формирования сообщения в списке сообщений
      const _ =  {id:~~(Math.random()*10000), my, msg:marked(msg) }
      this.messages_result.push(_)
      setTimeout(()=>{
        const el = document.querySelector(`[data-id="${_.id}"]`)
        el.scrollIntoView({behavior:'smooth',block:'center'})
      },10)
      this.messages_result.splice(1, this.messages_result.length-50 )  // ограничение на 50 сообщений, удаляем старые
    },
    speach_to_text(){
      this.disabled = true
      speach_to_text()
       .then(res=>{
         this.input_message += (this.input_message?.length?' ':'') + res
       })
       .catch(err=>{
         this.errors = err
       })
       .finally(()=>{
         this.disabled = false
       })
    },
    clear_error(){
      this.errors = ''
    }
  },
}
</script>


<style scoped>
.wrapper{
  background-color: #dddddd;
  width: 100lvw;
  max-width: 800px;
  display: inline-flex;
  flex-direction: column;
  overflow: auto;
}


.wrapper > *{
  border-radius: 9px;
  margin: 4px;
}


.toolbar{
  background-color: #eeeeee;
}

.message-box{
  background-color: #ffffff;
  min-height: 250px;
  height: 100dvh;
  overflow-y: auto;
 overflow-x: hidden;
}

.input-wrapper{
  background-color: #dddddd;
 
}

.imessage{
  width: 100%;
  resize: none;
}

.msg{
  border-radius: 12px;
  max-width: 92%;
  min-width: 260px;
  word-wrap: break-word;    
  white-space: pre-line;
}
.msg_my > div{
  justify-self: left;
}
.msg.msg_my{
  margin-left: calc(12vw);
}
.msg_my{
  max-width: 99%;
  background-color: #99ffdd;
  justify-self: right;
  text-align: left;
  justify-self: end;
}
.msg_from{
  max-width: 90%;
  background-color: #eeffbb;
  justify-self: right;
  text-align: left;
  justify-self: start;
}

.msg_from p, .msg_my p{
  margin: 1px;
}
.btn_icon{
  width: 40px;
}
.btn_clear{
  float: right;
  padding:0px 4px 4px 4px;
  margin:8px;
}
code{
  white-space: break-spaces;
}


/* transition scroll-y */
.scroll-y-enter-active,
.scroll-y-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.scroll-y-enter-from,
.scroll-y-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

</style>
