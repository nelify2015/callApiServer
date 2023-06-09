require('dotenv').config()
const express = require('express')
const request = require('request');
const xml = require('xml');
const app = express()
const http = require('http')

const server = http.createServer(app)

const port = process.env.PORT

app.use(express.json())
// app.set('json spaces', 40);

const urls = process.env.URLS.split(",")

const supportedTypes = process.env.SUPPORTED_TYPES.split(",")

app.post('/Z2V0UmVzdWx0', (req, res) => {
  const { url, dataType } = req.body
  
  if ((!urls.includes(url)) || (typeof url ==='undefined') || (!supportedTypes.includes(dataType.toLowerCase())))
    res.status(400).send('Bad Request!')

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(body) // Print the google web page.
      if (dataType.toLowerCase() === 'xml') {
        res.type('application/xml')
        res.send(body)
      } else if (dataType.toLowerCase() === 'json') {
        res.json(JSON.parse(body))
      }
    }
  })
})

server.listen(port, function(err) {
  console.log('listen at port: ' + port);
});