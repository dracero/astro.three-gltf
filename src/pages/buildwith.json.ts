/*// @ts-nocheck
import Counter from "./db.js";

//Función de escritura
export async function POST({ request }) {
  const body = await request.json();
  const count = body.counter;
  // Guardar el valor en la base de datos  Lo comento para haer pruebas tranquilamente
  try {
    const img = await Counter.create({ data: count });
    console.log(img);
  } catch (err) {
    console.error(err);
  }
  // return the response
  return new Response(JSON.stringify(count), {
    status: 200,
  });
}

//Función de lectura
export async function GET() {
  // Leer todos los valores de la base de datos
  let data;
  try {
    data = await Counter.find();
  } catch (err) {
    console.error(err);
  }
  // Devolver la respuesta
  return new Response(JSON.stringify(data), {
    status: 200,
  });
}*/
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs/promises";

export async function POST({ request }) {
  const body = await request.json();
  const count = body.counter;

  // Obtener la ruta del directorio del módulo actual
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  // Definir la ruta del archivo en el directorio público
  const dirPath = path.join(__dirname, "public");
  const filePath = path.join(dirPath, "esfera.json");

  // Crear el directorio si no existe
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    console.error(err);
  }

  // Guardar el valor en el archivo en lugar de en la base de datos
  try {
    await fs.writeFile(filePath, JSON.stringify(count));
    console.log(`Archivo guardado en: ${filePath}`);
  } catch (err) {
    console.error(err);
  }

  // Devolver la respuesta
  return new Response(JSON.stringify(count), {
    status: 200,
  });
}
