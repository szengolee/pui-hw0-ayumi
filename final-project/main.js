
let flipbook = $('.flipbook');

function addPage(book, comment, sticker) {

    // reference from the turn.js page adding function
    let element = $('<div />', {
        'class': 'page',
        'html': `<p class="comment">${comment}</p>
                 <img src="stickers/${sticker}.png" alt="${sticker}" width="150" class="sticker">`
    });

    if (book.turn('addPage', element)) {
        console.log('Page added successfully:');

        // Append the element to the class flipbook
        $('.flipbook').append(element);
    } else {
        console.error('Failed to add page. Check the "turn" method and the initialization of the book object.');
    }
}


function loadPage(page, pageElement) {

    pageElement.find('.loader').remove();
}

function loadApp() {

    loadFromLocalStorage();

    //reference from the turn.js library functions
    flipbook.turn({
        // Width
        width: 922,

        // Height
        height: 600,

        // Elevation
        elevation: 50,

        // Enable gradients
        gradients: true,

        // Auto center this flipbook
        autoCenter: true
    });

    let submitBtn = document.querySelector("#submit");

submitBtn.addEventListener("click",function() {
    let newComment = document.querySelector("#new-comment").value;
    let newSticker;
    let selectedSticker = document.getElementsByName("sticker-set");

    for (let i = 0; i < selectedSticker.length; i++) {
        if (selectedSticker[i].checked) {
            newSticker = selectedSticker[i].value;
        }
    }

    if (newComment && newSticker) {
        // Add new page with dynamic content
        addPage(flipbook, newComment, newSticker);
        saveToLocalStorage(newComment, newSticker);
        alert("Comment added successfully! Flip to the last page to see your comment.");
    } else {
        alert("Please provide a comment and select a sticker.");
    }
});
}

function saveToLocalStorage(comment, sticker) {
    console.log('Saving to local storage:', comment, sticker);

    let storedData = JSON.parse(localStorage.getItem('userComments')) || [];
    storedData.push({ comment, sticker });

    localStorage.setItem('userComments', JSON.stringify(storedData));

}

function loadFromLocalStorage() {
    let storedData = JSON.parse(localStorage.getItem('userComments')) || [];

    console.log('Loaded data from local storage:', storedData);
    storedData.forEach(entry => {
        addPage(flipbook, entry.comment, entry.sticker);
    });
}

loadApp();