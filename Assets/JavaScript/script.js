

/*Variables*/
var clientId = "eMyjvqyyWzQ8t7aDg0So5XDcWGCvmxsJ3qM3t6RUHgbuk2aCrn";
var secret = "aWV5jwQBJnkFks98afBWwFAl1vrEUNtLtl7ekKRB";
var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJlTXlqdnF5eVd6UTh0N2FEZzBTbzVYRGNXR0N2bXhzSjNxTTN0NlJVSGdidWsyYUNybiIsImp0aSI6ImE5Njc5MTA1Yjk4NjU0M2RhOTQxYjY0MmQ2ZTA5YWRiNmRmMTAwZjMzOTEyNTlhNGE0NGZmZWQ1ZTlmMjlhZTgyZTJkOTAzNGRlZmYwNDNmIiwiaWF0IjoxNjU1MTMzNDQxLCJuYmYiOjE2NTUxMzM0NDEsImV4cCI6MTY1NTEzNzA0MSwic3ViIjoiIiwic2NvcGVzIjpbXX0.z03UHjOWAe1eCWdFS-TpqUXltXVnr_cAQmBOMleBhUQH6tbZlPDf54-WvfkTrGDeuM5hySAodZojDALlghHD8cOF7F9hNhtL1JmIDkNk4wo7-NxIt6ar66gCWZD9iqF0PfJjxKogkIE_k4t79jq6SWBF68B4yhDvjGxnQB_wT7cU0ZwPWMTt_4FSfNq7x8_nrVjR96hbV6tSdkbd4r0di_TujApuhmA3DRBG4CBBceFw7BGYRY7NcNwy2FlSkAMYuhuqmDGax0Jn6JqCmwYaTTKDMu00XX3S3A5SS7z0ns5Xg5mrUDQD20YGF_qT3djE-9Bwlqx6PUAiZP6GFXNuGg";
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

   fetch("https://api.petfinder.com/v2/oauth2/token", {
  body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  method: "POST" 
   })
   .then (function(response) {
    return response.json();
   })
   .then(function (data) {
    token = data.access_token;
   })

//----- First Question -----//

ul_1.addEventListener("click", function(event) {
   
    q1.style.display = "none";
    q2.style.display = "block";
    
    var response1 = event.target;
    finalResults.appendChild(response1);
    petChoices.push(response1.innerHTML)
    
    console.log(response1)
})



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
    event.preventDefault();


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
        Authorization: `Bearer ${token}`,
    }
})

.then(function(response) {
    return response.json();
})
.then (function (data) {



/*Pet Name */
var petName = document.createElement('h2');
petName.textContent = data.animals[0].name;
finalResults.appendChild(petName);

/*Pet Picture (if available) */
var petProfilePic = document.createElement('img');  
if(data.animals[0].primary_photo_cropped === null) {
    petProfilePic.src = "https://cdn-icons-png.flaticon.com/512/12/12638.png"
} else {
petProfilePic.src = data.animals[0].primary_photo_cropped.small};   
finalResults.appendChild(petProfilePic);

/*Pet description*/
/*Note: Desciption is allowed so many characters*/
var petDetails = document.createElement('p');
petDetails.textContent = data.animals[0].description;
finalResults.appendChild(petDetails);

/*Link to Pet's page */
var petLink = document.createElement('a');
var link = document.createTextNode("Adopt Me");
petLink.appendChild(link);
petLink.title = "Adopt Me";
petLink.href = data.animals[0].url;
finalResults.append(petLink);


})
});
