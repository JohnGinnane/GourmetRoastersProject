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
});