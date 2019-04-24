const express = require('express');
const multiparty = require('connect-multiparty');
const exphbs = require("express-handlebars");
const _ = require('lodash')
const getFiles =  require('./lib')
const path = require('path')
const app = express();

const imagesDirectory = path.join(__dirname, 'public/images');

const URL = process.env.URL_BASE ||'http://localhost:3000/';
app.set('PORT', process.env.PORT || 3000)
app.use(express.static(imagesDirectory))
app.set('views', path.join(__dirname, 'src', 'views'))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

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
    if (req.files && !_.isEmpty(req.files)) {

        LINKS.push("Imagen Subida")
        console.log('files', LINKS);
        console.log('imagen subida', req.files);
        res.json({
            success: true,
            message: 'Archivos recibidos'
        })
    } else {
        res.json({
            success: false,
            message: 'No se envio ninguna imagen'
        })
    }
})
app.get("/", async (req, res) => {
    let images =  await  getFiles()
    images =  _.chain(images).map(i=>{
        return `${URL}${i}`
    }).filter(i=>{
        const test =   /\.(png|jpg|gif)$/i.test(i)
        console.log("TEST",test)
        console.log("ITEM",i)
        return test
    }).value()
    res.render('listado', { links: images })
})

app.get('/images',async (req,res)=>{
   let images =  await  getFiles()
    images =  _.chain(images).map(i=>{
        return `${URL}${i}`
    }).filter(i=>{
        return /\.(png|jpg|gif)$/i.test(i)
    }).value()
   res.json({
       success:true,
       images:images
   })
})


app.listen(app.get('PORT'), () => {
    console.log('Port on Server', app.get('PORT'));
})