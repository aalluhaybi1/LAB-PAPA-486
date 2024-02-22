require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser')
const uri = 'mongodb+srv://aalluhaybi1:NMklop90@lab-papa-486.n2dknyc.mongodb.net/?retryWrites=true&w=majority'

// set the view engine to ejs
let path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }))

// use res.render to load up an ejs view file

let myTypeServer = "🌟 Dreaming of Graduation 🎓";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    const result = await client.db("lab_papa-database").collection("papa-collection").find().toArray();

    //console.log("cxnDB result: ", result);

    return result; 

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
//run().catch(console.dir);

app.get('/read', async (req,res) => {

  let myResultServer = await run(); 

  console.log("myResultServer:", myResultServer);

  res.render('index', {
    myTypeClient: myTypeServer,
    myResultClient: myResultServer

  });


}); 
run().catch(console.dir);



app.get('/', async function(req, res) {
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



app.get('/name', (req,res) => {

  console.log("I Got This:", req.query.ejsFormName); 
  myTypeServer = req.query.ejsFormName; 

  res.render('index', {
    myTypeClient: myTypeServer,
    myResultClient: "myResultServer"

  });

  
})



app.get('/send', function (req, res) {
  
    res.send('Hello World from Express <br><a href="/">home</a>')
})

app.listen(port, () => {
console.log(`papa app listening on port ${port}`)
})