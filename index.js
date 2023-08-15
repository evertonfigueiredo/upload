const express = require('express');
const multer = require('multer');

const app = express();
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Diretório onde as imagens serão armazenadas
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nome da imagem com timestamp para evitar conflitos
    }
});

const upload = multer({ storage: storage });

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

app.post('/upload', upload.single('imagem'), (req, res) => {
    // Acessando o novo nome do arquivo
    const novoNomeArquivo = req.file.filename;

    res.json({
        message: 'Upload de imagem realizado com sucesso!',
        nomeArquivo: novoNomeArquivo
    });
});
