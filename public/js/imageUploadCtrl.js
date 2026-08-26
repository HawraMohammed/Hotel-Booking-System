let selectedFiles = [];
const pictureInput = document.querySelector('input[name="pictures"]');

pictureInput.addEventListener("change", function () {

    for (const file of this.files) {
        selectedFiles.push(file);
    }


    const dataTransfer = new DataTransfer();

    for (const file of selectedFiles) {
        dataTransfer.items.add(file);
    }

    pictureInput.files = dataTransfer.files;

});
