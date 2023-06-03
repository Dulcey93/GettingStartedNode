## Child Process in Node.js
Start learning about child process in Node.js
## Child Process
A child process is a process created by another process (the parent process). This means that every process except the first one, is created by a parent process. The parent process is usually a shell. The shell process has the process id (pid) 1. The child processes get pid numbers in ascending order. The pid number is used to identify the process. The pid number is unique and can not be reused. When a process is terminated, the pid number is freed and can be reused by another process.
## Child Process Module
The child process module provides the ability to spawn child processes in a manner that is similar, but not identical, to popen(3). This capability is primarily provided by the child_process.spawn() function:
```javascript
const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);
ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});
ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});
ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
```
The child_process.exec() function is similar to child_process.spawn() except that it creates a shell to execute the command:
```javascript
const { exec } = require('child_process');
exec('cat *.js bad_file | wc -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
```
The child_process.execFile() function is similar to child_process.exec() except that it does not spawn a shell by default. Rather, the specified executable file is spawned directly as a new process making it slightly more efficient than child_process.exec():
```javascript
const { execFile } = require('child_process');
const child = execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});
```
The child_process.fork() function is a special case of child_process.spawn() used specifically to spawn new Node.js processes. Like child_process.spawn(), a ChildProcess object is returned. The returned ChildProcess will have an additional communication channel built-in that allows messages to be passed back and forth between the parent and child. See subprocess.send() for details.
```javascript
const { fork } = require('child_process');
const forked = fork('child.js');
forked.on('message', (msg) => {
  console.log('Message from child', msg);
});
forked.send({ hello: 'world' });
```
## References
- https://nodejs.org/api/child_process.html
- https://www.w3schools.com/nodejs/nodejs_child_processes.asp
- https://www.tutorialspoint.com/nodejs/nodejs_scaling_application.htm
