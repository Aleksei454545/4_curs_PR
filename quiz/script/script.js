document.addEventListener("DOMContentLoaded",()=>{
    'use strict'

    const btnOpenModal = document.querySelector("#btnOpenModal");
    const modalBlock = document.querySelector("#modalBlock");
    const closeModal = document.querySelector("#closeModal");
    const questionTitle = document.querySelector("#question");
    const formAnswers = document.querySelector("#formAnswers");
    const prevButton = document.querySelector("#prev");
    const nextButton = document.querySelector("#next");
    const sendButton = document.querySelector("#send");

    
    const questions = [
    {
        question: "Якого кольору бургер?",
        answers: [
            {
                title: 'Стандарт',
                url: './image/burger.png'
            },
            {
                title: 'Чорний',
                url: './image/burgerBlack.png'
            }
        ],
        type: 'radio'
    },
    {
        question: "З якого м'яса котлета?",
        answers: [
            {
                title: 'Курка',
                url: './image/chickenMeat.png'
            },
            {
                title: 'Яловичина',
                url: './image/beefMeat.png'
            },
            {
                title: 'Свинина',
                url: './image/porkMeat.png'
            }
        ],
        type: 'radio'
    },
    {
        question: "Додаткові інгредієнти ?",
        answers: [
            {
                title: 'Помідор',
                url: './image/tomato.png'
            },
            {
                title: 'Огірок',
                url: './image/cucumber.png'
            },
            {
                title: 'Салат',
                url: './image/salad.png'
            },
            {
                title: 'Цибуля',
                url: './image/onion.png'
            }
        ],
        type: 'checkbox'
    },
    {
        question: "Додати соус?",
        answers: [
            {
                title: 'Часниковий',
                url: './image/sauce1.png'
            },
            {
                title: 'Томатний',
                url: './image/sauce2.png'
            },
            {
                title: 'Гірчичний',
                url: './image/sauce3.png'
            }
        ],
        type: 'radio'
    }
];

    btnOpenModal.addEventListener("click",()=>{
        modalBlock.classList.add("d-block");   
        playTest();

        
    })
    closeModal.addEventListener("click",()=>{
        modalBlock.classList.remove("d-block");   

    });

const playTest = () => {
  let finalAnswers = []; 
  let numberQuestion = 0;

  const renderAnswers = (index) => {
    questions[index].answers.forEach((answer) => {
      const answerItem = document.createElement("div");
      answerItem.classList.add("answers-item", "d-flex", "justify-content-center");
      answerItem.innerHTML = `
            <input type="${questions[index].type}" id="${answer.title}" name="answer" value="${answer.title}" class="d-none">
            <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                <img class="answerImg" src="${answer.url}" alt="${answer.title}">
                <span>${answer.title}</span>
            </label>
            `;
      formAnswers.appendChild(answerItem);
    });
  }

const renderQuestions = (indexQuestion) => {
    formAnswers.innerHTML = "";
    
    nextButton.classList.remove('d-none');
    prevButton.classList.remove('d-none');
    sendButton.classList.add('d-none');

    switch (indexQuestion) {
      case 0:
        prevButton.classList.add('d-none');
        questionTitle.textContent = questions[indexQuestion].question;
        renderAnswers(indexQuestion);
        break;

      case questions.length:
        questionTitle.textContent = 'Залиште ваші контакти';
        nextButton.classList.add('d-none');
        prevButton.classList.add('d-none');
        sendButton.classList.remove('d-none');

        formAnswers.innerHTML = `
          <div class="input-group flex-column">
            <div class="input-group-prepend">
              <span class="input-group-text">Введіть номер телефону</span>
            </div>
            <input type="text" id="numberPhone" class="form-control" placeholder="+380..." aria-label="Phone">
          </div>`;
        break;

      case questions.length + 1:
        questionTitle.textContent = '';
        nextButton.classList.add('d-none');
        prevButton.classList.add('d-none');
        sendButton.classList.add('d-none');

        formAnswers.innerHTML = 'Дякую за вибір! Наш менеджер зателефонує вам найближчим часом.';
        
        setTimeout(() => {
          modalBlock.classList.remove("d-block");
        }, 2000);
        break;

      default:
        if (indexQuestion > 0 && indexQuestion < questions.length) {
          questionTitle.textContent = questions[indexQuestion].question;
          renderAnswers(indexQuestion);
        }
        break;
    }
  }


  renderQuestions(numberQuestion);

const checkAnswers = () => {
    const obj = {};
    const inputs = [...formAnswers.querySelectorAll('input')].filter((input) => input.checked || input.id === "numberPhone");

    inputs.forEach((input, index) => {
        if(numberQuestion>=0 && numberQuestion<=questions.length -1){
        obj[`${index}_${questions[numberQuestion].question}`] = input.value;
        }
        if(numberQuestion===questions.length){
        obj['NumberPhone'] = input.value;
        }
    });

    finalAnswers.push(obj);
    console.log(finalAnswers);
  }

  prevButton.onclick = () => {
    numberQuestion--;
    renderQuestions(numberQuestion);
  }

  nextButton.onclick = () => {
    checkAnswers();
    numberQuestion++;
    renderQuestions(numberQuestion);
  }
    sendButton.onclick = () => {    
    checkAnswers();
    numberQuestion++;
    renderQuestions(numberQuestion);
    console.log(finalAnswers);
    }
};

});
