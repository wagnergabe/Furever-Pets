

/*Variables*/

var startQuiz = document.querySelector('#startQuiz');
var mainPage = document.querySelector('#mainPage');

var clientId = "eMyjvqyyWzQ8t7aDg0So5XDcWGCvmxsJ3qM3t6RUHgbuk2aCrn";
var secret = "aWV5jwQBJnkFks98afBWwFAl1vrEUNtLtl7ekKRB";
var token = "";
var ul_1 = document.querySelector('.answer1');
var ul_2 = document.querySelector('.answer2');
var ul_3 = document.querySelector('.answer3');
var ul_4 = document.querySelector('.answer4');

var q1 = document.querySelector('#questionOne');
var q2 = document.querySelector('#questionTwo');
var q3 = document.querySelector('#questionThree');
var q4 = document.querySelector('#questionFour');

// var restart = document.querySelector('#reset')
var quiz = document.querySelector('.quiz');
var results = document.querySelector('#results');
var finalResults = document.querySelector('#finalResults');
var petChoices = [];

var dogPic = document.querySelector('#randomDog');
var catPic = document.querySelector('#randomCat');


// /*Get New Token */
// NOTE: Run app once with this, and then comment it out. Creates a token each time quiz is submitted. working on fixing it
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



// Random Dog Pic //
fetch ('https://dog.ceo/api/breeds/image/random')
.then(function(response) {
    return response.json();
})
.then (function (data) {
    console.log(data)

var randomDogPic = document.createElement('img');
randomDogPic.setAttribute('class', 'img-responsive')
randomDogPic.setAttribute('id', 'randomPic')
randomDogPic.src = data.message;
dogPic.appendChild(randomDogPic);
}) 

// Random Cat pic //

var randomPage = Math.floor(Math.random() * 100);
var randomAry = Math.floor(Math.random() * 20);


fetch (`https://api.thecatapi.com/v1/images/search?limit=20&page=${randomPage}&api_key=a2ec132c-483a-41d0-a871-b41aeaecf81b`) 
.then(function(response) {
    return response.json();
})
.then (function (data) {
    console.log(data)
var randomCatPic = document.createElement('img');
randomCatPic.setAttribute('class', 'img-responsive');
randomCatPic.setAttribute('id', 'randomPic');
randomCatPic.src = data[randomAry].url;
catPic.appendChild(randomCatPic);
});

//---- Clear local storage when restarting quiz---//
// restart.addEventListener("click", function() {
//     localStorage.clear();
//     petChoices.clear();
// })

//----- Start Quiz -----//
startQuiz.addEventListener("click", function () {
    localStorage.clear();
    mainPage.style.display = "none";
    q1.style.display = "block";
    dogPic.style.display = "none";
    catPic.style.display = "none";
   
})


//----- First Question -----//

ul_1.addEventListener("click", function(event) {
   
    q1.style.display = "none";
    q2.style.display = "block";
    
    var response1 = event.target;
    // finalResults.appendChild(response1);
    petChoices.push(response1.innerHTML)
    
    console.log(response1)
})



//-----Second Question-----//
ul_2.addEventListener("click", function(event) {
    q2.style.display = "none";
    q3.style.display = "block";

    var response2 = event.target;
    // finalResults.appendChild(response2);
    console.log(response2);
    petChoices.push(response2.innerHTML)
    

});

//-----Third Question-----//
ul_3.addEventListener("click", function(event) {
    q3.style.display = "none";
    q4.style.display = "block";
  

    response3 = event.target;
    // finalResults.appendChild(response3);
    console.log(response3)
    petChoices.push(response3.innerHTML);   

});

ul_4.addEventListener("click", function(event) {
    q4.style.display = "none"
    quiz.style.display = "none"
    results.style.display = "block";

    response4 = event.target;
    // finalResults.appendChild(response4);
    console.log(response4);
    petChoices.push(response4.innerHTML);



//-----Save to localStorage-----//

localStorage.setItem("petChoices", JSON.stringify(petChoices))

//----API Call----///

console.log(petChoices)
fetch(`https://api.petfinder.com/v2/animals?type=${petChoices[0]}&age=${petChoices[1]}&size=${petChoices[2]}&gender=${petChoices[3]}`, {
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
petName.setAttribute('class', 'text-4xl text-center mt-3');
petName.setAttribute('id', 'petName');
finalResults.appendChild(petName);

/*Pet Picture (if available) */
var petProfilePic = document.createElement('img');  
petProfilePic.setAttribute('class', 'flex justify-center');
petProfilePic.setAttribute('id', 'pfp');
if(data.animals[0].primary_photo_cropped === null) {
    petProfilePic.src = "https://cdn-icons-png.flaticon.com/512/12/12638.png"
} else {
petProfilePic.src = data.animals[0].primary_photo_cropped.small};   
finalResults.appendChild(petProfilePic);

/*Pet description*/
var petDetails = document.createElement('p');
petDetails.textContent = data.animals[0].description;
petDetails.setAttribute = ('class', 'mt-3')
petDetails.setAttribute = ('id', "infoText")
finalResults.appendChild(petDetails);

/*Link to Pet's page */
var petLink = document.createElement('a');
var link = document.createTextNode("Adopt Me! Click For More Information!");
petLink.appendChild(link);
petLink.setAttribute("class", "mt-2 bg-amber-500 text-white px-2 py-1 rounded text-center hover:ring hover:ring-amber-400 hover:animate-bounce")
petLink.setAttribute("id", "adoptMe-button");
petLink.title = "Adopt Me!";
petLink.href = data.animals[0].url;
finalResults.append(petLink);

var restart = document.createElement('a');
var resetLink = document.createTextNode('Start Over');
restart.appendChild(resetLink);
restart.addEventListener("click", function() {
    localStorage.clear();
    petChoices.clear();
})
restart.setAttribute("class", "w-1/6 text-center mt-2 bg-amber-500 text-white px-2 py-1 rounded mb-3")
restart.setAttribute("id", "restart");
restart.href = "index.html"
finalResults.append(restart);
});
});
