require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5500;
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');

// Set the view engine to ejs
let path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

// Define the type string
let myTypeServer = "🌟 Dreaming of Graduation 🎓";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Define an asynchronous function to connect to MongoDB and fetch data
async function run() {
  try {
    await client.connect();
    const result = await client.db("lab_papa-database").collection("papa-collection").find().toArray();
    return result;
  } finally {
    await client.close();
  }
}

// Define a route to handle reading data from MongoDB
app.get('/read', async (req,res) => {

  let myResultServer = await run(); 

  console.log("myResultServer:", myResultServer[0].userName);



  res.render('index', {
    myTypeClient: myTypeServer,
    myResultClient: null

  });


}); 
run().catch(console.dir);



app.get('/', function(req, res) {

  res.render('index', {
   
    myTypeClient: myTypeServer 

  });
  
});
// Define a route to send a simple response
app.get('/send', (req, res) => {
  res.send('Hello World from Express <br><a href="/">home</a>');
});

// Start the server
app.listen(port, () => {
  console.log(`papa app listening on port ${port}`);
});
