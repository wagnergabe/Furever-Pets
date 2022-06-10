/*Variables*/
var ul_1 = document.querySelector('.answer1');
var ul_2 = document.querySelector('.answer2');
var ul_3 = document.querySelector('.answer3');

var q1 = document.querySelector('#questionOne');
var q2 = document.querySelector('#questionTwo');
var q3 = document.querySelector('#questionThree');


var quiz = document.querySelector('.quiz');
var results = document.querySelector('.results');
var finalResults = document.querySelector('.finalResults');
var petChoices = [];

//----- First Question -----//

ul_1.addEventListener("click", function(event) {
   
    q1.style.display = "none";
    q2.style.display = "block";
    
    var response1 = event.target;
    finalResults.appendChild(response1);
    petChoices.push(response1.innerHTML)
    
    console.log(response1)
});



//-----Second Question-----//
ul_2.addEventListener("click", function(event) {
    q2.style.display = "none";
    q3.style.display = "block";

    var response2 = event.target;
    finalResults.appendChild(response2);
    console.log(response2);
    petChoices.push(response2.innerHTML)
    // finalResults.appendChild(response2);
    


});

//-----Results-----//
ul_3.addEventListener("click", function(event) {
    q3.style.display = "none"
    quiz.style.display = "none"
    results.style.display = "block"


    response3 = event.target;
    finalResults.appendChild(response3);
    petChoices.push(response3.innerHTML);
    

//-----Save to localStorage-----//

    console.log(petChoices)
localStorage.setItem("petChoices", JSON.stringify(petChoices))


});

fetch(url) 
.then(function(response) {
    return response.JSON();
})
.then (function (data) {
console.log(data);
})

