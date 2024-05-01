
document.getElementById('uploadButton').addEventListener('click', uploadFile);

function uploadFile() {
    // Obtiene el archivo del input
    const fileInput = document.getElementById('fileUpload');
    alert("Hola")
    const file = fileInput.files[0];
    // Crea un FormData para enviar el archivo
    const formData = new FormData();
    formData.append('file', file);

    // Envía el archivo al servidor
    fetch('/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

export { uploadFile };

