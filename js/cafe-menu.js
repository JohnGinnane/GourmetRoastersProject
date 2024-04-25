// Author: John

let modalAllergenInfo;

document.addEventListener("DOMContentLoaded", function() {
    //menu-container
    let listItems = document.querySelectorAll("#menu-container div ul li");

    let i = 0;
    for (let item of listItems) {
        if (i % 2 == 0) {
            item.style.background = "#EFEFEF";
        }
        i++;
    }

    // Attach event handler for when the super script is clicked
    let allergenSupers = document.querySelectorAll(".sup-allergen");
    for (let allergenSuper of allergenSupers) {
        allergenSuper.addEventListener("click", function() {
            allergenClick(allergenSuper);
        });
    }

    // Add event for when the modal is opened
    modalAllergenInfo = document.getElementById('modal-allergen-info');
});

function allergenClick(sender) {
    if (!modalAllergenInfo) { return; }
    if (!sender) { return; }

    // We're expecting the sender.innerHTML to
    // contain text like "(1, 2, 3)"
    // We need to extract these numbers out
    let strAllergenNumbers = sender.innerHTML;

    if (!strAllergenNumbers) { return; }
    if (strAllergenNumbers.trim() == "") { return; }

    // Replace all non-numerics with a space
    let listAllergenNumbers = strAllergenNumbers.replace(/[^0-9]/g, " ").split(" ");
    
    // Iterate over the list and delete empty strings
    for (let i = listAllergenNumbers.length; i >= 0; i--) {
        if (listAllergenNumbers[i] == "") {
            listAllergenNumbers.splice(i, 1);
        }
    }

    // Open the modal and highlight relevant items
    openModalAndHighlight(listAllergenNumbers);
}

function openModalAndHighlight(targets) {
    let modal = new bootstrap.Modal(modalAllergenInfo, {});
    let divAllergens = document.querySelectorAll(".div-allergen");

    for (allergen of divAllergens) {
        let id = getIndexFromElement(allergen);
        let isHighlighted = false;

        if (targets) {
            isHighlighted = (targets.includes(id.toString()));
        }

        let background = getAllergenRowColour(id, isHighlighted);
        allergen.style.background = background;
    }

    modal.show();
}

function getAllergenRowColour(row, isHighlighted) {
    if (row % 2 == 1) {
        if (isHighlighted) {
            return "#C9A45A";
        } else {
            return "#FFFFFF";
        }
    } else {
        if (isHighlighted) {
            return "#B9944A";
        } else {
            return "#EFEFEF";
        }
    }
}

function getIndexFromElement(element) {
    // Extract the index from the ID
    // e.g. "result-1" -> 1
    let components = element.id.split("-");
    return Number(components[components.length-1]);
}
