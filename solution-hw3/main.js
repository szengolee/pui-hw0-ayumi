const glazingOptions = {"Keep original":0, "Sugar milk":0, "Vanilla milk":0.5, "Double chocolate":1.5};
const packOptions = {1:1,3:3,6:5,12:10};

const glazingOptionsArray = Object.entries(glazingOptions);
const packOptionsArray = Object.entries(packOptions);

// Object.keys(glazingOptions);
// console.log(Object.keys(glazingOptions));

// const glazingOptionskey = 
// for (i=0; i < )

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
  
    const basePrice = 2.49;
  
    let glazingPrice = glazingOptions[glazingChoice];
    let packPrice = packOptions[packChoice];
  
    let totalPrice = (basePrice + glazingPrice) * packPrice;
  
    let price = document.querySelector("#price");
    parseFloat(price);

    price.textContent = totalPrice.toFixed(2);
}



