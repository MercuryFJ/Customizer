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

// Función para verificar si estamos en modo responsive
const isMobileView = () => window.innerWidth <= 480;

inputTitle.addEventListener("keyup", () => {
    title.textContent = inputTitle.value;
});

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

let draggedImage = null;

// Manejador de clicks para modo responsive
const handleImageClick = (event) => {
    if (!isMobileView()) return;
    
    targetImage = event.target;
    mainImg.src = targetImage.src;
    avatarImg.src = targetImage.src;
    inputRangeX.value = 0;
    inputRangeY.value = 0;
    shirtName();
};

// Configuración de eventos para imágenes
allImages.forEach(img => {
    // Evento de click para móvil
    img.addEventListener('click', handleImageClick);
    
    // Evento de drag para desktop
    img.addEventListener('dragstart', () => {
        if (isMobileView()) return;
        targetImage = img;
    });
});

// Eventos de drag and drop para desktop
shirtContainer.addEventListener('dragover', (event) => {
    if (isMobileView()) return;
    event.preventDefault();
});

shirtContainer.addEventListener('drop', (event) => {
    if (isMobileView()) return;
    if (targetImage != null) {
        mainImg.src = targetImage.src;
        avatarImg.src = targetImage.src;
        inputRangeX.value = 0;
        inputRangeY.value = 0;
        shirtName();
    }
});

function shirtName() {
    let str = targetImage.src.split("images/");
    str = str[1].split(".png");
    characterName.textContent = str[0];
    switch (str[0]) {
        case "mario":
            characterName.style = "color: #E0102F";
            title.style = "color: #E0102F";
            break;
        case "luigi":
            characterName.style = "color: #08A936";
            title.style = "color: #08A936";
            break;
        case "peach":
            characterName.style = "color: #F096BE";
            title.style = "color: #F096BE";
            break;
        case "estela":
            characterName.style = "color: #1DD4B7";
            title.style = "color: #1DD4B7";
            break;
        case "wario":
            characterName.style = "color: #F5DA0F";
            title.style = "color: #F5DA0F";
            break;
        case "waluigi":
            characterName.style = "color: #5D2E8E";
            title.style = "color: #5D2E8E";
            break;
        case "toad":
            characterName.style = "color: #FE3738";
            title.style = "color: #FE3738";
            break;
        case "toadette":
            characterName.style = "color: #F95FA9";
            title.style = "color: #F95FA9";
            break;
        case "daisy":
            characterName.style = "color: #EE830A";
            title.style = "color: #EE830A";
            break;
        case "yoshi":
            characterName.style = "color: #70B921";
            title.style = "color: #70B921";
            break;
        case "koopa":
            characterName.style = "color: #FFCD00";
            title.style = "color: #FFCD00";
            break;
        case "drybones":
            characterName.style = "color: #95A4AE";
            title.style = "color: #95A4AE";
            break;
    }
}

function updatePosition() {
    let x;
    switch (inputRangeX.value) {
        case "0":
            x = -80;
            break;
        case "25":
            x = -70;
            break;
        case "50":
            x = -60;
            break;
        case "75":
            x = -50;
            break;
        case "100":
            x = -40;
            break;
    }

    let y;
    switch (inputRangeY.value) {
        case "0":
            y = -150;
            break;
        case "25":
            y = -140;
            break;
        case "50":
            y = -130;
            break;
        case "75":
            y = -120;
            break;
        case "100":
            y = -110;
            break;
    }
    title.style.transform = `translate(${x}px, ${y}px)`;
}

inputRangeX.addEventListener('input', updatePosition);
inputRangeY.addEventListener('input', updatePosition);

// Añadir listener para cambios en el tamaño de la ventana
window.addEventListener('resize', () => {
    if (isMobileView()) {
        allImages.forEach(img => img.style.cursor = 'pointer');
    } else {
        allImages.forEach(img => img.style.cursor = 'grab');
    }
});