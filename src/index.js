/* Importação de Bibliotecas. */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // Biblioteca de log para requisições HTTP;
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

/* Instâncias das Biblioteas. */
const app = express();

/* Ativando Bibliotecas na Aplicação */
// Criando Arquivo de log.
const accessLogStream = fs.createWriteStream( path.resolve(__dirname, '..', 'logs', 'access.log'), {flags: 'a'} );
app.use(morgan('combined', {stream: accessLogStream}));


/* Configuração do banco de Dados */
mongoose.connect('mongodb+srv://myImages:myImages@cluster0-yb2yo.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser : true
});

app.use(cors());

/* Tipos de Entrada de Arquivos na Aplicação. */
app.use(express.json({
    limit: '5mb'
}))
app.use(express.urlencoded({
    extended: true 
}));

/* Configuração da Rota de Acesso a Imagens */
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
app.use('/download', (req, res) => {
    return res.status(200).download(path.resolve(__dirname, '..', 'logs', 'access.log'));
});
/* Rotas */
app.use(require('./routes'));

/* Host e Porta onde a aplicação está em execução. */
const URL = process.env.URL || "http://localhost";
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server Running in ${URL}:${PORT}`));