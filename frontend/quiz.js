const category = localStorage.getItem('category');
const difficulty = localStorage.getItem('difficulty');
let url = `https://opentdb.com/api.php?amount=15&type=multiple`;
if (category !== 'any') url += `&category=${category}`;
if (difficulty !== 'any') url += `&difficulty=${difficulty}`;

const quizContainer = document.getElementById('quiz-container');
const submitBtn = document.getElementById('submitBtn');
const timerDiv = document.getElementById('timer');

let questions = [];

fetch(url)
  .then(res => res.json())
  .then(data => {
    questions = data.results;
    quizContainer.innerHTML = "";
    questions.forEach(({ question, correct_answer, incorrect_answers }, index) => {
      const answers = [...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5);
      quizContainer.innerHTML += `
        <div class="question-card">
          <h3>Q${index+1}: ${question}</h3>
          ${answers.map(ans => `
            <label><input type="radio" name="q${index}" value="${ans}"> ${ans}</label><br>
          `).join('')}
        </div>`;
    });
  });

submitBtn.addEventListener('click', async () => {
    let score = 0;
    let userAnswers = {};

    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        const val = selected ? selected.value : null;
        userAnswers[index] = val;
        if (val === q.correct_answer) score++;
    });

    // Save to Database
    const username = localStorage.getItem('loggedInUser');
    if (username) {
        try {
            await fetch('http://localhost:3000/api/save-score', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, score })
            });
        } catch (err) { console.error("Server save failed", err); }
    }

    // Save for Result & Score pages
    localStorage.setItem('quizResults', JSON.stringify({ questions, userAnswers, score }));
    localStorage.setItem('roadmapStep', 5);
    window.location.href = "roadmap.html";
});











