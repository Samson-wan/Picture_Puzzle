 // scritps.js

 const cards = document.querySelectorAll('.picture');
 const display = document.querySelector("#move");
 const displayMessage = document.querySelector("#message");

 let hasClickedOne = false;
 let hasShuffle = false;
 let lockBoard = false;
 let Move = 0;
 let count = 1;
 let baseURL = "castle/img/image_part_00";
 let suffix = ".jpg";
 let indexArray = [];
 let index = null;
 let firstCard = null;
 let secondCard = null;
 let startPlaying = false;
 let firstSource = null;
 let secondSource = null;

 function initialize(){
  display.textContent = Move;
  displayMessage.textContent = "Good Luck!";
  indexArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"];
  console.log("hi");
 }

let getRandomIndex = () => { //arrow function of get random Integer.
  return Math.floor(Math.random() * indexArray.length);
 }

 function shuffle(){
  if(!startPlaying){
    for(let i = 1; i <= 16; i++){
      index = getRandomIndex();
      document.getElementById(indexArray[index]).src = baseURL + count.toString() + suffix;
      indexArray.splice(index, 1);
      count++;
    }
    hasShuffle = true;
    initialize();
    count = 1;
    Move = 0;
    display.textContent = Move;
  }
 }

function isSame(a, b){ //Ternary Operator
	return a === b? true : false;
}

 function clickedCard() {
  if(!hasShuffle) return;
  startPlaying = true;
  if (lockBoard) return;
  if (isSame(this, firstCard)) return;

  this.classList.add('change');

  if (!hasClickedOne){
    hasClickedOne = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  Move++;
  display.textContent = Move;

  switchCard();
  resetVariable();
  isCorrectLocation();
  }

  function switchCard(){
    firstSource = firstCard.src;
    secondSource = secondCard.src;
    firstCard.src = secondSource;
    secondCard.src = firstSource;
  }

  function resetVariable() {
    firstCard.classList.remove('change');
    secondCard.classList.remove('change');
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    hasClickedOne = false;
    firstSource = null;
    secondSource = null;
  }

  function isCorrectLocation(){
    for(let arrIndex = 0; arrIndex <= 15; arrIndex++){
      //console.log(document.getElementById(indexArray[i]).src);
      let location = document.getElementById(indexArray[arrIndex]).src;
      let result = location.split("Advance/");
      //console.log(result[1]);
      //console.log(baseURL + indexArray[i].toString() + suffix);
      //console.log(result[1] === baseURL + indexArray[i].toString() + suffix)
      if(result[1] !== baseURL + indexArray[arrIndex].toString() + suffix){
        return;
      }
    }
    displayMessage.textContent = "Congrats! You solve the puzzle in " + Move + " moves!";
    console.log("You won!");
    startPlaying = false;
    hasShuffle = false;
  }

  function switchVar(){
    if(firstCard !== null){ //check if the user want to switch puzzle only after one click
      firstCard.classList.remove('change');
      firstCard = null;
      firstSource = null;
    }

    startPlaying = false;
    hasShuffle = false;
    Move = 0;
    display.textContent = Move;
    let table = document.getElementById("table");

    if(baseURL === "castle/img/image_part_00"){
      baseURL = "girl/img/image_part_00";
      for(let i = 1; i <= 16; i++){
        document.getElementById(i.toString()).src = baseURL + count.toString() + suffix;
        count++;
      }
      count = 1;
      table.style.width = "800px";
    }
    else{
      baseURL = "castle/img/image_part_00";
      for(let i = 1; i <= 16; i++){
        document.getElementById(i.toString()).src = baseURL + count.toString() + suffix;
        count++;
      }
      count = 1;
      table.style.width = "1200px";
    }
  }
 

cards.forEach(card => card.addEventListener('click', clickedCard));
