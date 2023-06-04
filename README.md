## Native modules on Node.js
### Getting started
1. Install [Node.js](https://nodejs.org/en/download/)
2. Install [node-gyp] npm package globally: `npm install -g node-gyp`
3. Get installed VS version: `npm config get msvs_version` take care of that when you try to execute the command node-gyp configure
4. Install [Python 2.7](https://www.python.org/downloads/) (required by node-gyp)
5. Install [Visual Studio](https://www.visualstudio.com/downloads/) (required by node-gyp)

### Building native modules
1. Create a new folder for your project
2. Create a new file named `binding.gyp` with the following content:
```json
{
  "targets": [
    {
      "target_name": "hello",
      "sources": [ "hello.cc" ]
    }
  ]
}
```
3. Create a new file named `hello.cc` with the following content:
```cpp
// hello.cc
#include <node.h>

namespace demo {
//Funciones que necesita node para cargar el modulo
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

//Funcion que se ejecuta cuando se llama al modulo
void Method(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(String::NewFromUtf8(
      isolate, "world").ToLocalChecked());
}

//Funcion que se ejecuta cuando se carga el modulo
void Initialize(Local<Object> exports) {
  NODE_SET_METHOD(exports, "hello", Method);
}
//Se registra el modulo
NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)

}  // namespace demo
```
4. Execute `node-gyp configure` to generate the build files
5. Execute `node-gyp build` to build the module
6. Create a new file named `main.js` with the following content:
```javascript
const miAddon = require('./build/Release/addon');
console.log(miAddon.hello()); // 'world'
```
7. Execute `nodemon main.js` to run the code
