let express = require("express")

let app = express()

let port = 5000


let cors = require('cors')

app.use(cors())

app.use(express.json())

// env config 

require('dotenv').config()





const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_EMAIL}:${process.env.DB_PASS}@cluster0.iqgllty.mongodb.net/?retryWrites=true&w=majority `;

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


    const database = client.db("insertDB");
    const user1 = database.collection("users");

    app.get("/user", async (req, res) => {

      let coursor = user1.find()

      const result = await coursor.toArray()

      res.send(result)

    })



    app.post('/user', async (req, res) => {
      let user = req.user
      const result = await user1.insertOne(user);

      res.send(result)
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();

  }
}
run().catch(console.dir);






app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})