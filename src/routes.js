const routes = require('express').Router();
const multer = require('multer');
const multerConfig  = require('./config/multer');

routes.get('/', (req,res) => {
    return res.status(200).json({
        name: "MyImage",
        description: "Aplicação backend que para uploads de arquivos.",
        version: "1.0.0"
    });
});

const PostController = require('./app/controllers/PostController');

routes.get('/posts', PostController.index);
routes.post('/posts', multer(multerConfig).single('file'), PostController.store);
routes.delete('/posts/:id', PostController.destroy);

module.exports = routes;