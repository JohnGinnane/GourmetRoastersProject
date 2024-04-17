let modalQuizResult;

document.addEventListener("DOMContentLoaded", function() {
    modalQuizResult = document.getElementById('modal-about-us-quiz-result');
    //openQuizResults();
});

function popQuizSubmit() {
    // Retrieve the answers from all radio buttons
    let q1answer = getRadioGroupSelection("pop-quiz-question-1").toLowerCase();
    let q2answer = getRadioGroupSelection("pop-quiz-question-2").toLowerCase();
    let q3answer = getRadioGroupSelection("pop-quiz-question-3").toLowerCase();
    let q4answer = getRadioGroupSelection("pop-quiz-question-4").toLowerCase();
    
    let score = 0;

    if (q1answer == "morocco")   { score++; }
    if (q2answer == "1991")      { score++; }
    if (q3answer == "classes")   { score++; }
    if (q4answer == "spearmint") { score++; }
    
    openQuizResults(score);
}

function openQuizResults(score) {
    // Set the right text in the modal
    let strResult = "You scored " + score + " out of 4!<br>";

    switch (score) {
        case 4:
            strResult += "Congratulations!";
            break;
        case 3:
            strResult += "Great job!";
            break;
        case 2:
            strResult += "Nice work";
            break;
        case 1:
            strResult += "Good try";
            break;
        case 0:
            strResult += "Better luck next time"
            break;
    }

    let spanCoffeeCupLabel = document.getElementById("span-coffee-cup-label");
    spanCoffeeCupLabel.innerHTML = strResult;

    let modal = new bootstrap.Modal(modalQuizResult, {});
    modal.show();
}

// Extract the value of the radio button using the group name
function getRadioGroupSelection(name) {
    let radioButtons = document.getElementsByName(name);

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return radioButtons[i].value;
        }
    }

    return "";
}