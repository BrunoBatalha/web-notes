import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const array = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.send('rodando');
});

app.post('/anotacao', (req, res) => {
    array.push(req.body.anotacao);
    res.json('OK');
});

app.get('/anotacao',(req,res)=>{
    res.json(array);
})

app.delete('/anotacao/:index',(req,res)=>{
    const index = req.params.index;
    array.splice(index,1);
    res.json('OK');
})

app.listen(9000, () => {
    console.log('Servidor rodando na porta 9000!');
});