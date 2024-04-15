function popQuizSubmit() {

    // Retrieve the answers from all radio buttons
    let q1answer = getRadioGroupSelection("pop-quiz-question-1").toLowerCase();
    let q2answer = getRadioGroupSelection("pop-quiz-question-2").toLowerCase();
    let q3answer = getRadioGroupSelection("pop-quiz-question-3").toLowerCase();
    let q4answer = getRadioGroupSelection("pop-quiz-question-4").toLowerCase();

    console.log(q1answer);
    console.log(q2answer);
    console.log(q3answer);
    console.log(q4answer);

    if (q1answer == "morocco" &&
        q2answer == "1991" &&
        q3answer == "classes" &&
        q4answer == "spearmint") {
        alert("Correct!");
    } else {
        alert("Incorrect!");
    }
}

function getRadioGroupSelection(name) {
    let radioButtons = document.getElementsByName(name);

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return radioButtons[i].value;
        }
    }

    return "";
}