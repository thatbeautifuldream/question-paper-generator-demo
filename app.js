document.addEventListener("DOMContentLoaded", () => {
  loadQuestions();
});

// Function to load questions from the server
function loadQuestions() {
  fetch("http://localhost:3000/api/questions")
    .then((response) => response.json())
    .then((questions) => {
      displayQuestions(questions);
    })
    .catch((error) => console.error("Error fetching questions:", error));
}

// Function to display questions on the page
function displayQuestions(questions) {
  const questionList = document.getElementById("questionList");
  questionList.innerHTML = "";

  questions.forEach((question) => {
    const questionItem = document.createElement("div");
    questionItem.innerHTML = `<strong>${question.subject} - ${question.topic}</strong><br>${question.question}<br>Difficulty: ${question.difficulty}, Marks: ${question.marks}`;
    questionList.appendChild(questionItem);
  });
}

// Function to add a new question
function addQuestion() {
  const questionForm = document.getElementById("questionForm");
  const formData = new FormData(questionForm);

  fetch("http://localhost:3000/api/questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      loadQuestions();
      questionForm.reset();
    })
    .catch((error) => console.error("Error adding question:", error));
}
