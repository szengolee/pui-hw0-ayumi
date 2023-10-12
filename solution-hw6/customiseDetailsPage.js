const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get("roll");

const parentHeaderText = document.querySelector("#detailHeaderText"); //change header text
parentHeaderText.innerText = rollType + " Cinnamon Roll";

const parentImage = document.querySelector("#detailImage");
parentImage.src = "../assets/products/" + rollType + "-cinnamon-roll.jpg";

let basePriceValue = document.querySelector("#price");
basePriceValue = Rolls[rollType].basePrice.toFixed(2); //update basePrice dynamically
const basePriceElement = document.querySelector("#price");
basePriceElement.innerText = "$ " + basePriceValue;

const glazingOptions = {"Keep original":0, "Sugar milk":0, "Vanilla milk":0.5, "Double chocolate":1.5};
const packOptions = {1:1,3:3,6:5,12:10};

const glazingOptionsArray = Object.entries(glazingOptions);
const packOptionsArray = Object.entries(packOptions);

const dropdownParentGlazing = document.querySelector("#dropdownParentGlazing");
const dropdownParentPack = document.querySelector("#dropdownParentPack");

const glazingDropdown = document.createElement("select");
glazingDropdown.setAttribute("id","glazingDropdown");

const packDropdown = document.createElement("select");
packDropdown.setAttribute("id","packDropdown");

dropdownParentGlazing.appendChild(glazingDropdown);
dropdownParentPack.appendChild(packDropdown);

for (let i = 0; i < glazingOptionsArray.length; i++){
    let glazingOption = document.createElement("option");
    glazingOption.value = glazingOptionsArray[i][0];
    glazingOption.text = glazingOptionsArray[i][0];
    glazingDropdown.appendChild(glazingOption);
}

for (let i = 0; i < packOptionsArray.length; i++){
    let packOption = document.createElement("option");
    packOption.value = packOptionsArray[i][0];
    packOption.text = packOptionsArray[i][0];
    packDropdown.appendChild(packOption);
}

function priceChange(){

    let glazingChoice = glazingDropdown.value;
    let packChoice = packDropdown.value;

    let glazingPrice = glazingOptions[glazingChoice];
    let packPrice = packOptions[packChoice];

    let price = document.querySelector("#price");
    parseFloat(price);
    let totalPrice = (parseFloat(basePriceValue) + glazingPrice) * packPrice;


    price.textContent = totalPrice.toFixed(2);
}

let addToCartBtn = document.querySelector("#addToCartBtn"); //after creating btn dom, save to local storage
addToCartBtn.addEventListener("click", function () {
    let glazingChoice = glazingDropdown.value;
    let packChoice = packDropdown.value;
    let roll = new Roll(rollType, glazingChoice, packChoice, parseFloat(basePriceValue));
    cart.add(roll);

    saveToLocalStorage();;
});


function saveToLocalStorage() {
    let glazingChoice = glazingDropdown.value;
    let packChoice = packDropdown.value;
    const rollArray = Array.from(cart).map(roll => ({
        rollType: roll.rollType,
        rollGlazing: roll.rollGlazing,
        packSize: roll.packSize,
        basePrice: roll.basePrice
    }));

    console.log(rollArray);

    const rollArrayString = JSON.stringify(rollArray);

    localStorage.setItem("storedRolls", rollArrayString);
}

