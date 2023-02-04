import express from 'express';
import path from 'path';
import {MongoClient} from 'mongodb'
import {fileURLToPath} from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

app.get(/^(?!\/api).+/, (req,res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

app.get('/api/:year/:month', async (req,res) => {
    //const {year} = req.params.year;
    const {year} = req.params;
    const {month} = req.params;

    const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.gpjzfpz.mongodb.net/?retryWrites=true&w=majority`);
    await client.connect();

    const db = client.db('react-expense-calculator-db');

    const article = await db.collection('articles').findOne({month: month,year : year})

    if (article){
        res.json(article);
    } else {
        //res.sendStatus(404).send('No budget found yet!');
    }
})

app.post('/api/:year/:month/addExpense', async (req,res) => {
    //const {year} = req.params.year;
    const {year} = req.params;
    const {month} = req.params;
    const {expense, price} = req.body;
    console.log(expense);
    console.log(price);
    

    const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.gpjzfpz.mongodb.net/?retryWrites=true&w=majority`);
    await client.connect();

    const db = client.db('react-expense-calculator-db');

    const article = await db.collection('articles').findOne({month: month,year : year})
    console.log(article)
    if (article != null){
        const currTotalExp = article.totalExpense;
        await db.collection('articles').updateOne({year, month}, {
            $push: {content : {expense, price}},
            $set: {totalExpense: parseInt(currTotalExp) + parseInt(price)}
        })
    }
    else {
        //const currTotalExp = article.totalExpense;
        console.log("inside");
        await db.collection('articles').insert(
            {
                "month": month,
                "year": year,
                "totalExpense": parseInt(price),
                "content": [
                  {
                    "expense": expense,
                    "price": parseInt(price)
                  }
                ]
            }
            )
        //console.log(totalExpense)
    }
    
    // if (article){
    //     res.json(article);
    // } else {
    //     res.sendStatus(404).send('No budget found yet!');
    // }
})

app.delete('/api/:year/:month/delExpense', async (req,res) => {
    const {year} = req.params;
    const {month} = req.params;
    const {expense} = req.body;
    console.log(expense);
    
    const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.gpjzfpz.mongodb.net/?retryWrites=true&w=majority`);
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

const PORT = process.env.PORT || 8000;

app.listen(8000, () => {
    console.log('Server is listening on port ' + PORT);
});

