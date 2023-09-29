const Rolls = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "original-cinnamon-roll.jpg"
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "apple-cinnamon-roll.jpg"
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "raisin-cinnamon-roll.jpg"
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "walnut-cinnamon-roll.jpg"
    },
    "Double-Chocolate": {
        "basePrice": 3.99,
        "imageFile": "double-chocolate-cinnamon-roll.jpg"
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "strawberry-cinnamon-roll.jpg"
    }    
};


let cart = [];
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get("roll");

let information= Rolls[rollType]; // this is a dictionary , baseprice  Rolls ["basePrice"]

const parentHeaderText = document.querySelector("#detailHeaderText"); //change header text
parentHeaderText.innerText = rollType + " Cinnamon Roll"; 

const parentImage = document.querySelector("#detailImage");
parentImage.src = "./assets/" + rollType + "-cinnamon-roll" + ".jpg";

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

glazingDropdown.addEventListener("change", priceChange);
packDropdown.addEventListener("change", priceChange);

function priceChange(){
    let glazingChoice = glazingDropdown.value;
    let packChoice = packDropdown.value;
  
    let glazingPrice = glazingOptions[glazingChoice];
    let packPrice = packOptions[packChoice];
  
    let totalPrice = (basePriceValue + glazingPrice) * packPrice;
  
    let price = document.querySelector("#price");
    parseFloat(price);

    price.textContent = totalPrice.toFixed(2);
}

let addToCartBtn = document.querySelector("#addToCartBtn");
addToCartBtn.addEventListener("click", function(){
    let glazingChoice = glazingDropdown.value;
    let packChoice = packDropdown.value;
    let roll = new Roll(rollType, glazingChoice, packChoice, parseFloat(basePriceValue));
    cart.push(roll);
    console.log(cart);
});

