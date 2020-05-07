import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const array = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.send('rodando');
});

app.post('/enviar', (req, res) => {
    array.push(req.body.anotacao);
    res.json({ resposta: 'Anotação salva com sucesso' });
});

app.post('/anotacoes',(req,res)=>{
    res.json({resultado: array});
})

app.listen(9000, () => {
    console.log('Servidor rodando na porta 9000!');
});