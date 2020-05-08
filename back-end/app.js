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

app.get('/excluir/:index',(req,res)=>{
    const index = req.params.index;
    array.splice(index,1);
    res.json({novaLista:array});
})

app.listen(9000, () => {
    console.log('Servidor rodando na porta 9000!');
});