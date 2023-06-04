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