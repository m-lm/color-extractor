function displayColors(colors, k=5) {
    // Display colors after user generation
    const display = document.getElementById("colors"); 
    if (display.childElementCount != k) {
        clearColors();
    }
    if (display.childElementCount <= 0) {
        for (let i = 0; i < k; i++) {
            const color = colors[i][0];
            const colorBox = document.createElement("div");
            display.style.opacity = 100;
            colorBox.id = "colorsChildren";
            colorBox.style.backgroundColor = color;
            display.appendChild(colorBox);
            colorBox.addEventListener("click", () => clipboardCopy(color, colorBox));
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

function clipboardCopy(color, colorBox) {
    // Copy clicked colors from displayed color boxes
    navigator.clipboard.writeText(color);
    const tooltip = document.createElement("div");
    tooltip.textContent = "Color copied!";
    tooltip.classList.add("tooltip");
    tooltip.style.top = `${colorBox.offsetTop - 30}px`;
    tooltip.style.left = `${colorBox.offsetLeft + colorBox.offsetWidth / 2 - tooltip.offsetWidth / 2}px`;
    document.body.appendChild(tooltip);
    setTimeout(() => {tooltip.style.opacity = 0;}, 1000);
    tooltip.addEventListener("transitionend", () => {tooltip.remove();});
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
    const pixels = image.data;
    const colors = {};
    const stepConstant = 256 / k;
    const quantize = (value, step=stepConstant) => Math.round(Math.floor(value / step) * step);

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

    if (!display.src || display.src === "") {
        console.log("Please upload an image first");
        return;
    }

    const imgObject = new Image();
    imgObject.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = imgObject.width, canvas.height = imgObject.height;
        ctx.drawImage(imgObject, 0, 0);
        const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
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
                console.log("Switch error");
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
            display.style.opacity = 100;
            clearColors();
            generateColors();
        };
        reader.readAsDataURL(file);
    }
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
document.getElementById("quantity").addEventListener("input", checkQuantity);
document.getElementById("quantity").addEventListener("change", generateColors);
document.getElementById("method-choice").addEventListener("change", generateColors);