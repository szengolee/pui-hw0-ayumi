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

let glazingPrice = {
    "Original": 0,
    "Sugar milk": 0,
    "Vanilla milk": 0.5,
    "Double chocolate": 1.5
};

let cart = new Set();
class Roll { //create a roll class to input rull objects
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.rollType = rollType;
        this.rollGlazing = rollGlazing;
        this.packSize = packSize;
        this.basePrice = basePrice;
    }

    calculateTotal() {
        let totalPrice = (this.basePrice + glazingPrice[this.rollGlazing]) * this.packSize;
        return totalPrice;
    }
}
