// Load new image file for clicking on element 

let picShow;
let newElement;
let selectedFile;
let updatePic;

picShow = document.getElementById("newimagetoggle");
newElement = document.createElement("input");
newElement.setAttribute("type", "file");
newElement.setAttribute("accept", "image/*");

// Call click event on picture

picShow.addEventListener('click', function () {
    newElement.click();
});


// Replace image with selected image 
updatePic = function () {

    selectedFile = newElement.files[0]

    const reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        picShow.src = reader.result;
    }, false);

    if (selectedFile) {
        reader.readAsDataURL(selectedFile);
    }
};


// Update picture: Return function on newly selected picture 
newElement.onchange = updatePic;

