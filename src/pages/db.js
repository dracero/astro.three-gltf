import mongoose from "mongoose";

// Conectarse a la base de datos
mongoose.connect(
  "mongodb+srv://root:juana99@cluster0.zf9fl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
);
// Definir el esquema
const NumberSchema = new mongoose.Schema({
  data: Number, // para almacenar la imagen en base64
  // puedes agregar más campos si lo necesitas, por ejemplo:
  // name: String, // para almacenar el nombre de la imagen
  // created: { type: Date, default: Date.now }, // para almacenar la fecha de creación
});

// Crear el modelo
const Counter = mongoose.model("Number", NumberSchema);

// Ahora puedes usar el modelo Image para guardar y recuperar imágenes en base64

export default Counter;