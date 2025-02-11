
import express from 'express'; 
//const express = require('express')
//import {get_chat_response} from "./ai_blackbox_connect.js"
import {get_chat_response} from "./ai_gpt-chatbotru.js"


import https from 'https'
import fs from 'fs'

const privateKey  = fs.readFileSync('selfsigned.key', 'utf8');
const certificate = fs.readFileSync('selfsigned.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

export const app = express();
const httpsServer = https.createServer(credentials, app);

app.get('/api/test_mir', (_, res) => 
  res.json({ greeting: "Privet Mir))" }
))

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());


app.post('/api/ai/chat', async (req, res) => {
  //console.log('__data req: ', req)
  console.log('__data res: ',  req)

  const data = req.body;

  get_chat_response(data?.message).then(msg=>{
      console.log('response__data: ', msg)
      res.json({ msg })
  })
  .catch(err=>{
      //console.log('response__data: ', err)
      res.status(500).send(`Внутренняя ошибка сервера, повторите запрос позже...: ${err}`)
  })

})


if (!process.env['VITE']) {
  const frontendFiles = process.cwd() + '/dist'
  app.use(express.static(frontendFiles))
  app.get('/*', (_, res) => {
    res.send(frontendFiles + '/index.html')
  })
  //app.listen(process.env['PORT'])
  httpsServer.listen(process.env['PORT'], () => {
    console.log(`Example app listening on port ${port}`)
  })
}
