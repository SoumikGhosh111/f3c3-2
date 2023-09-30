// console.log("aora"); 
// my api-key:
const apiKey = "wOT851VVDvjcpCwhebDT3zFh7qXXqeOpSabCpW1Y";
const BackUpKey = "Y9N4n1QQmI1SVNpRMUZUuL6cXRhOb9s7REWbYGpl";
const currentDate = new Date().toISOString().split("T")[0];
let dateInput = document.getElementById("date-input"); 
let searchButton = document.querySelector("button"); 
let img = document.querySelector("img"); 
let title = document.querySelector(".title");  
let PictureOnDate = document.querySelector(".selected-date"); 
let detailsOfThePic = document.querySelector(".details p"); 

searchButton.addEventListener("click", (e)=>{ 
    e.preventDefault(); 
    callingTheData(dateInput.value);   
})
function callingTheData(date) { 
    if(!date){ 
        (getCurrentImageOfTheDay(currentDate)); 
    }
    else{ 
        (getImageOfTheDay(date));
    } 
}


 
callingTheData();

async function getCurrentImageOfTheDay(date) {
    try {
        const endpoint = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;
        const response = await fetch(endpoint);
        const result = await response.json();
        console.log(result, "this is async 1");

        renderData(result);
    }
    catch (e) {
        console.error(e);
    }
}

async function getImageOfTheDay(date) {
    try {
        const endpoint = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;
        const response = await fetch(endpoint);
        const result = await response.json();
        console.log(result, "this is async 2");
        
        renderData(result);
        saveSearch(date); 
    }
    catch (e) {
        console.error(e);
    }
}

function renderData(data) {
    console.log(data.title);
    img.src = `${data.url}`;
    img.alt = `${data.title}`; 
    title.innerHTML = data.title; 
    PictureOnDate.innerHTML = data.date; 
    detailsOfThePic.innerHTML = data.explanation; 
}
function saveSearch(date){ 
  
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  searchHistory.push(date);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  addSearchHistory(date);
}
function addSearchHistory(date){ 
    let searchHistory = document.querySelector("#search-history"); 
    let searchHistoryLi = document.createElement("li"); 
    searchHistoryLi.textContent = date;
    searchHistoryLi.addEventListener("click", ()=>{ 
        getImageOfTheDay(date); 
    })
    searchHistory.appendChild(searchHistoryLi); 
}


//loading the searchhistory
function getSearchHistory() {
    const searchs = localStorage.getItem('searchHistory');
    return searchs ? JSON.parse(searchs) : [];
  }
window.addEventListener('load', () => {
    const searchHistory = getSearchHistory();
    searchHistory.forEach((date) => {
      addSearchHistory(date);
    });
  });