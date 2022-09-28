const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_pass}@cluster0.bkgzsa5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const carouselCollection = client.db('carouselCollection').collection('carousel');
        const photoCollection = client.db('photoCollection').collection('photo');
        const achivementCollection = client.db('achivementCollection').collection('achivement');

        // photos crud
        app.get('/photos', async (req, res) => {
            const query = {};
            const result = await photoCollection.find(query).sort({ _id: 1 }).toArray();
            res.send(result);
            console.log('Photos responsed');
        })
        // specific photo
        app.get('/photo', async (req, res) => {
            const id = req.query.id;
            const query = { _id: ObjectId(id) }
            const result = await photoCollection.findOne(query);
            res.send(result)
            console.log(`photo ${id} is responsing`);
        })
        app.post('/photo', async (req, res) => {
            const newPhoto = req.body.data;
            const result = await photoCollection.insertOne(newPhoto);
            res.send(result);
            console.log('new photo added');
        })
        app.delete('/photo/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await photoCollection.deleteOne(query);
            res.send(result);
            console.log(`photo ${id} deleted`);
        })
        app.put('/photo/:id', async (req, res) => {
            const id = req.params.id;
            const updateData = req.body;
            const query = { _id: ObjectId(id) };
            const result = await photoCollection.updateMany(query, { $set: updateData })
            res.send(result);
            console.log(`photo ${id} is updated`);
        })

        // carousel crud
        app.get('/carousels', async (req, res) => {
            const query = {};
            const result = await carouselCollection.find(query).sort({ _id: 1 }).toArray();
            res.send(result);
            console.log('carousel responsed');
        })
        // specific photo
        app.get('/carousel', async (req, res) => {
            const id = req.query.id;
            const query = { _id: ObjectId(id) }
            const result = await carouselCollection.findOne(query);
            res.send(result)
            console.log(`carousel ${id} is responsing`);
        })
        app.post('/carousel', async (req, res) => {
            const newCarousel = req.body.data;
            const result = await carouselCollection.insertOne(newCarousel);
            res.send(result);
            console.log('new carousel added');
        })
        app.delete('/carousel/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await carouselCollection.deleteOne(query);
            res.send(result);
            console.log(`carousel ${id} deleted`);
        })
        app.put('/carousel/:id', async (req, res) => {
            const id = req.params.id;
            const updateData = req.body;
            const query = { _id: ObjectId(id) };
            const result = await carouselCollection.updateMany(query, { $set: updateData })
            res.send(result);
            console.log(`carousel ${id} is updated`);
        })
        // achivements crud
        app.get('/achivements', async (req, res) => {
            const query = {};
            const result = await achivementCollection.find(query).toArray();
            res.send(result);
            console.log('achivements responsed');
        })
        // specific achivement
        app.post('/achivement', async (req, res) => {
            const newAchivement = req.body.data;
            const result = await achivementCollection.insertOne(newAchivement);
            res.send(result);
            console.log('new achivement added');
        })
        app.delete('/achivement/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await achivementCollection.deleteOne(query);
            res.send(result);
            console.log(`achivement ${id} deleted`);
        })
        app.put('/achivement/:id', async (req, res) => {
            const id = req.params.id;
            const updateData = req.body;
            const query = { _id: ObjectId(id) };
            const result = await achivementCollection.updateMany(query, { $set: updateData })
            res.send(result);
            console.log(`achivement ${id} is updated`);
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