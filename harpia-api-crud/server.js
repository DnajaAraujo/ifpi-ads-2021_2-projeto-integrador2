const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Postagem = require('./app/models/postagem')
const configuracao = require('./config')

mongoose.connect(configuracao.db)

app.use(express.json({ limit: '50mb'}))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Salva imagem no diretório local
app.use(configuracao.path, express.static(__dirname + '/public/upload'))

const router = express.Router()

// Middleware
router.use((req, res, next) => {
    console.log('...')
    next()
})


// Rotas Postagens
// ----------------------------------------------------------
// Obter todas as postagens
router.get('/postagens', async(req, res) => {
    Postagem.find((error, postagens) => {
        if (error) {
            res.status(400).json({ mensagem: 'Erro ao tentar obter todos as postagens' })
        }
        res.status(200).json(postagens)
    })
})


// Obter uma postagem
router.get('/postagens/:id', async(req, res) => {
    const { id } = req.params
    Postagem.findById(id, (error, postagem) => {
        if (error) {
            res.status(400).json({ mensagem: 'Id da postagem não encontrado' })
        }
        res.status(200).json(postagem)
    })
})


// Criar postagem
router.post('/postagens/criar', async(req, res) => {
    const postagem = new Postagem()

    postagem.titulo = req.body.titulo
    postagem.descricao = req.body.descricao
    postagem.categoria = req.body.categoria
    postagem.idUsuario = req.body.idUsuario

    if (req.body.imagem != '') {
        const imagem = req.body.imagem
        const fs = require('fs')
        const nomeArquivo = Math.random().toString() + '.jpg'

        postagem.imagem = 'public/upload/' + nomeArquivo
        fs.writeFile('public/upload/' + nomeArquivo, imagem, 'base64', () => {
            postagem.save((error) => {
                if (error) {
                    res.status(400).json({ mensagem: 'Erro ao tentar salvar a postagem' })
                }
                res.status(200).json({ mensagem: 'Postagem cadastrada com sucesso!' })
            })
        })
    }
  
})


// Alterar postagem
router.put('/postagens/alterar/:id', async(req, res) => {
    const { id } = req.params
    const { titulo, descricao, categoria, idUsuario } = req.body

    Postagem.findById(id, (error, postagem) => {
        if (error) {
            res.status(400).json({ mensagem: 'Id da postagem não encontrado...' })
        }
        if (titulo) postagem.titulo = titulo
        if (descricao) postagem.descricao = descricao
        if (categoria) postagem.categoria = categoria
        if (idUsuario) postagem.idUsuario = idUsuario
        
        postagem.save((error) => {
            if (error) {
                res.status(400).json({ mensagem: 'Erro ao alterar a postagem' })
            }
            res.status(200).json({ mensagem: 'Postagem atualizada com sucesso!' })
        })
    })

})


// Deletar postagem
router.delete('/postagens/deletar/:id', async(req, res) => {
    const { id } = req.params

    Postagem.deleteOne({_id: id}, (error) => {
        if (error) {
            res.status(400).json({ mensagem: 'Id da postagem não foi encontrado' })
        }
        res.status(200).json({ mensagem: 'Postagem excluida com sucesso!' })
    })
})

// ----------------------------------------------------------








// Padronizando rotas (ex.: .../api/postagens)
app.use('/api', router)

// Inicializando servidor
app.listen(configuracao.porta, () => {
    console.log('App running *3000...')
})
