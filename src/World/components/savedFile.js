export function savedFile() {
  fetch("/buildwith.json", {
    method: "GET",
    body: event.target.result,
    headers: {
      "Content-Type": "model/gltf-binary",
    },
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));

  reader.readAsArrayBuffer(file);
}
