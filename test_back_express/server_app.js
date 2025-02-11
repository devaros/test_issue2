import cors from 'cors'
import express from 'express' 
import https from 'https'
import fs from 'fs'

//import {get_chat_response} from "./ai_blackbox_connect.js"
import {get_chat_response} from "./ai_api/ai_gpt-chatbotru.js"

const privateKey  = fs.readFileSync('selfsigned.key', 'utf8');
const certificate = fs.readFileSync('selfsigned.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

export const app = express();
app.use(cors());
const port = 8091


app.use(express.json());       // JSON-encoded bodies
app.use(express.urlencoded());

//маршрут для проверки ответа back-end сервера
app.get('/api/test_mir', (_, res) => 
  res.json({ greeting: "Privet Mir))" }
))

// маршрут для запроса по API
app.post('/api/ai/chat', async (req, res) => {
  const data = req.body;
  //console.log('__data req: ', req)
  console.log('__data res: ',  data)

  get_chat_response(data?.message).then(msg=>{
      console.log('response__data: ', msg)
      res.json({ msg })
  })
  .catch(err=>{
      //console.log('response__data: ', err)
      res.status(500).send(`Внутренняя ошибка сервера, повторите запрос позже...: ${err}`)
  })

})

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


