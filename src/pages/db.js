import mongoose from "mongoose";

// Conectarse a la base de datos
mongoose.connect(
  "mongodb+srv://root:juana99@cluster0.zf9fl.mongodb.net/file_blender?retryWrites=true&w=majority",
);

// Definir el esquema de la colección Files
const fileSchema = new mongoose.Schema({
  file: Buffer,
});

// Crear el modelo de la colección Files si no existe
let File;
try {
  File = mongoose.model("File");
} catch {
  File = mongoose.model("File", fileSchema);
}

// Exportar el modelo de la colección Files
export default File;
