import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs/promises";

export async function POST({ request }) {
  // Obtener el archivo del cuerpo de la solicitud
  const file = await request.arrayBuffer();
  let buffer = Buffer.from(file);

  // Buscar el índice del encabezado
  const headerEnd = buffer.indexOf("\n\n");

  if (headerEnd !== -1) {
    // Eliminar el encabezado del buffer
    buffer = buffer.slice(headerEnd + 2);
  }

  // Obtener la ruta del directorio del módulo actual
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  // Definir la ruta del archivo en el directorio público
  const dirPath = path.join(__dirname, "../../public");
  const filePath = path.join(dirPath, "esfera.glb");

  // Crear el directorio si no existe
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    console.error(err);
  }

  // Guardar el archivo en el directorio público
  try {
    await fs.writeFile(filePath, buffer);
    console.log(`Archivo guardado en: ${filePath}`);
  } catch (err) {
    console.error(err);
  }

  // Devolver la respuesta
  return new Response(JSON.stringify({ message: "Archivo subido con éxito" }), {
    status: 200,
  });
}
