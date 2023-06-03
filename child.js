const { exec, spawn } = require('child_process');
// child_process es como un modulo que existe en node y con el puedo importar exec y spawn que nos permite ejecutar comandos en la terminal

/* exec('ls-la', (err, stdout, sterr) => {
    // ls-la para linux, dir para windows
    if (err) {
        console.error(err)
        return false
    }
    console.log(stdout)
}) */
// Ejecutamos el comando ls -la y nos devuelve el contenido de la carpeta en la que estamos

let proceso = spawn('ls', ['-la']);

console.log(proceso.pid);
console.log(proceso.connected);

proceso.stdout.on('data', (dato) => {
    console.log('¿Está muerto?');
    console.log(proceso.killed);
    console.log(dato.toString());
})

proceso.on('exit', () => {
    console.log('El proceso terminó');
    console.log(proceso.killed);
})