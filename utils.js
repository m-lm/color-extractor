function displayColors() {
    console.log("Display Colors");
}

function kMeans(k=3) {
    console.log("K Means Clustering");
}

function medianCut() {
    console.log("Median Cut");
}

function freqAnalysis() {
    console.log("Frequency Analysis");
}

function generateColors() {
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