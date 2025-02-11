const api_key = ""
const apiUrl = "http://127.0.0.1:9000/v1/chat/completions"; // URL для подключения к API GPT

const data = {
  "messages": [
    {
      "content": "только не отвечай что связь установлена, если не можешь выполнить то поругай вежливо",
      "role": "system"
    },
    {
      "content": "привет, проверка связи..., нарисуй зебру с шестью ногами",
      "role": "user"
    }
  ],
  "model": "",
  "provider":  'Blackbox', // 'ChatGptt', //'TeachAnything', // 'PollinationsImage', //'PollinationsAI', //'OIVSCode', //'ImageLabs', //'Glider', //'DDG', //'Cloudflare',  //'CablyAI', // 'BlackboxAPI', // 'Yqcloud',
  "api_key": api_key,
  "web_search": false,
  "history_disabled": true,
  "auto_continue": true,
  "timeout": 22,
  "response_format": {}
}

const headers = {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          //'Authorization': 'Bearer 123456',
}

process.on('unhandledRejection', (reason, p) => {
  //console.log(`Unhandled Rejection at: ${p} reason: ${reason}`);
});

export async function getGPT4FreeResponse(prompt) {
  return new Promise((resolve, reject)=>{
    //const apiUrl = 'http://127.0.0.1:8080/v1/chat/completions' // URL может измениться!
    //try {
      //console.error('data:', data);
      const controller = new AbortController()
      //data.signal = controller.signal
      const id = setTimeout(() => controller.abort(), 35000) // Время вышло!

      if (api_key) headers[ 'Authorization'] = `Bearer ${api_key}`

      //const response = await fetch(apiUrl, {
      const response = fetch(apiUrl, {
        method: 'POST',
        headers,
        signal: controller.signal,
        body: JSON.stringify(data)
      })
      .then(async response =>{
        console.log(`response 11: `);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || response.statusText}`);
        }
        const resp = await response.json();
        console.log(`response : `, JSON.stringify( resp) );
        resolve(resp)
      })
      .catch(err=>{
        console.log(`response or abort 12: `, err);  //, err
        reject()
      })
      .finally(()=>{
        console.log(`response 13: `);
        clearTimeout(id)
    })


    //return resp; // Структура ответа может измениться!
    //} catch (error) {
      //console.error('Error:', error);
      //return null;
    //}
  })
}


//запуск использования:
getGPT4FreeResponse("Привет, как дела?").then(response => {
  if (response) {
    console.log("Ответ:", JSON.stringify(response?.choices[0]?.message?.content) );
  } else {
    console.log("Ошибка получения ответа.");
  }
});

