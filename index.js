const express = require('express');
const multiparty = require('connect-multiparty');
const path = require('path')
const app = express();

const imagesDirectory = path.join(__dirname, 'public/images')
app.set('PORT', process.env.PORT || 3000)
app.use(express.static(imagesDirectory))


const multipartyMiddleware = multiparty({ uploadDir: imagesDirectory, });



app.post('/upload', multipartyMiddleware, (req, res) => {
    
    res.json({
        success:true,
        message:'Archivos recibidos'
    })
})
app.get("/",(req,res)=>{
    res.send('WebService')
})


app.listen(app.get('PORT'), () => {
    console.log('Port on Server', app.get('PORT'));
})