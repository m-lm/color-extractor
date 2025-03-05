function displayColors() {
    // Display colors after user generation
    console.log("Display Colors");
}

function kMeans(k=3) {
    // Color extraction using K-Means Clustering
    console.log("K Means Clustering");
}

function medianCut() {
    // Color extraction using Median Cut
    console.log("Median Cut");
}

function freqAnalysis() {
    // Color extraction using Frequency Analysis
    console.log("Frequency Analysis");
}

function generateColors() {
    // Function that calls methods for color extraction accordingly
    const choice = document.getElementById("method-choice").value;
    switch (choice) {
        case "K-Means":
            kMeans();
            break;
        case "Median Cut":
            medianCut();
            break;
        case "Frequency":
            freqAnalysis();
            break;
        default:
            kMeans();
    }
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