const express = require('express');
const multiparty = require('connect-multiparty');
const exphbs = require("express-handlebars");


const path = require('path')
const app = express();

const imagesDirectory = path.join(__dirname, 'public/images')
app.set('PORT', process.env.PORT || 3000)
app.use(express.static(imagesDirectory))
app.set('views', path.join(__dirname, 'src', 'views'))

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    // helpers:require("./lib/handlerbars")
}))

app.set('view engine', '.hbs')

const multipartyMiddleware = multiparty({ uploadDir: imagesDirectory, });
const LINKS = [];


app.post('/upload', multipartyMiddleware, (req, res) => {
    LINKS.push(req.files.file.originalFilename)
    console.log('files', LINKS);
    console.log('imagen subida',req.files);
    res.json({
        success: true,
        message: 'Archivos recibidos'
    })
})
app.get("/", (req, res) => {
    res.render('listado', { links: LINKS })
})


app.listen(app.get('PORT'), () => {
    console.log('Port on Server', app.get('PORT'));
})