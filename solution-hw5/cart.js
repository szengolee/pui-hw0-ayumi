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

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get("roll");

let information= Rolls[rollType]; // this is a dictionary , baseprice  Rolls ["basePrice"]


class Roll { //create a roll class to input rull objects
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.rollType = rollType;
        this.rollGlazing =  rollGlazing;
        this.packSize = packSize;
        this.basePrice = basePrice;
    }

    calculateTotal(){
        let totalPrice = (this.basePrice + glazingPrice[this.rollGlazing]) * this.packSize;
        return totalPrice;
    }
}


let glazingPrice = {
    "Original": 0,
    "Sugar milk": 0,
    "Vanilla milk": 0.5,
    "Double chocolate": 1.5
};

let cart = new Set();    
let Original = new Roll ("Original", "Sugar milk", 1, Rolls["Original"].basePrice);
let Walnut = new Roll ("Walnut", "Vanilla milk", 12, Rolls["Walnut"].basePrice );
let Raisin = new Roll ("Raisin", "Sugar milk", 3, Rolls["Raisin"].basePrice);
let Apple = new Roll ("Apple", "Sugar milk", 3, Rolls["Raisin"].basePrice);

cart.add(Original);
cart.add(Walnut);
cart.add(Raisin);
cart.add(Apple);

let checkoutPrice = document.querySelector("#checkoutPrice");
let checkoutPriceValue = 0;

function createElement(roll) {
    const template = document.querySelector("#cartTemplate");
    const clone = template.content.cloneNode(true);

    roll.element = clone.querySelector(".roll");
    console.log(roll.element);

    const cartImage = clone.querySelector(".cartImage");
    const cartTitle = clone.querySelector(".cartTitle");
    const cartGlazing = clone.querySelector(".cartGlazing");
    const cartPackSize = clone.querySelector(".cartPackSize");
    const cartPrice = clone.querySelector(".cartPrice");
    let removeButton = clone.querySelector(".removeButton");

    cartImage.src = "../assets/products/" + Rolls[roll.rollType].imageFile;
    cartTitle.innerText = roll.rollType + " Cinammon roll";
    cartGlazing.innerText = "Glazing: " + roll.rollGlazing;
    cartPackSize.innerText = "Pack Size: " + roll.packSize;
    cartPrice.innerText = roll.calculateTotal();

    removeButton.addEventListener ("click", () => {     

        roll.element.remove();

        cart.delete(roll);
        checkoutPriceValue -= roll.calculateTotal(); // Subtract the removed item's total from the checkoutPriceValue
        checkoutPrice.innerText = "$" + checkoutPriceValue.toFixed(2); // Update the displayed checkout price

    });

    checkoutPriceValue = checkoutPriceValue + roll.calculateTotal();
    return clone;
}

const cartList = document.querySelector("#cartList");

for (const roll of cart) {
    const rollElement = createElement(roll);
    cartList.appendChild(rollElement); 
    checkoutPrice.innerText = checkoutPriceValue;
}

