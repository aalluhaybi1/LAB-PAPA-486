require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

let path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

let myTypeServer = "9️⃣ The Peacemaker ✌🏻";
const uri = process.env.URL;
const client = new MongoClient(uri);


async function run() {
  try {
    await client.connect();
    const result = await client.db("papa_database").collection("papa_collection").find().toArray();
    return result;
  } finally {
    await client.close();
  }
}

app.get('/read', async (req, res) => {
  try {
    let myResultServer = await run();
    console.log("myResultServer:", myResultServer);
    res.render('index', {
      myTypeClient: myTypeServer,
      myResultClient: myResultServer
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/', async function (req, res) {
  try {
    const myResultServer = await run();
    res.render('index', {
      myTypeClient: myTypeServer,
      myResultClient: myResultServer
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/name', (req, res) => {
  console.log("in get to slash name:", req.query.ejsFormName);
  myTypeServer = req.query.ejsFormName;
  res.render('index', {
    myTypeClient: myTypeServer,
    myResultClient: "myResultServer"
  });
});

app.get('/send', function (req, res) {
  res.send('Hello World from Express <br><a href="/">home</a>');
});

app.listen(port, () => {
  console.log(`papa app listening on port ${port}`);
});
