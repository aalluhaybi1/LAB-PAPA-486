const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000 ; 


let path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let myTypeServer = "🌟 Dreaming of Graduation 🎓";

//const mongoURI = process.env.URI;
require('dotenv').config();

const mongoURI = process.env.URI;
const client = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const result = await client.db("lab_papa-database").collection("papa-collection").find().toArray();
    console.log("cxnDB result: ", result);
    console.log("Oinged your deployment. you successfully connected to MongoDB!");

  } finally {

    await client.close();
  }

}

run().catch(console.dir);

app.get('/', function (req, res) {
  res.render('index', {
    myTypeClient: myTypeServer
  });
});

app.get('/send', function (req, res) {
  res.send('Hello World from Express <br><a href="/">home</a>');
});

app.get('/source-code', function (req, res) {
  
  res.send('Source code goes here');
});

app.listen(port, () => {
  console.log(`papa app listening on port ${port}`);
});


