const express = require('express')
const request = require('request');
const xml = require('xml');

const app = express()
const port = 3000

app.use(express.json())

const urls = [
  "https://www.td.gov.hk/tc/special_news/trafficnews.xml"
]

app.post('/Z2V0WG1s', (req, res) => {
  const { url } = req.body
  
  if ((!urls.includes(url)) || (typeof url ==='undefined'))
    res.status(400).send('Bad Request!')

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // Print the google web page.
      res.type('application/xml');
      res.send(body)
    }
  })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})