const express = require('express');
const path = require('path')
const app = express();


app.set('PORT', 8080)


app.get('/', (req, res) => {
    return res.send('Hello Word !')
})

app.listen(app.get('PORT'), () => {
    console.log(`Corriendo en http://localhost:${app.get('PORT')}`);
})