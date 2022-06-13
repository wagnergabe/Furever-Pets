/*Variables*/

var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJlTXlqdnF5eVd6UTh0N2FEZzBTbzVYRGNXR0N2bXhzSjNxTTN0NlJVSGdidWsyYUNybiIsImp0aSI6IjhkNWI4YjUxMDA2MDI0MzYzZjg0YmY1MzQzOGFlYzc0NTAxYTI4NmI3MDlkMTllNDIzYWUwNmE1ZDc2ZDYwZjA2NjFhMmY2NWExZTU2YzY1IiwiaWF0IjoxNjU1MDkxMjYwLCJuYmYiOjE2NTUwOTEyNjAsImV4cCI6MTY1NTA5NDg2MCwic3ViIjoiIiwic2NvcGVzIjpbXX0.KxcYhLrfQdFqDWS48JkL7nAW0Pt9Q0EcbLzhDp108JwcXXTCwcgQnweV4LOjN81RCb89HCVh0JDFOJ8zNuVwIFXjjhx50Td9qyo6xnzJ1S0Y8iYUjyZmkseCuzX1F-gv2SqPwn1qwRvOqLWsfvM6GgmjCOXmCtYKR4hDQleoGGP3lZJEmHyyie_HfnX93AenIULOZzESBI7P1nAJ2dUcClhHmP-Lcx5tD-T8mx4dolM3UPmEWpWSGVh1M2xv1c7ty31y2z7xbz-8kZhOCdW_9K-Bx06H9tb4S5TrMM18VYkq7Zjuzb3XRbrx7rjApHchjkdgqX3Ct1UwzeXYKccq9g"
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
    console.log(response3)
    petChoices.push(response3.innerHTML);   

//-----Save to localStorage-----//

    // console.log(petChoices)
localStorage.setItem("petChoices", JSON.stringify(petChoices))

//----API Call----///

console.log(petChoices[0])

fetch(`https://api.petfinder.com/v2/animals?type=${petChoices[0]}&age=${petChoices[1]}&size=${petChoices[2]}`, {
    headers: {
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJlTXlqdnF5eVd6UTh0N2FEZzBTbzVYRGNXR0N2bXhzSjNxTTN0NlJVSGdidWsyYUNybiIsImp0aSI6ImI5MjYwNDk0NzQ5MDhiZGFkMzQzNmM2YWViNTk1MzA1M2Q1ZTYwY2ZmOWYwNmU4NjM3ODI1ZTg4YjhhOGI4MWQ3NWM0ZTRjNzZlMjZjZWJkIiwiaWF0IjoxNjU1MTAyMzEyLCJuYmYiOjE2NTUxMDIzMTIsImV4cCI6MTY1NTEwNTkxMiwic3ViIjoiIiwic2NvcGVzIjpbXX0.rGoK0EENTLEBCahcA_7b9_awPIQruNzqtArimyeuFFK2AhzPSO4TFFao5005LVhETtcesSL37xxZI-tZ1pcYm3jp7LXFIqKpyEszjJk2eUN8Rb8TJbw-wbqIrPLesCiRJXXsv8g9bNRSHZXQaobIoHIsg2ftFE18RR2jbBmdU90vO2lcRFZVAOIC4U1RvwBXUYjjeOTPHoNmkK0SZsoIVP0EJjxGnXZicZK5SzIihVWAGDt5x4MXp8-Ny9R9lOwaAN7QHPTB3yunFxyJMe7L3Nwwiuml3Tb7xGskN1iQMYTLmCnnMPDA8kAgRRmNO7AYAiqC-aEPhczh8iXZIquyAg",
    }
})

.then(function(response) {
    return response.json();
})
.then (function (data) {
console.log(data);

var petName = document.createElement('h2');
petName.textContent = data.animals[0].name;
finalResults.appendChild(petName);


var petProfilePic = document.createElement('img');  
petProfilePic.src = data.animals[0].primary_photo_cropped.small;   
finalResults.appendChild(petProfilePic);



})
});

