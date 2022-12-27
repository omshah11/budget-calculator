import express from 'express';
import {MongoClient} from 'mongodb'

// PUT /{month-number}

// const months = [
//     {
//         month: "1",
//         year: "2023",
//         totalExpense: "$259",
//         content: ["shoes: $59", "clothes: $200"]
//     },
//     {
//         month: "2",
//         year: "2023",
//         totalExpense: "$150",
//         content: ["snacks: $50", "books: $100"]
//     }
// ]

const app = express();

app.use(express.json());

app.get('/api/:year/:month', async (req,res) => {
    //const {year} = req.params.year;
    const {year} = req.params;
    const {month} = req.params;

    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('react-expense-calculator-db');

    const article = await db.collection('articles').findOne({month: month,year : year})

    if (article){
        res.json(article);
    } else {
        res.sendStatus(404).send('No budget found yet!');
    }
})

app.post('/api/:year/:month/addExpense', async (req,res) => {
    //const {year} = req.params.year;
    const {year} = req.params;
    const {month} = req.params;
    const {newExpense, value} = req.body;
    

    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('react-expense-calculator-db');

    const article = await db.collection('articles').findOne({month: month,year : year})
    const currTotalExp = article.totalExpense;

    await db.collection('articles').updateOne({year, month}, {
        $push: {content : newExpense},
        $set: {totalExpense: String(parseInt(currTotalExp) + parseInt(value))}
    })

    if (article){
        res.json(article);
    } else {
        res.sendStatus(404).send('No budget found yet!');
    }
})

app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});

