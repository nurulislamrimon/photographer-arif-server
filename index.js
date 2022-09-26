const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

// middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_pass}@cluster0.bkgzsa5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const photoCollection = client.db('photoCollection').collection('photo');

        app.get('/photos', async (req, res) => {
            const query = {};
            const result = await photoCollection.find(query).toArray();
            res.send(result);
            console.log('Photos responsed');
        })
    } finally { }
}
run().catch(e => console.dir)

app.get('/', (req, res) => {
    res.send({ result: 'Done!' });
})
app.listen(port, () => {
    console.log(`${port} is listening`);
})