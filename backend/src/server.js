import express from 'express';
import {MongoClient} from 'mongodb'

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
    const {expense, price} = req.body;
    console.log(expense);
    console.log(price);
    

    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('react-expense-calculator-db');

    const article = await db.collection('articles').findOne({month: month,year : year})
    const currTotalExp = article.totalExpense;

    await db.collection('articles').updateOne({year, month}, {
        $push: {content : {expense, price}},
        $set: {totalExpense: parseInt(currTotalExp) + parseInt(price)},
    })

    if (article){
        res.json(article);
    } else {
        res.sendStatus(404).send('No budget found yet!');
    }
})

app.delete('/api/:year/:month/delExpense', async (req,res) => {
    const {year} = req.params;
    const {month} = req.params;
    const {expense} = req.body;
    console.log(expense);
    
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    const db = client.db('react-expense-calculator-db');

    const article = await db.collection('articles').findOne({month: month,year : year})
    const currTotalExp = article.totalExpense;

    await db.collection('articles').updateOne({year, month}, {
        $pop: {content : {expense}}
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

