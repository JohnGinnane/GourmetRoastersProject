// Author: John

let modalQuizResult;

// Pop-Quiz Answers
const popQuizAnswers = {
    "pop-quiz-question-1": "Morocco",
    "pop-quiz-question-2": "1991",
    "pop-quiz-question-3": "Offer classes",
    "pop-quiz-question-4": "Spearmint",
    "pop-quiz-question-5": "Fair Trade",
    "pop-quiz-question-6": "Joe and Jane"};

const totalQuestions = 4;

document.addEventListener("DOMContentLoaded", function() {
    modalQuizResult = document.getElementById('modal-about-us-quiz-result');

    // First get all questions available
    let popQuizQuestions = document.getElementsByClassName("pop-quiz-questions");
    let arrayQuestions = new Array();

    // Copy them to an array and make them invisible
    for (let question of popQuizQuestions) {
        arrayQuestions.push(question.outerHTML);
    }

    // Now until we only have 4 items left, 
    // randomly pick ones and remove them
    while (arrayQuestions.length > totalQuestions) {
        let randomIndex = Math.floor(Math.random() * arrayQuestions.length);
        arrayQuestions.splice(randomIndex, 1);
    }

    // Go back over remaining elements and add them to the pop quiz section
    const popQuizContainer = document.getElementById("pop-quiz-container");
    popQuizContainer.innerHTML = "";

    for (let i = 0; i < arrayQuestions.length; i++) {
        popQuizContainer.innerHTML += arrayQuestions[i];
    }

    // Finally add event to the pop quiz radio buttons
    // We have to do this AFTER changing the HTML
    // Only if all four are filled in will we enable submit button
    let radioButtons = this.getElementsByClassName("pop-quiz-radio");
    
    for (let button of radioButtons) {
        button.addEventListener("click", function() {
            radioButton_OnClick(button);
        });
    }
});

function getAnswers() {
    let groupNames = new Array();

    // Get all radio buttons for the pop quiz
    let radioButtons = document.getElementsByClassName("pop-quiz-radio");

    // Then put the (distinct) names into a list
    for (let button of radioButtons) {
        if (!groupNames.includes(button.name)) {
            groupNames.push(button.name);
        }
    }

    // Next go over these groups and get answers (if any)
    let answers = [];

    for (let group of groupNames) {
        answers.push({"name": group, "answer": getRadioGroupSelection(group).toLowerCase()});
    }

    return answers;
}

function radioButton_OnClick(sender) {
    // Check if all answers are filled in
    let answers = getAnswers();
    let submitEnabled = true;

    // If any answer is left blank then do nothing
    for (let answer of answers) {
        if (answer.answer === "") {
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

    // console.log(answers);
    // console.log(popQuizAnswers);

    // If any answer is left blank then do nothing
    for (let answer of answers) {
        if (answer.answer == "") { return ; }

        // Check if the submitted answer is correct
        if (answer.answer.toLowerCase() === popQuizAnswers[answer.name].toLowerCase()) {
            score++;
        }
    }
    
    openQuizResults(score);
}

function openQuizResults(score) {
    // Set the right text in the modal
    let strResult = "You scored " + score + " out of " + totalQuestions + "!<br>";
    let scorePercent = score / totalQuestions;
    console.log(scorePercent);

    if (scorePercent >= 0.9) {
        strResult += "Congratulations!";
    } else if (scorePercent >= 0.6) {
        strResult += "Great job!";
    } else if (scorePercent >= 0.4) {
        strResult += "Nice work"
    } else if (scorePercent >= 0.1) {
        strResult += "Good try";
    } else {
        strResult += "Better luck next time";
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