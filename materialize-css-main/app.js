const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('./config/bd');

const artistas = require('./models/artista.js');
const diretores = require('./models/diretor.js');
const filmes = require('./models/filme.js');
const fichasTecnicas = require('./models/fichaTec.js');

const methodOverride = require('method-override');

const app = express();

app.use(methodOverride('_method'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.engine('handlebars', exphbs.engine({
  defaultLayout: false
}));

app.set('view engine', 'handlebars');

app.get('/', (req, res) => {

  res.render('home', {
    titulo: 'Página Inicial'
  });

});

app.get('/filmes', (req, res) => {

    res.render('filmes/listar', {
        titulo: 'Filmes',
        filmes: filmes
    });

});


app.get('/filmes/cadastrar', (req, res) => {

    res.render('filmes/cadastrar', {
        titulo: 'Cadastrar Filme'
    });

});

app.get('/filmes/:id', (req, res) => {

    const id = Number(req.params.id);

    const filme = filmes.find(filme => filme.id === id);

    if (!filme) {
        return res.status(404).send('Filme não encontrado');
    }

    res.render('filmes/detalhar', {
        titulo: filme.titulo,
        filme: filme
    });

});

app.get('/ficha-tecnica', (req, res) => {

    res.render('ficha-tecnica/listar', {
        titulo: 'Ficha Técnica',
        fichasTecnicas: fichasTecnicas
    });

});

app.get('/ficha-tecnica/cadastrar', (req, res) => {

    res.render('ficha-tecnica/cadastrar', {
        titulo: 'Cadastrar Ficha Técnica'
    });

});


app.get('/ficha-tecnica/:id', (req, res) => {

    const id = Number(req.params.id);

    const ficha = fichasTecnicas.find(
        ficha => ficha.id === id
    );

    if (!ficha) {
        return res.status(404).send('Ficha Técnica não encontrada');
    }

    res.render('ficha-tecnica/detalhar', {
        titulo: 'Ficha Técnica',
        ficha: ficha
    });

});

app.get('/diretores', (req, res) => {

    res.render('diretores/listar', {
        titulo: 'Diretores',
        diretores: diretores
    });

});

app.get('/diretores/cadastrar', (req, res) => {

    res.render('diretores/cadastrar', {
        titulo: 'Cadastrar Diretor'
    });
});



app.get('/diretores/:id', (req, res) => {
    const id = Number(req.params.id);

    const diretor = diretores.find(
        diretor => diretor.id === id
    );

    if (!diretor) {
        return res.status(404).send('Diretor não encontrado');
    }

    res.render('diretores/detalhar', {
        titulo: 'Diretor',
        diretor: diretor
    });
});
app.get('/artistas', (req, res) => {

    res.render('artistas/listar', {
        titulo: 'Artistas',
        artistas: artistas
    }); 
});

app.get('/artistas/cadastrar', (req, res) => {
    res.render('artistas/cadastrar', {
        titulo: 'Cadastrar Artista'
    });
});

app.get('/artistas/:id', (req, res) => {
    const id = Number(req.params.id);
    const artista = artistas.find(artista => artista.id === id);
    if(!artista) {
        return res.status(404).send('Artista não encontrado');
    }
    res.render('artistas/detalhar', {
        titulo: 'Artista',
        artista: artista
    });
});








async function conectarBD() {

  try {

    await sequelize.sync();

    console.log(
      'Conexão com o banco de dados estabelecida com sucesso!'
    );

  } catch (erro) {

    console.error(
      'Erro ao conectar:',
      erro
    );

  }

}

conectarBD();


// ==========================================
// SERVIDOR
// ==========================================

app.listen(3000, () => {

  console.log(
    'Servidor executando em http://localhost:3000'
  );

});


