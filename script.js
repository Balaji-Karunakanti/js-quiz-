const questions = [
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Netscape", "Google", "Apple"],
    answer: "Netscape"
  },
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Management",
      "Digital Ordinance Model",
      "Desktop Oriented Mode"
    ],
    answer: "Document Object Model"
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "/*", "#", "<!--"],
    answer: "//"
  },
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["const", "let", "var", "static"],
    answer: "const"
  },
  {
    question: "Which of the following is a primitive data type in JavaScript?",
    options: ["Object", "Array", "String", "Function"],
    answer: "String"
  },
  {
    question: "What will `typeof null` return?",
    options: ["null", "object", "undefined", "boolean"],
    answer: "object"
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: "push()"
  },
  {
    question: "What does `NaN` stand for?",
    options: [
      "Not a Null",
      "No actual Number",
      "Not a Number",
      "New and Null"
    ],
    answer: "Not a Number"
  },
  {
    question: "How do you write an arrow function?",
    options: [
      "function => ()",
      "() => {}",
      "(=>) {}",
      "=> () {}"
    ],
    answer: "() => {}"
  },
  {
    question: "What is the correct way to access an element by ID in JS?",
    options: [
      "getElement('id')",
      "document.getElementById('id')",
      "document.querySelectorAll('#id')",
      "$('id')"
    ],
    answer: "document.getElementById('id')"
  }
];

let currentQuestionIndex = 0;

const quizBox = document.getElementById("quiz-box");

function showQuestion() {
  const q = questions[currentQuestionIndex];

  let optionsHTML = "";
  q.options.forEach((opt, index) => {
    optionsHTML += `<div class="option" data-index="${index}">${opt}</div>`;
  });

  quizBox.innerHTML = `
    <h2>${q.question}</h2>
    ${optionsHTML}
  `;
}




let selectedOption = null;

quizBox.addEventListener("click", function (e) {
  if (e.target.classList.contains("option")) {
    // Remove 'selected' from all options
    const allOptions = quizBox.querySelectorAll(".option");
    allOptions.forEach(opt => opt.classList.remove("selected"));

    // Add 'selected' to clicked option
    e.target.classList.add("selected");

    // Store selected value
    selectedOption = e.target.textContent;
  }
});


const nextBtn = document.querySelector("#next-btn");
let score = 0;

let timer;
let timeLeft = 30;
startTimer(); // start countdown for the first question
showQuestion(); // Initial call
function startTimer() {
  clearInterval(timer);
  timeLeft = 30;
  document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timer);
      handleNext(); // Move to next question automatically
    }
  }, 1000);
}

function handleNext() {
  if (selectedOption === null) {
    alert("Time's up or please choose an answer!");
  } else {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      score++;
    }
  }

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
    selectedOption = null;
    startTimer(); // restart timer for next question
  } else {
    clearInterval(timer);
    quizBox.innerHTML = `<h2>🎉 Quiz Completed!</h2><p>Your Score: ${score}/${questions.length}</p>`;
    nextBtn.style.display = "none";
    document.getElementById("timer").style.display = "none";
  }
}

nextBtn.addEventListener("click", handleNext);
