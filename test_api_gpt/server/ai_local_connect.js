const api_key = "" // если требуется, api_key для подключения к чату
// URL для подключения к API GPT, кроме локального API на других не проверялось,
// возможно потребуется указать model
const apiUrl = "http://127.0.0.1:9000/v1/chat/completions"
const TIMEOUT = 45 // лимит ожидания ответа от сервера, сек


const data = {
  "messages": [
    {
      "content": "можешь ругаться но общайся вежливо",
      "role": "system"
    },
    {
      "content": "привет, проверка связи..., нарисуй зебру с шестью ногами",
      "role": "user"
    }
  ],
  "model": "",  // 'gpt-4o-mini'
  "provider": 'Blackbox', // 'Yqcloud', //'ChatGptt', //'TeachAnything', // 'PollinationsImage', //'PollinationsAI', //'OIVSCode', //'ImageLabs', //'Glider', //'DDG', //'Cloudflare',  //'CablyAI', // 'BlackboxAPI',
  "api_key": null,
  "web_search": false,
  "history_disabled": true,
  "auto_continue": true,
  "response_format": {}
}


const headers = {
  'Content-Type': 'application/json',
  'accept': 'application/json',
  //'Authorization': 'Bearer xxxxxxxxx',  // добавится автоматически если задан api_key
}

process.on('unhandledRejection', (reason, p) => {
  //console.log(`Unhandled Rejection at: ${p} reason: ${reason}`);
});

export function get_chat_response(prompt='проверка связи...') {
  return new Promise((resolve, reject)=>{
    if (api_key) headers[ 'Authorization'] = `Bearer ${api_key}`

    //try {
      //console.error('data:', data);
      const controller = new AbortController()
      //data.signal = controller.signal
      const tt_ = setTimeout(() => controller.abort(), TIMEOUT*1000)

      data.messages[1].content = prompt

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
        console.log(`response or abort 12: `);  //, err
        //throw new Error(`API error!`);
        reject(err)
      })
      .finally(()=>{
        console.log(`response 13: `);
        clearTimeout(tt_)
    })


    //return resp; // Структура ответа может измениться!
    //} catch (error) {
      //console.error('Error:', error);
      //return null;
    //}
  })
}

