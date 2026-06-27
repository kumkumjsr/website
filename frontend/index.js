const startBtn = document.getElementById('startBtn');

startBtn.addEventListener('click', () => {
  const category = document.getElementById('category').value;
  const difficulty = document.getElementById('difficulty').value;

  // Redirect to quiz page 
  let url = `quiz.html?category=${category}&difficulty=${difficulty}`;
  // window.location.href = url;
  localStorage.setItem("category",category);
  localStorage.setItem("difficulty",difficulty)
   window.location.href="Roadmap.html";
});