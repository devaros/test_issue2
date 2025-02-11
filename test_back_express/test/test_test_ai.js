const ai_urls = {
  openai: "https://api.openai.com/v1/chat/completions",
  you: "https://you.com",
  gptgod: "https://api.gptgod.online",
  Cloudflare2: "https://api.cloudflare.com/v1/ai/llama/v1/completions",
  Cloudflare: "https://playground.ai.cloudflare.com",
  Cloudflare3: "https://playground.ai.cloudflare.com/api/inference",

}

const models= ['gpt-4o-mini','gpt-4']

//const apiKey = 'sk-OsMMq65tXdfOIlTUYtocSL7NCsmA7CerN77OkEv29dODg1EA'
const apiKey = 'YOUR_API_KEY';

//app.post('/webhook', async (req, res) => {
export async function test_ai(userMessage){
  //const eventData = req.body;
  userMessage = userMessage || 'test hello'
  try{
    //console.log('data: ', eventData.data)
    //userMessage = eventData.data.new.message; // Assuming 'message' is a field in your table
  } catch (error) {
    //const userMessage = 'test'
    //res.status(500).send('Internal Server Error: ' + error)
    //return
  }

  try {
    //const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    let header = {
          //'X-Requested-With': "XMLHttpRequest",
          'Content-type': "application/json",
          'Authorization': `Bearer ${apiKey}`,
     }
    //const hdr = new Headers(_hdr)
    //let options = { method: 'post', headers: hdr }

    const data = {
      model: '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
      prompt: 'расскажи о мире',
      max_tokens: 2048,
    };

    const url = ai_urls.Cloudflare
    const response = await fetch(url, {
      method: 'post',
      header,
      //models: [models[0]],
      //messages: [{ role: 'user', content: userMessage }],
      body : JSON.stringify(data),
      //body : JSON.stringify({models: [models[0]], { role: 'user', content: userMessage} }),
    })
//JSON.stringify({models: [models[0]], { role: 'user', content: userMessage} })
    //{   headers: {'X-Requested-With': "XMLHttpRequest",   'Authorization': `Bearer YOUR_API_KEY` }  }
      //headers: {'X-Requested-With': "XMLHttpRequest",   'Authorization': `Bearer YOUR_API_KEY` },

    // Process the response from ChatGPT
    if (response.statusText=='OK'){
      const data =  await response.text()
      console.log('response__data: ', data)
      //const chatResponse = response //.data //?.choices[0].message.content
      // Send the response back to the client or store it in the database
      //res.json({ reply: JSON.stringify( data), userMessage })
    } else{
      console.log('response_44: ', response)
      //res.json({ reply: JSON.stringify( response), userMessage })
    }

  } catch (error) {
    console.error('Error communicating with ChatGPT:', error)
    res.status(500).send('Internal Server Error: '+error)
  }
}

