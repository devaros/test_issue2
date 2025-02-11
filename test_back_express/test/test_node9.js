const API_KEY = ""
//const apiUrl = "https://www.blackbox.ai" // URL для подключения к API GPT
const apiUrl = "https://main.gpt-chatbotru-4-o1.ru/api/openai/v1/chat/completions" // URL для подключения к API GPT

const data = {
  "messages": [
    {
      "content": "только не отвечай что связь установлена, если не можешь выполнить то поругай вежливо",
      "role": "assistant"
    },
    {
      "content": "привет, проверка связи..., погода в саратове ",
      "role": "user"
    }
  ],
  "model": "chatgpt-4o-latest",

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
                    "githubToken": null,
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
    'origin': 'https://main.gpt-chatbotru-4-o1.ru',
//    'priority': 'u=1, i',
//    'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
//    'sec-ch-ua-mobile': '?0',
//    'sec-ch-ua-platform': '"Windows"',
//    'sec-fetch-dest': 'empty',
//    'sec-fetch-mode': 'cors',
//    'sec-fetch-site': 'same-origin',
//    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
}

process.on('unhandledRejection', (reason, p) => {
  //console.log(`Unhandled Rejection at: ${p} reason: ${reason}`);
});

export async function getGPT4FreeResponse(prompt) {
  return new Promise((resolve, reject)=>{
    //try {
      //console.log('data:', );
      const controller = new AbortController()
      //data.signal = controller.signal
      const id = setTimeout(() =>{
         console.log(`AbortController_00: `);
         reject('TimeoutError!')
         controller.abort()
      }, 35000) // Время вышло!

      //if (api_key) headers[ 'Authorization'] = `Bearer ${api_key}`

      //const response = await fetch(apiUrl, {
      const response = fetch(apiUrl, {
        method: 'POST',
        headers,
        signal: controller.signal,
        body: JSON.stringify(data),
      })
      .then(async response =>{
        console.log(`response 11: `);

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || response.statusText}`);
        }
        const resp = await response.text();
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

