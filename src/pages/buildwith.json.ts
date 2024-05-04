// @ts-nocheck
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
}