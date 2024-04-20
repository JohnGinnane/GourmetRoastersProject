let modalQuizResult;

document.addEventListener("DOMContentLoaded", function() {
    modalQuizResult = document.getElementById('modal-about-us-quiz-result');
    
    // Added event to the pop quiz radio buttons
    // Only if all four are filled in will we enable submit button
    let radioButtons = this.getElementsByClassName("pop-quiz-radio");
    
    for (let button of radioButtons) {
        button.addEventListener("click", function() {
            radioButton_OnClick(button);
        });
    }

    radioButton_OnClick(null);
});

function getAnswers() {
    let answers = [];

    answers[0] = getRadioGroupSelection("pop-quiz-question-1").toLowerCase();
    answers[1] = getRadioGroupSelection("pop-quiz-question-2").toLowerCase();
    answers[2] = getRadioGroupSelection("pop-quiz-question-3").toLowerCase();
    answers[3] = getRadioGroupSelection("pop-quiz-question-4").toLowerCase();

    return answers;
}

function radioButton_OnClick(sender) {
    // Check if all answers are filled in
    let answers = getAnswers();
    let submitEnabled = true;

    // If any answer is left blank then do nothing
    for (let answer of answers) {
        if (answer == "") {
            submitEnabled = false;
            break;
        }
    }
   
    // Else make the submit button visible
    document.getElementById("pop-quiz-submit").disabled = !submitEnabled;
}

function popQuizSubmit() {
    let score = 0;
    let answers = getAnswers();

    // If any answer is left blank then do nothing
    for (let answer of answers) {
        if (answer == "") { return ; }
    }
    
    if (answers[0] == "morocco")   { score++; }
    if (answers[1] == "1991")      { score++; }
    if (answers[2] == "classes")   { score++; }
    if (answers[3] == "spearmint") { score++; }
    
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

    // Set the right message on the coffee cup label
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