/*Variables*/

var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJlTXlqdnF5eVd6UTh0N2FEZzBTbzVYRGNXR0N2bXhzSjNxTTN0NlJVSGdidWsyYUNybiIsImp0aSI6IjA5ODAxYjcwMWE3ZmVhZTE2MTIyZjQxMWJiMjU1NTAyOWVmM2E5YjkyMmI1MWQ5ZDhlMjJhNDU0ZTU0OThiNmQ5ZDRlZDA0OTYzMDUxZjU3IiwiaWF0IjoxNjU1MTI5NDgzLCJuYmYiOjE2NTUxMjk0ODMsImV4cCI6MTY1NTEzMzA4Mywic3ViIjoiIiwic2NvcGVzIjpbXX0.UXRUwfHERxYzw-tmBdzhgTFbqh2k4QhRakGQ0LUNobaAvUEDAkcKGHnLar-Mw3VnvfLD8lfNm31KXtNBzNNjCnFvA5yR7quXGbE1gEB9BDzSbNoriijEEL29LXFVqUCEKOvWQTH3I0MpGqk0WpbLsoKzgxsTWlYD1QaFL1-2zOeVJ5EpYU8Quppn1PsPhgNSyffQjUQAguiKl7pWhVXAR4B_53_f6R-HiTmlBapxNsGrPqapDhyYX2Q6lopfKPr7Qd6bJvvoHBRf88eau_m5nzOn-3Be7LAW2uUohny477169qUgkJt-2pQVw3EJGpCMVX65y0x-G5xOxxrH6L1rBA"
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
        Authorization: `Bearer ${token}`
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
if(data.animals[0].primary_photo_cropped === null) {
    petProfilePic.src = "https://cdn-icons-png.flaticon.com/512/12/12638.png"
} else {
petProfilePic.src = data.animals[0].primary_photo_cropped.small};   
finalResults.appendChild(petProfilePic);

var petDetails = document.createElement('p');
petDetails.textContent = data.animals[0].description;
finalResults.appendChild(petDetails);


})
});

