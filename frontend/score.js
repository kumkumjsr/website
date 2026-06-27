document.addEventListener('DOMContentLoaded', () => {
    const quizData = JSON.parse(localStorage.getItem('quizResults'));
    const user = localStorage.getItem('loggedInUser') || "Student";
    
    if (!quizData) {
        window.location.href = "roadmap.html";
        return;
    }

    const score = quizData.score; // Correctly pulls the number
    const total = 15;
    const wrong = total - score;

    document.getElementById('greetUser').innerText = `Well done, ${user}!`;
    document.getElementById('scoreNum').innerText = score;

    const badge = document.getElementById('badge');
    if (score >= 10) {
        badge.innerText = "Excellent 🏆";
        badge.className = "status-badge excellent";
    } else if (score >= 5) {
        badge.innerText = "Average 📈";
        badge.className = "status-badge average";
    } else {
        badge.innerText = "Needs Improvement ⚠️";
        badge.className = "status-badge improve";
    }

    const ctx = document.getElementById('scoreChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Correct', 'Incorrect'],
            datasets: [{
                data: [score, wrong],
                backgroundColor: ['#22c55e', '#ef4444'],
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, max: 15, ticks: { color: 'white' } },
                x: { ticks: { color: 'white' } }
            }
        }
    });
});