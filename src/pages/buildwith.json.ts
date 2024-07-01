// Outputs: /builtwith.json
// @ts-nocheck
/*import File from "./db.js";

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
}*/

//función hecha con Cluade
// @ts-nocheck
import File from "./db.js";
import fs from "fs/promises";
import path from "path";

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

    // Definir la ruta donde se guardará el archivo
    const publicPath = path.join(process.cwd(), "public");
    const filePath = path.join(publicPath, "esfera.glb");

    // Guardar el buffer como un archivo
    await fs.writeFile(filePath, buffer);

    console.log(`Archivo guardado en ${filePath}`);

    // Devolver una respuesta indicando que el archivo se ha guardado
    return new Response(
      JSON.stringify({
        message: "Archivo guardado como esfera.glb en la carpeta public",
      }),
      {
        status: 200,
      },
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Error al procesar el archivo" }),
      {
        status: 500,
      },
    );
  }
}

/*export async function POST({ request }) {
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
}*/

//hecho con Claude
export async function POST({ request }) {
  try {
    // Obtener el archivo del cuerpo de la solicitud
    const file = await request.arrayBuffer();
    let buffer = Buffer.from(file);

    // Buscar el índice del encabezado
    const headerEnd = buffer.indexOf("\n\n");

    if (headerEnd !== -1) {
      // Eliminar el encabezado del buffer
      buffer = buffer.slice(headerEnd + 2);
    }

    // Eliminar todos los archivos existentes en la colección
    await File.deleteMany({});

    // Crear una nueva instancia del modelo File
    const fileInstance = new File({
      file: buffer,
    });

    // Guardar el nuevo archivo en la base de datos
    await fileInstance.save();
    console.log("Nuevo archivo guardado en la base de datos");

    // Devolver la respuesta
    return new Response(
      JSON.stringify({
        message: "Archivo subido con éxito y reemplazado el anterior",
      }),
      {
        status: 200,
      },
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Error al procesar el archivo" }),
      {
        status: 500,
      },
    );
  }
}
