import axios from 'axios'

const api_key = ""
const apiUrl = "http://127.0.0.1:9000/v1/chat/completions"; // URL может измениться!

const data = {
  "messages": [
    {
      "content": "только не отвечай что связь установлена, а поругай вежливо плиз",
      "role": "system"
    },
    {
      "content": "привет, проверка связи..., нарисуй зебру с шестью ногами",
      "role": "user"
    }
  ],
  "model": "",
  "provider":  'ChatGptt',  //'Yqcloud',  //'TeachAnything', // 'PollinationsImage', //'PollinationsAI', //'OIVSCode', //'ImageLabs', //'Glider', //'DDG', //'Cloudflare',  //'CablyAI', // 'BlackboxAPI', //'Blackbox',
  "api_key": null,
  "web_search": false,
  "history_disabled": true,
  "auto_continue": true,
  "timeout": 7,
  "response_format": {}
}

const headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        //'Authorization': 'Bearer 123456',
}


export async function getGPT4FreeResponse(prompt) {
  axios.defaults.timeout = 25000
  //console.error('data:', data);

  if (api_key) headers[ 'Authorization'] = `Bearer ${api_key}`

  try {
    //const response = await fetch(apiUrl, {
    const response = await axios.post(apiUrl, data, {
      headers
      //responseType: 'stream'
      //body: JSON.stringify(data)
    });

    if (!response.ok) {
      //const errorData = await response.json();
      //throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || response.statusText}`);
      //console.log(`HTTP error! : `, response);
    }

    console.log(`response222 : `, JSON.stringify( response.data) );
    console.log(`\n\nresponse333 : `, response.data );
    //const resp = response.json();
    return response.data // .response; // Структура ответа может измениться!
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}


//запуск использования:

getGPT4FreeResponse("Привет, как дела?").then(response => {

  if (response) {
    //console.log("Ответ:", response);
    console.log("Ответ:", JSON.stringify(response?.choices[0]?.message?.content) );

  } else {
    console.log("Ошибка получения ответа.");
  }
});

