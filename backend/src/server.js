import express from 'express';

// PUT /{month-number}

const app = express();

app.use(express.json());

app.put('/api/:monthNum', (req,res) => {

})

app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});

