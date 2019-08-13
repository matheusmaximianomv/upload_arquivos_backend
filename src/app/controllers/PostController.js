const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const Post = require('./../models/post');

module.exports = {

    async index(req, res) {
        try {
            const posts = await Post.find();
            return res.status(200).json(posts);
        } catch (error) {
            return res.status(400).json({ name: "Erro na Requisição", description: error});
        }
    },

    async store(req, res) {

        const { originalname : name, size, filename : key } = req.file;

        try {
            const post = await Post.create({
                name,
                size,
                key,
                url:`${process.env.URL || 'http://localhost:3001'}/files/${key}`
            }); 
            return res.status(201).json(post);
        } catch (error) {
            return res.status(400).json({ name: "Erro na Requisição", description: error});
        }
    },

    async destroy(req, res) {
        const { id } = req.params;
        try {
            const post = await Post.findById(id);
            try {
                await promisify(fs.unlink)(path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', post.key));
                await post.remove();
                return res.status(200).send();
            } catch (error) {
                return res.status(500).json({name: "Não foi possível Deletar o Post", description: error});
            }
        } catch (error) {
            return res.status(404).json({name : "Recurso Inexistente", description: error});
        }
    }
}