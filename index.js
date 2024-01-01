const express = require("express");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { ObjectId } = require("mongodb");

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dokkyfc.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const serviceDataCollection = client.db("wedding-management").collection("serviceData");
    // const serviceDetailsCollection = client.db("wedding-management").collection("serviceDetails");
    const cardCollection = client.db("wedding-management").collection("card");
    const teamCollection = client.db("wedding-management").collection("team");
    const shopCollection = client.db("wedding-management").collection("shop");
    const bookingCollection = client.db("wedding-management").collection("booking");

    app.get("/serviceData", async (req, res) => {
      const cursor = serviceDataCollection.find({});
      const serviceData = await cursor.toArray();
      res.send(serviceData);
    });

    // app.get("/serviceDetails", async (req, res) => {
    //   const cursor = serviceDetailsCollection.find({});
    //   const serviceDetails = await cursor.toArray();
    //   res.send(serviceDetails);
    // });

    app.get("/card", async (req, res) => {
      const cursor = cardCollection.find({});
      const card = await cursor.toArray();
      res.send(card);
    });

    app.get("/team", async (req, res) => {
      const cursor = teamCollection.find({});
      const team = await cursor.toArray();
      res.send(team);
    });
    app.get("/shop", async (req, res) => {
      const cursor = shopCollection.find({});
      const shop = await cursor.toArray();
      res.send(shop);
    });

    app.get("/booking", async (req, res) => {
      const cursor = bookingCollection.find({});
      const booking = await cursor.toArray();
      res.send(booking);
    });

    app.get("/serviceData/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const serviceData = await serviceDataCollection.findOne(query);
      res.json(serviceData);
    });

    app.post("/addBooking", async (req, res) => {
      const newBooking = req.body;
      const result = await bookingCollection.insertOne(newBooking);
      console.log("hitting the addBooking", result);
      res.json(result);
    });

    app.post("/addServiceData", async (req, res) => {
      const newServiceData = req.body;
      const result = await serviceDataCollection.insertOne(newServiceData);
      console.log("hitting the addServiceData", result);
      res.json(result);
    });

    // app.post("/addServiceDetails", async (req, res) => {
    //   const newServiceDetails = req.body;
    //   const result = await serviceDetailsCollection.insertOne(
    //     newServiceDetails
    //   );
    //   console.log("hitting the addServiceDetails", result);
    //   res.json(result);
    // });

    app.post("/addCard", async (req, res) => {
      const newCard = req.body;
      const result = await cardCollection.insertOne(newCard);
      console.log("hitting the addCard", result);
      res.json(result);
    });

    app.post("/addTeam", async (req, res) => {
      const newTeam = req.body;
      const result = await teamCollection.insertOne(newTeam);
      console.log("hitting the addTeam", result);
      res.json(result);
    });

    app.post("/addShop", async (req, res) => {
      const newShop = req.body;
      const result = await shopCollection.insertOne(newShop);
      console.log("hitting the addShop", result);
      res.json(result);
    });

    app.delete("/deleteServiceData/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await serviceDataCollection.deleteOne(query);
      res.json(result);
    });

    // app.delete("/deleteServiceDetails/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await serviceDetailsCollection.deleteOne(query);
    //   res.json(result);
    // });

    app.delete("/deleteCard/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await cardCollection.deleteOne(query);
      res.json(result);
    });

    app.delete("/deleteTeam/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await teamCollection.deleteOne(query);
      res.json(result);
    });

    app.delete("/deleteShop/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await shopCollection.deleteOne(query);
      res.json(result);
    });

    app.patch("/updateServiceData/:id", async (req, res) => {
      const id = req.params.id;
      const updatedServiceData = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: updatedServiceData.name,
          price: updatedServiceData.price,
          description: updatedServiceData.description,
        },
      };
      const result = await serviceDataCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.json(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
