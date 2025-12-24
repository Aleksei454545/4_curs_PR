document.addEventListener("DOMContentLoaded",()=>{
    const btnOpenModal = document.querySelector("#btnOpenModal");
    const modalBlock = document.querySelector("#modalBlock");
    const closeModal = document.querySelector("#closeModal");
    const questionTitle = document.querySelector("#question");
    const formAnswers = document.querySelector("#formAnswers");
    
    btnOpenModal.addEventListener("click",()=>{
        modalBlock.classList.add("d-block");   
        playTest();

        
    })
    closeModal.addEventListener("click",()=>{
        modalBlock.classList.remove("d-block");   

    })
    const playTest = function() {

        const burgerName1 = "Стандарт";
        const burgerImg1 = "./image/burger.png";

        const burgerName2 = "Чорний";
        const burgerImg2 = "./image/burgerBlack.png";

        questionTitle.textContent = "Якого кольору бургер бажаєте?";

        formAnswers.innerHTML = `
            <div class="answers-item d-flex flex-column">
                <input type="radio" id="answerItem1" name="answer" class="d-none">
                <label for="answerItem1" class="d-flex flex-column justify-content-between">
                  <img class="answerImg" src="${burgerImg1}" alt="burger">
                  <span>${burgerName1}</span>
                </label>
              </div>
              <div class="answers-item d-flex justify-content-center">
                <input type="radio" id="answerItem2" name="answer" class="d-none">
                <label for="answerItem2" class="d-flex flex-column justify-content-between">
                  <img class="answerImg" src="${burgerImg2}" alt="burger">
                  <span>${burgerName2}</span>
                </label>
              </div>
        `;
    };
});