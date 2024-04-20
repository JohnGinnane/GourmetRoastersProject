 function startGame() {
            document.getElementById('gameQuestions').style.display = 'block';
        }

        function checkAnswers() {
            var answer1 = document.getElementById('answer1').value.toLowerCase();
            var answer2 = document.getElementById('answer2').value.toLowerCase();
            var answer3 = document.getElementById('answer3').value.toLowerCase();

            var correctAnswers = 0;

            if (answer1 === 'morocco') {
                correctAnswers++;
            }
            if (answer2 === 'no') {
                correctAnswers++;
            }
            if (answer3 === 'brazil') {
                correctAnswers++;
            }

            if (correctAnswers === 3) {
                document.getElementById('gameResult').innerHTML = 'Congratulations! You got all the answers right.';
                generateRandomString();
            } else {
                document.getElementById('gameResult').innerHTML = 'Sorry, you got some answers wrong. Try again!';
            }
        }

        function generateRandomString() {
            var randomString = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < 5; i++) {
                randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            alert('Your Discount Code is: ' + randomString);
        }