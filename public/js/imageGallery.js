const mainImage = document.body.querySelector(".main-image img");
const pictures = document.body.querySelectorAll(".thumbnail-picture img");
let currentImage = 0;
function showImage() {
    mainImage.src = pictures[currentImage].src;
}
function nextImage() {
    currentImage++;
    if (currentImage >= pictures.length)
        currentImage = 0;
    showImage();
}
function previousImage() {
    currentImage--;
    if (currentImage < 0)
        currentImage = pictures.length - 1;
    showImage();
}
