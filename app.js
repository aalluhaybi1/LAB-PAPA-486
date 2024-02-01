/*const express = require('express')
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
});*/
const express = require('express')
const app = express()
const port = process.env.PORT || 5501;
// set the view engine to ejs
let path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// use res.render to load up an ejs view file

let myTypeServer = "9️⃣ The Peacemaker ✌🏻";

app.get('/', function(req, res) {

  res.render('index', {
   
    myTypeClient: myTypeServer 

  });
  
});


app.get('/send', function (req, res) {
  
    res.send('Hello World from Express <br><a href="/">home</a>')
})

// app.listen(3000)

app.listen(port, () => {
  console.log(`nov app listening on port ${port}`)
})