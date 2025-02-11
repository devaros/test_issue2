const API_KEY = "00f37b34-a166-4efb-bce5-1312d87f2f94"  // ключ с ограниением запросов, только для тестирования
//const apiUrl = "https://www.blackbox.ai" // URL для подключения к API GPT
const apiUrl = "https://www.blackbox.ai/api/chat" // URL для подключения к API GPT
const TIMEOUT = 45 // лимит ожидания ответа от сервера, сек

const data = {
  "messages": [
    {
      "content": "только не отвечай что связь установлена, если не можешь что-то сделать то поругася вежливо,\
      используй  формат ответов в обычном текстовом виде ",
      "role": "assistant"
    },
    {
      "content": "привет, проверка связи..., зебру шестиногую и с рогом изобрази ",
      "role": "user"
    }
  ],
  "model": "gpt-4o",

                    "id": "chat2",
                    "previewToken": null,
                    "userId": 'user_4557',
                    "codeModelMode": true,
                    "agentMode": {},
                    "trendingAgentMode": {},
                    "isMicMode": false,
                    "userSystemPrompt": null,
                    "maxTokens": 1024,
                    "playgroundTopP": 0.9,
                    "playgroundTemperature": 0.5,
                    "isChromeExt": false,
                    "githubToken": false,
                    "clickedAnswer2": false,
                    "clickedAnswer3": false,
                    "clickedForceWebSearch": false,
                    "visitFromDelta": false,
                    "mobileClient": false,
                    "userSelectedModel": "", 
  "validated": API_KEY,
}

const headers = {
    'accept': '*/*',
    'content-type': 'application/json',
    'origin': 'https://www.blackbox.ai',
}

process.on('unhandledRejection', (reason, p) => {
  //console.log(`Unhandled Rejection at: ${p} reason: ${reason}`);
});

export async function get_chat_response(prompt='проверка связи') {
  return new Promise((resolve, reject)=>{
    //const apiUrl = 'http://127.0.0.1:8080/v1/chat/completions' // URL может измениться!
    //try {
      //console.log('data:', );
      const controller = new AbortController()
      //data.signal = controller.signal
      const id = setTimeout(() =>{
         console.log(`AbortController_00: `);
         reject('TimeoutError!')
         controller.abort()
      },  TIMEOUT*1000)

      //if (api_key) headers[ 'Authorization'] = `Bearer ${api_key}`

      data.messages[1].content = prompt

      const response = fetch(apiUrl, {
        method: 'POST',
        headers,
        signal: controller.signal,
        body: JSON.stringify(data),
      })
      .then(async response =>{
        //console.log(`response 11: `);

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || response.statusText}`);
        }
        const resp = await response.text();
        //console.log(`response : `, JSON.stringify( resp) );
        resolve(resp)
      })
      .catch(err=>{
        //console.log(`response or abort 12: `, err);  //, err
        reject(err)
      })
      .finally(()=>{
        //console.log(`response 13: `);
        clearTimeout(id)
    })


  })
}

                                       
