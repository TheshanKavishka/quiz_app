const questions=[
	{
		question: "Which programming language is primarily used for front-end web development?",
		answers: [
				{text:"Java",correct:false},
				{text:"Python",correct:false},
				{text:"HTML",correct:true},
				{text:"C++",correct:false},
			]
	},

	{
		question: "Which language is commonly used for data analysis and machine learning?",
		answers: [
				{text:"JavaScript",correct:false},
				{text:"PHP",correct:false},
				{text:"Swift",correct:false},
				{text:"R",correct:true},
			]
	},

	{
		question: "What language is known for its versatility in building mobile applications?",
		answers: [
				{text:"Ruby",correct:false},
				{text:"C#",correct:true},
				{text:"Kotlin",correct:false},
				{text:"CSS",correct:false},
			]
	},

	{
		question: "Which language is often used for server-side scripting and web development?",
		answers: [
				{text:"PHP",correct:true},
				{text:"Java",correct:false},
				{text:"Python",correct:false},
				{text:"C++",correct:false},
			]
	},

	{
		question: "Which programming language is commonly used for system programming and creating operating systems?",
		answers: [
				{text:"JavaScript",correct:false},
				{text:"Ruby",correct:false},
				{text:"Assembly",correct:true},
				{text:"TypeScript",correct:false},
			]
	}

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
	currentQuestionIndex = 0;
	score = 0;
	nextButton.innerHTML = "Next";
	showQuestion();
}

function showQuestion(){
	resetState();
	let currentQuestion = questions[currentQuestionIndex];
	let questionNo = currentQuestionIndex + 1;
	questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

	currentQuestion.answers.forEach(answer=>{
		const button = document.createElement("button");
		button.innerHTML = answer.text;
		button.classList.add("btn");
		answerButtons.appendChild(button); 
		if(answer.correct){
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click",selectAnswer);
	});
}

function resetState(){
	nextButton.style.display = "none";
	while(answerButtons.firstChild){
		answerButtons.removeChild(answerButtons.firstChild);
	}
}

function selectAnswer(e){
	const selectedBtn = e.target;
	const isCorrect = selectedBtn.dataset.correct === "true";
	if(isCorrect){
		selectedBtn.classList.add("correct");
		score++;
	}
	else{
		selectedBtn.classList.add("incorrect");
	}

	Array.from(answerButtons.children).forEach(button => {
		if(button.dataset.correct === "true"){
			button.classList.add("correct");
		}
		button.disabled = true;
	});
	nextButton.style.display = "block";
}

function showScore(){
	resetState();
	questionElement.innerHTML = `You scored ${score} out of ${questions.length}!<br> Your Marks ${score*20}%`;
	
	nextButton.innerHTML =  "Play Again";
	nextButton.style.display = "block";
}

function handleNextButton(){
	currentQuestionIndex++;
	if(currentQuestionIndex < questions.length){
		showQuestion();
	}
	else{
		showScore();
	}
}

nextButton.addEventListener("click", ()=> {
	if(currentQuestionIndex < questions.length){
		handleNextButton();
	}
	else{
		startQuiz();
	}
});

startQuiz();
