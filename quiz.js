fetch('answers.json')
    .then(response => response.json())
    .then(data => {
        const questions = data.questions;
        const quizContainer = document.getElementById('questions');

        questions.forEach((question, index) => {
            const options = question.answers.map(answer => `
                <input type="radio" name="question${index}" value="${answer.answer}">
                <label>${answer.answer}</label><br>
            `).join('');

            const questionHtml = `
                <div class="question-container">
                    <p>${index + 1}. ${question.question}</p>
                    ${options}
                </div>
            `;

            quizContainer.innerHTML += questionHtml;
        });

        document.getElementById('submit-btn').addEventListener('click', () => {
            const questions = document.querySelectorAll('.question-container');
            let score = 0;

            questions.forEach((question, index) => {
                const selectedOption = question.querySelector(`input[name="question${index}"]:checked`);

                if (selectedOption) {
                    const userAnswer = selectedOption.value;
                    const correctAnswer = data.questions[index].answers.find(answer => answer.isCorrect).answer;

                    if (userAnswer === correctAnswer) {
                        score++;
                        question.style.color = 'green';
                    } else {
                        question.style.color = 'red';
                    }
                }
            });

            const totalQuestions = questions.length;
            const resultContainer = document.getElementById('result');
            resultContainer.innerHTML = `You scored ${score} out of ${totalQuestions} questions.`;
        });
    });
