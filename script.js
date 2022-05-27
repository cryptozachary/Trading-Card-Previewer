//select elements to modify and declare variables

//NFT Input and storage of pictures 
const prevbtn = document.querySelector("#prev-btn");
const nextbtn = document.querySelector("#next-btn");
let cardName = document.querySelector("#name");
let cardDescription = document.querySelector("#description");
let cardPrice = document.querySelector(".eth");
let cardTime = document.querySelector("#time2");
let cardCreator = document.querySelector("span");
let deck;
let picArray = [];
let picArray3 = [];
let card;


// Form input 
let formSubmit = document.querySelector(".formsubmit");
let formName = document.querySelector("#form-name");
let formDescription = document.querySelector("#description2");
let formPrice = document.querySelector("#form-price");
let formTime = document.querySelector("#time-left");
let formCreator = document.querySelector("#creator-name");
let formNFTart = document.querySelector("#nft-art")


// To select and read nft and creator image filoes
let picShow = document.getElementById("ntoggle");
let picShow3 = document.getElementById("ctoggle");

let picChange = document.querySelector(".nft-card-image")
let picChange3 = document.querySelector("#creator-pic")

let newElement = document.createElement("input");
newElement.setAttribute("type", "file");
newElement.setAttribute("accept", "image/*");

let newElement3 = document.createElement("input");
newElement3.setAttribute("type", "file");
newElement3.setAttribute("accept", "image/*");

// Landing Cover page for app
const topover = document.querySelector(".card-overlay");
const overlayTitle = document.querySelector(".card-overlay-title")

//NFT Card Class creator
class NFTcard {
    constructor(id, name, description, price, time, creator, image) {
        this.id = id
        this.name = name
        this.description = description
        this.price = price
        this.time = time
        this.creator = creator
        this.imageID = image
    }
};

// create some new cards

let equilibrium = new NFTcard(0, "Equilibrium #3429", "Our Equilibirum collection promotes balance and calm.", "0.394eth", "3 Days left", "Jules Wyvern", "images/image-equilibrium.jpg");

let solana = new NFTcard(1, "Solana #4454", "Extremely fast and reliable!", "0.363eth", "32 Days left", "Anatoly Yakovenko'", "images/Solana.png");

let avalanche = new NFTcard(2, "Avalanche #5678", "Extremely cheap and eco friendly!", "1.394eth", "2 Days left", "Mike Tyson", "images/avalanche.png");

let algorand = new NFTcard(3, "Algorand #4586", " Extremely scalable and secure!", "11.394eth", "21 Days left", "Kanye West", "images/algorand.png");

// set starting card
let currentCard = 0;

// create deck to store nft Card creations
deck = [equilibrium];

// load initial card 
window.addEventListener("DOMContentLoaded", function () {
    switchCard(currentCard);
    activateToggles()
    console.log(currentCard)
});


console.log(deck)

// Create new NFT and change NFT Image from user input 
let createNewNFT = function () {

    // retrieve user nft data and place in new nft card object
    let newNftName = formName.value

    newNftName = new NFTcard(`${deck.length}`, `${formName.value}`, `${formDescription.value}`, `${formPrice.value}eth`, `${formTime.value}`, `${formCreator.value}`, `${deck.length}`);

    deck.push(newNftName);
    currentCard++
    console.log(currentCard);
    console.log(deck);

    //Upates
    updatePic();
    updatePic3();
    clearForm();
    picShow.style.pointerEvents = "auto"
    picShow3.style.pointerEvents = "auto"
    switchCard(currentCard);
};

// Open file dialog box by clicking on NFT Art
picShow.addEventListener('click', function () {
    newElement.click();
});

// Open file dialog box by clicking on Crreator Art
picShow3.addEventListener('click', function () {
    newElement3.click();
});

// From submit button to create NFT 
formSubmit.onclick = function () {
    if (newElement.onchange && newElement3.onchange) {
        createNewNFT();
    }
    else {
        formSubmit.textContent = "Choose NFT ART and CREATOR ART"
    }
};


// Update new selected picture for NFT 
function updatePic() {

    let selectedFile = newElement.files[0]
    let reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        picChange.src = reader.result;
        let storedPic = reader.result
        picArray.push(storedPic)
        console.log(picArray)
        console.log(reader.result)
    }, false);

    if (selectedFile) {
        reader.readAsDataURL(selectedFile);
    }

    if (picArray[currentCard] == reader.result) {

        picArray = [];
    }

}

// Updatee label when image is loaded for NFT
newElement.onchange = function () {
    picShow.style.backgroundColor = "cyan"
    picShow.textContent = "NFT Loaded"
    picShow.classList.remove("hovertoggle")
    picShow.style.pointerEvents = "none"
}

// Update new selected picture for Creator Art 
function updatePic3() {

    let selectedFile3 = newElement3.files[0]
    let reader3 = new FileReader();

    reader3.addEventListener("load", function () {
        // convert image file to base64 string
        picChange3.src = reader3.result;
        let storedPic3 = reader3.result
        picArray3.push(storedPic3)
        console.log(picArray3)
    }, false);

    if (selectedFile3) {
        reader3.readAsDataURL(selectedFile3);
    }

    if (picArray3[currentCard] == reader3.result) {
        picArray3 = [];
    }
}

// Updatee label when image is loaded for Creator Art
newElement3.onchange = function () {
    picShow3.style.backgroundColor = "cyan"
    picShow3.textContent = "Creator Loaded"
    picShow3.classList.remove("hovertoggle")
    picShow3.style.pointerEvents = "none"
}

// Switch to current card
function switchCard() {

    if (deck.length >= 0) {
        card = deck[currentCard];
        cardName.textContent = card.name;
        cardDescription.textContent = card.description;
        cardPrice.textContent = card.price;
        cardTime.textContent = card.time;
        cardCreator.textContent = card.creator;
        picChange.src = picArray[currentCard - 1] ?? card.imageID
        picChange3.src = picArray3[currentCard - 1] ?? "images/image-avatar.png"
        console.log(currentCard)
    }
    else {
        console.log("WTF")
    }
}

//Next button switch card 
nextbtn.addEventListener('click', function () {
    currentCard++;
    if (currentCard > deck.length - 1) {
        currentCard = 0
    };
    switchCard(currentCard);
})

//Prev button switch card 
prevbtn.addEventListener('click', function () {
    currentCard--;
    if (currentCard < 0) {
        currentCard = deck.length - 1;
    }
    switchCard(currentCard)
})

//---------------------------------------------------------------------------------------------
// Dom Menu interaction

const openButton = document.querySelector("#plus");
const closeButton = document.querySelector(".closeBtn")
const modalOverlay = document.querySelector(".modal-overlay")
let modalStatus = 0

// add open-modal classlist to open modal
let openModal = function () {
    modalOverlay.classList.add("open-modal")
    modalStatus = 1
}
// remove open-modal classlist to open modal
let closeModal = function () {
    modalOverlay.classList.remove("open-modal")
    clearForm()
    picShow.style.pointerEvents = "auto"
    picShow3.style.pointerEvents = "auto"
    modalStatus = 0
}

// click events to open and close modal
openButton.addEventListener("click", function () {
    openModal()
});

closeButton.addEventListener("click", function () {
    closeModal()
});

//Clear contents of NFT form and reset labels 
function clearForm() {
    formName.value = ""
    formDescription.value = ""
    formPrice.value = ""
    formTime.value = ""
    formCreator.value = ""
    picShow.textContent = "NFT Art"
    picShow.style.backgroundColor = "lightgrey"
    picShow3.textContent = "Creator Art"
    picShow3.style.backgroundColor = "lightgrey"
    picShow.classList.add("hovertoggle")
    picShow3.classList.add("hovertoggle")
}

function activateToggles() {

    // Make labels clickable
    picShow.style.pointerEvents = "auto"
    picShow3.style.pointerEvents = "auto"

    // Reactivate label attributes
    picShow.classList.add("hovertoggle")
    picShow3.classList.add("hovertoggle")

    //Load Animated Door for app
    topover.classList.add("door")
    console.log(topover.getAttribute)
    topover.addEventListener("animationend", removeAni);
}

//overlayTitle.classList.add("door")

function removeAni() {
    topover.classList.remove("card-overlay")
}

let feet = "my feet hurt pretty bad right now"

let newfeet = feet.slice(3)

console.log(typeof feet)

console.log(newfeet)
//----------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------

// Load new image file for clicking on elemen

// Call click event on picture




// Replace image with selected image







// Update picture: Return function on newly selected picture

//newElement.onchange = updatePic;

