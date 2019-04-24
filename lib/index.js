//requiring path and fs modules
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const directoryPath = path.join(__dirname,'..','public', 'images');

const readFile = (path = directoryPath, opts = 'utf8') =>
    new Promise((resolve, reject) => {
        fs.readdir(directoryPath, opts, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })

module.exports = readFile;