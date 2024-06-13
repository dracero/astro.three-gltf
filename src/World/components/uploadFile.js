document.getElementById("uploadButton").addEventListener("click", uploadFile);

function uploadFile() {
  // Obtiene el archivo del input
  const fileInput = document.getElementById("fileUpload");
  const file = fileInput.files[0];

  // Lee el archivo como un ArrayBuffer
  const reader = new FileReader();
  reader.onload = function (event) {
    // Envía el archivo al servidor
    fetch("/buildwith.json", {
      method: "POST",
      body: event.target.result,
      headers: {
        "Content-Type": "model/gltf-binary",
      },
    })
      .then((response) => response.text())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };
  reader.readAsArrayBuffer(file);
}

