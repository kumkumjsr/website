const data = JSON.parse(localStorage.getItem('quizResults'));
if (!data) {
    window.location.href = "roadmap.html";
} else {
    const { questions, userAnswers, score } = data;
    const resultsContainer = document.getElementById('results-container');

    resultsContainer.innerHTML = `<h2>Final Review: ${score} / ${questions.length}</h2>`;

    questions.forEach(({ question, correct_answer }, index) => {
        const userAns = userAnswers[index];
        const isCorrect = userAns === correct_answer;
        resultsContainer.innerHTML += `
            <div class="question-card">
                <h3>Q${index+1}: ${question}</h3>
                <p style="color:${isCorrect ? 'green' : 'red'}">Your Answer: ${userAns || "Skipped"}</p>
                <p>Correct: ${correct_answer}</p>
            </div>`;
    });
}

document.getElementById('continueBtn').addEventListener('click', () => {
    localStorage.setItem('roadmapStep', 6);
    window.location.href = "roadmap.html";
});