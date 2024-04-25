// Author: Dylan, John
document.addEventListener("DOMContentLoaded", function(e) {
    // Make sure the max date is today
    const inputLastCoffeeDate = document.getElementById("input-last-coffee-date");
    inputLastCoffeeDate.max = new Date().toISOString().split("T")[0];
});

function showOptions() {
    var optionSelected = document.getElementById("contact-option").value;
    var classesSection = document.getElementById("classesSection");
    var careersSection = document.getElementById("careersSection");
    var otherSection = document.getElementById("otherSection");

    // Hide all sections initially
    classesSection.style.display = "none";
    careersSection.style.display = "none";
    otherSection.style.display = "none";

    // Show the selected section
    if (optionSelected === "2") { // Classes
        classesSection.style.display = "block";
    } else if (optionSelected === "1") { // Careers
        careersSection.style.display = "block";
    } else if (optionSelected === "3") { // Other
        otherSection.style.display = "block";
    }
}

function Contact() {
    var optionSelected = document.getElementById("contact-option").value;
    var fieldsPopulated = true; // Checking all fields are populated
    var emailValid = true; // Checking user is submitting a valid email
    var yearsValid = true; // Checking if number of years is valid

    if (optionSelected === "1") { // Careers
        // Fields to be checked and used in alert
        var name = document.getElementById("careerName").value;
        var email = document.getElementById("careerEmail").value;
        var role = document.getElementById("role").value;
        var yearsExperience = document.getElementById("input-years-experience").value;
        var availability = document.getElementById("availability").value;

        // Checking if text fields are blank and that an option has been selected
        if (!name || !email || !availability || !role ) {
            fieldsPopulated = false;
        }

        // Check email is valid
        if (!email.includes('@')) {
            emailValid = false;
        }

        // Check if number of years is between 0 and 100
        if (isNaN(yearsExperience)) {
            yearsValid = false;
        } else {
            let numberYears = Number(yearsExperience);

            if (numberYears < 0 || numberYears > 100) {
                yearsValid = false;
            }
        }
    } 
        else if (optionSelected === "2") { // Classes
        // Fields to be checked and used in showPopup
        var month = document.getElementById("month").value;
        var level = document.getElementById("level").value;
        var name = document.getElementById("contactName").value;
        var email = document.getElementById("contactEmail").value;

        // Checking if text fields are blank and that an option has been selected
        if (!name || !email || !month || !level ) {
            fieldsPopulated = false;
        }

        // Check email is valid
        if (!email.includes('@')) {
            emailValid = false;
        }
    } 
        else if (optionSelected === "3") { // Other
        // Fields to be checked and used in showPopup
        var name = document.getElementById("otherName").value;
        var email = document.getElementById("otherEmail").value;
        var other = document.getElementById("other").value;

        // Check fields have data
        if (!name || !email || !other) {
            fieldsPopulated = false;
        }

        // Check email is valid
        if (!email.includes('@')) {
            emailValid = false;
        }
    }

    if (!fieldsPopulated) {
        showPopup("Please fill in all required fields.");
        return false; // Prevents form submission
    }

    if (!emailValid) {
        showPopup("Please enter a valid email address.");
        return false; // Prevents form submission
    }

    if (!yearsValid) {
        showPopup("Please enter a number between 0 and 100.");
        return false;
    }

    // Displaying specific showPopups based on the selected option
    if (optionSelected === "2") { // Classes
        showPopup("Thank you, " + name + "! We will contact you at " + email + ", about our " + level + " classes in " + month + ".");
    } else if (optionSelected === "1") { // Careers
        showPopup("Thank you, " + name + "! We will contact you at " + email + ", if we have any " + availability + " " + role + " openings.");
    } else if (optionSelected === "3") { // Other
        showPopup("Thank you, " + name + "! We will contact you at " + email + ", to answer your question.");
    }
}

function showPopup(message) {
    // This should look better as a modal
    console.log(message); // For debugging in VS Code with preview
    alert(message);
}