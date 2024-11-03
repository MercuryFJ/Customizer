// --- CONSTANTS ---
const title = document.getElementById("shirt-title");
const inputTitle = document.getElementById("title");
const shirtRadios = document.querySelectorAll("input[type='radio'][name='color']");
const shirtImg = document.getElementById("shirt-img");
const characterName = document.querySelector("h3");
const allImages = document.querySelectorAll("img[draggable='true']");
const shirtContainer = document.getElementById('shirt-container');
const mainImg = document.getElementById("main-img");
const avatarImg = document.getElementById("avatar-img");
const inputRangeX = document.getElementById("axis-x");
const inputRangeY = document.getElementById("axis-y");
// Character's colors. This will assign the text color on the shirt according to the character.
const characterColors = {
    mario: "#E0102F", luigi: "#08A936", peach: "#F096BE",
    estela: "#1DD4B7", wario: "#F5DA0F", waluigi: "#5D2E8E",
    toad: "#FE3738", toadette: "#F95FA9", daisy: "#EE830A",
    yoshi: "#70B921", koopa: "#FFCD00", drybones: "#95A4AE"
};

// --- EVENTS ---
// Update the title of the T-shirt.
inputTitle.addEventListener("keyup", () => {
    title.textContent = inputTitle.value;
});

// These two events will update the position based on the value of the range input.
inputRangeX.addEventListener('input', updatePosition);
inputRangeY.addEventListener('input', updatePosition);

// Drag and drop events for desktop.
shirtContainer.addEventListener('dragover', (event) => {
    if (!isMobileView()) event.preventDefault();
});

shirtContainer.addEventListener('drop', () => {
    if (targetImage && !isMobileView()) updateImages(targetImage.src);
});

// Change the shirt color and text based on the selected radio button.
shirtRadios.forEach(radio => {
    radio.addEventListener("change", () => {
        if (radio.id === "white") {
            shirtImg.src = "./src/images/t-shirt-white.png";
            characterName.classList.replace("white", "black");
            title.classList.replace("white", "black");
        } else if (radio.id === "black") {
            shirtImg.src = "./src/images/t-shirt-black.png";
            characterName.classList.replace("black", "white");
            title.classList.replace("black", "white");
        }
    });
});

let targetImage = null;

// Event setup for images (click and dragstart).
allImages.forEach(img => {
    img.addEventListener('click', handleImageClick);
    
    img.addEventListener('dragstart', () => {
        if (!isMobileView()) {
            targetImage = img;
        }
    });
});

// --- FUNCTIONS ---
// Function to update the main image and avatar.
function updateImages(src) {
    mainImg.src = src;
    avatarImg.src = src;
    updateCharacterName();
}

// Function to update the character's name and color.
function updateCharacterName() {
    const name = targetImage.src.split("images/")[1].split(".png")[0];
    characterName.textContent = name;
    const color = characterColors[name];
    characterName.style.color = color;
    title.style.color = color;
}

// Update title position based on the input range.
function updatePosition() {
    const x = -80 + inputRangeX.value * 0.4;
    const y = -150 + inputRangeY.value * 0.4;
    title.style.transform = `translate(${x}px, ${y}px)`;
}

// This function verified is the window has the responsive size.
function isMobileView() {
    return window.innerWidth <= 480;
}

// Function for the click in an image of responsive mode
function handleImageClick(event) {
    if (isMobileView()) {
        targetImage = event.target;
        updateImages(targetImage.src);
    }
}