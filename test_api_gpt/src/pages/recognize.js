// модуль распознавания текста

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export let recognition

function init_speach(){
  recognition = new SpeechRecognition();
  recognition.interimResults = false;  // возвращать промежуточные результаты
  recognition.maxAlternatives = 1;
}

export function  speach_to_text(){
  return new Promise((resolve, reject)=>{
    if (!SpeechRecognition) {
      reject('Возможно ваш браузер не поддерживает распознавание речи') 
      return
    }

    if (!recognition) init_speach()

    recognition.start();

    recognition.onspeechend = (event)=>{
      console.log('onspeechend: ', event, recognition);
    }

    recognition.onsoundend = (event)=>{
      console.log('on-sound-END: ', event, recognition);
    }

    recognition.onend = (event)=>{
      recognition.stop();
      console.log('on-END: ', event, recognition);
      resolve('')
    }

    recognition.onresult = (event) => {
      recognition.stop()
      const transcript = event.results[0][0].transcript; // Получаем текст распознавания
      console.log('Распознанный текст:', transcript);
      resolve(transcript)
    }


    recognition.onerror = (event) => {
      recognition.stop()
      console.error('Ошибка распознавания:', event.error)
      if (event.error === 'not-allowed') recognition = null
      reject('Ошибка распознавания: '+ {'not-allowed': 'сервис не поддерживается вашим устройством'}?.[event.error])
    }

  })
}

export function abort(){
  if (recognition) recognition.abort()
}













