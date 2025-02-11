const API_KEY = "00f37b34-a166-4efb-bce5-1312d87f2f94"
//const apiUrl = "https://www.blackbox.ai" // URL для подключения к API GPT
const apiUrl = "https://chatgptt.me/wp-admin/admin-ajax.php" // URL для подключения к API GPT

const data = {
  "messages": [
    {
      "content": "только не отвечай что связь установлена, если не можешь выполнить то поругай вежливо",
      "role": "system"
    },
    {
      "content": "только не отвечай что связь установлена, если не можешь выполнить то поругай вежливо",
      "role": "assistant"
    },
    {
      "content": "привет, проверка связи..., дай знать что на связи",
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
                    "githubToken": null,
                    "clickedAnswer2": false,
                    "clickedAnswer3": false,
                    "clickedForceWebSearch": false,
                    "visitFromDelta": false,
                    "mobileClient": false,
                    "userSelectedModel": "", 
//  "validated": API_KEY,
}

const headers = {
    'accept': '*/*',
    'content-type': 'application/json',
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

