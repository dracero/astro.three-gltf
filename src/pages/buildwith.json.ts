// Outputs: /builtwith.json
// @ts-nocheck
import File from "./db.js";

// Función para leer el único archivo en formato binario
export async function GET() {
  try {
    // Buscar el primer archivo en la colección
    const fileInstance = await File.findOne();
    if (!fileInstance) {
      console.error("Archivo no encontrado");
      return new Response(
        JSON.stringify({ message: "Archivo no encontrado" }),
        {
          status: 404,
        },
      );
    }

    // Acceder al buffer del archivo
    const buffer = fileInstance.file;

    // Devolver la respuesta con el archivo en formato binario
    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": 'attachment; filename="archivo.glb"',
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Error al leer el archivo" }),
      {
        status: 500,
      },
    );
  }
}

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

  // Crear una nueva instancia del modelo File
  const fileInstance = new File({
    file: buffer,
  });

  // Guardar el archivo en la base de datos
  try {
    await fileInstance.save();
    console.log("Archivo guardado en la base de datos");
  } catch (err) {
    console.error(err);
  }

  // Devolver la respuesta
  return new Response(JSON.stringify({ message: "Archivo subido con éxito" }), {
    status: 200,
  });
}
