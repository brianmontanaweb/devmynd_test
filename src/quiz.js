//setup dependices
import $ from "jquery";
const data = require("./data.json");

//property: keep track of users points
let points = 0;

//getter for points property
function getPoints(){
  return points;
}

//setter for points property
function updatePoints(){
  points += 1;
}

//creates + appends html elements for each question in data.json
function renderQuestion(question){

  //create form for questions
  const form = document.createElement('div');
  document.body.appendChild(form);

  //create div element for question
  const element = document.createElement('div');
  element.innerHTML =(`<h2>${question.question}</h2>`);

  //loop through each incorrect answer add event listener, label,input attributes
  question.incorrect.forEach(q => {
    var input = document.createElement('input');
    input.addEventListener('click',uclicked);

    var label = document.createElement('label');
    label.innerHTML = (`${q}<br>`)
    

    input.setAttribute('type', 'radio');
    input.setAttribute('value',`${q}`);

    //add each label and input to the form
    form.appendChild(input);
    form.appendChild(label)
  });


  var input = document.createElement('input');
  input.addEventListener('click',uclicked);
  var label = document.createElement('label');
  label.innerHTML = (`${question.correct}<br>`);
  input.setAttribute('type', 'radio');
  input.setAttribute('value',`${question.correct}`);
  
  input.classList.add("correct");

  form.appendChild(input);
  form.appendChild(label)



  element.appendChild(form)

  document.body.appendChild(element);


}

// click function for each answer keeps tracks of points and css styles to signify to the user if choice is right or wrong
function uclicked() {

  if(this.classList.value){
   
    updatePoints();
    let elePoints = document.getElementById("game-points").innerHTML = `Your Score is ${points}`;
    let answerLabel = $(this).next().get(0);
    answerLabel.classList.add("correct-answer");
  }
  else{
    let answerLabel = $(this).next()[0];
    answerLabel.classList.add("wrong-answer");
  }

}

//uclicked function to be in the global scope
window.uclicked = uclicked;

// question each question in the dom
function setup(d){
  //console.log(d[0])
  // renderQuestion(d[0])
  $("body").empty();

  d.forEach(ele => {renderQuestion(ele)});

}



export {data,setup};