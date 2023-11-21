const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3000;

var corsOptions = {
  origin: "http://127.0.0.1:5500",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static("public"));

const questionsFilePath = "questions.json";

// Get existing questions
function getQuestions() {
  try {
    const questionsData = fs.readFileSync(questionsFilePath);
    return JSON.parse(questionsData);
  } catch (error) {
    return [];
  }
}

// Save questions to the file
function saveQuestions(questions) {
  fs.writeFileSync(questionsFilePath, JSON.stringify(questions, null, 2));
}

// API endpoint to get questions
app.get("/api/questions", (req, res) => {
  const questions = getQuestions();
  res.json(questions);
});

// API endpoint to add a question
app.post("/api/questions", (req, res) => {
  const newQuestion = req.body;
  const questions = getQuestions();
  questions.push(newQuestion);
  saveQuestions(questions);
  res.json({ message: "Question added successfully" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
