let checkoutPrice = document.querySelector("#checkoutPrice");
let checkoutPriceValue = 0;

function createElement(roll) {
    const template = document.querySelector("#cartTemplate");
    const clone = template.content.cloneNode(true);

    roll.element = clone.querySelector(".roll");

    const cartImage = clone.querySelector(".cartImage");
    const cartTitle = clone.querySelector(".cartTitle");
    const cartGlazing = clone.querySelector(".cartGlazing");
    const cartPackSize = clone.querySelector(".cartPackSize");
    const cartPrice = clone.querySelector(".cartPrice");
    let removeButton = clone.querySelector(".removeButton");

    cartImage.src = "../assets/products/" + roll.rollType + "-cinnamon-roll.jpg";
    cartTitle.innerText = roll.rollType + " Cinammon roll";
    cartGlazing.innerText = "Glazing: " + roll.rollGlazing;
    cartPackSize.innerText = "Pack Size: " + roll.packSize;
    cartPrice.innerText = roll.calculateTotal();

    cart.add(roll);

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

function retrieveFromLocalStorage(){
    const rollArrayString = localStorage.getItem("storedRolls");
    const rollArray = JSON.parse(rollArrayString);

    for (const rollData of rollArray){
        const roll = new Roll(
            rollData.rollType, 
            rollData.rollGlazing, 
            rollData.packSize, 
            rollData.basePrice
        );
        cart.add(roll);
    }

    for (const roll of cart) {
        const rollElement = createElement(roll);
        cartList.appendChild(rollElement); 
        checkoutPrice.innerText = checkoutPriceValue;
    }
}

if (localStorage.getItem('storedRolls') != null) {
    retrieveFromLocalStorage();
}