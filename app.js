const express = require('express')
const app = express()
const port = process.env.PORT || 5500;

app.get('/', function (req, res) {
  
    res.send('Hello World from Express I am ayman ')
})
app.get('/iss6', function (req, res) {
  
    res.send('Hello World from Express I am ayman from KSA i\'m CIS Majer ')
})
//app.listen(3000)

app.listen(port, () => {
  console.log(`ayman app listening on port ${port}`)
})

app.listen(port, () => {
    console.log(`Ayman's app listening on port ${port}`);
});
