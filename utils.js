function displayColors(colors, k=5) {
    // Display colors after user generation
    const numSamples = Math.min(k, colors.length);
    const display = document.getElementById("colors"); 
    if (display.childElementCount != numSamples) {
        clearColors();
    }
    if (display.childElementCount <= 0) {
        for (let i = 0; i < numSamples; i++) {
            const colorBox = document.createElement("div");
            colorBox.id = "colorsChildren";
            colorBox.style.backgroundColor = colors[i][0];
            display.style.opacity = 100;
            colorBox.style.width = "24px";
            colorBox.style.height = "24px";
            display.appendChild(colorBox);
        }
    }
}

function clearColors() {
    // Clear colors that are currently displayed
    const colors = document.getElementById("colors"); 
    while (colors.firstChild) {
        colors.removeChild(colors.firstChild);
    }
}

function kMeans(image, k=5) {
    // Color extraction using K-Means Clustering
    console.log("K Means Clustering");
}

function medianCut(image, k=5) {
    // Color extraction using Median Cut
    console.log("Median Cut");
}

function freqAnalysis(image, k=5) {
    // Color extraction using color frequencies
    k = Math.min(k, 10);
    const pixels = image.data;
    const colors = {};
    const stepConstant = 256 / k;
    const quantize = (value, step=stepConstant) => Math.floor(value / step) * step;

    for (let i = 0; i < pixels.length; i += 4) {
        let r = quantize(pixels[i]), g = quantize(pixels[i+1]), b = quantize(pixels[i+2]);
        const key = `rgb(${r}, ${g}, ${b})`;
        if (colors[key]) {
            colors[key]++;
        }
        else {
            colors[key] = 1;
        }
    }
    const sortedColors = Object.entries(colors).sort((value1, value2) => value2[1] - value1[1]);
    displayColors(sortedColors, k);
}

function generateColors() {
    // Function that calls methods for color extraction accordingly
    const choice = document.getElementById("method-choice").value;
    const k = parseInt(document.getElementById("quantity").value);
    const display = document.getElementById("img-display");
    const imgObject = new Image();
    imgObject.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = imgObject.width;
        canvas.height = imgObject.height;
        ctx.drawImage(imgObject, 0, 0);
        const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
        if (display.src) {
            switch (choice) {
                case "K-Means":
                    kMeans(img, k);
                    break;
                case "Median Cut":
                    medianCut(img, k);
                    break;
                case "Frequency":
                    freqAnalysis(img, k);
                    break;
                default:
                    console.log("Default case");
            }
        }
        else {
            console.log("Please upload an image first")
        }
    }
    imgObject.src = display.src;
}

function displayImage(event) {
    // Display image after user upload
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
    clearColors();
}

function checkQuantity() {
    // Ensure that quantity input does not exceed bounds
    const quantity = document.getElementById("quantity");
    if (parseInt(quantity.value) > 10) {
        quantity.value = 10;
    }
    else if (parseInt(quantity.value) < 1) {
        quantity.value = 1;
    }
}

document.getElementById("img-upload").addEventListener("change", displayImage);
document.getElementById("generate").addEventListener("click", generateColors);
document.getElementById("quantity").addEventListener("input", checkQuantity);