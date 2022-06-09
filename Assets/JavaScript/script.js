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
;

//----- First Question -----//
ul_1.addEventListener("click", function(event) {
    q1.style.display = "none";
    q2.style.display = "block";
    
    var response1 = event.target;
    finalResults.appendChild(response1);
    
});



//-----Second Question-----//
ul_2.addEventListener("click", function(event) {
    q2.style.display = "none";
    q3.style.display = "block";

    var response2 = event.target;
    finalResults.appendChild(response2);
});

//-----Results-----//
ul_3.addEventListener("click", function(event) {
    q3.style.display = "none"
    quiz.style.display = "none"
    results.style.display = "block"

    var response3 = event.target;
    finalResults.appendChild(response3);
});

