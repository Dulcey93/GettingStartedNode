const fs = require('fs');

function leer(ruta, callback) {
    fs.readFile(ruta, (err, data) => {
        // Leido
        callback(data.toString());
    })
}

function escribir(ruta, contenido, callback) {
    fs.writeFile(ruta, contenido, (err) => {
        if (err) {
            console.error('No he podido escribirlo', err);
        } else {
            callback('Se ha escrito correctamente');
        }
    });
}
function borrar(ruta, callback) {
    fs.unlink(ruta, callback);
}
borrar(__dirname + '/archivo1.txt', console.log);
// escribir(__dirname + '/archivo.txt', 'Soy un archivo nuevo', console.log);
// leer(__dirname + '/archivo.txt', console.log);