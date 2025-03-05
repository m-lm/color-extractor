function generateColors() {
    console.log("Generated");
}

function displayImage(event) {
    const file = event.target.files[0];
    const display = document.getElementById("img-display");
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            display.src = e.target.result;
            display.style.display = "block";
            display.style.opacity = 100;
        };
        reader.readAsDataURL(file);
    }
}

document.getElementById("img-upload").addEventListener("change", displayImage);
document.getElementById("generate").addEventListener("click", generateColors);
