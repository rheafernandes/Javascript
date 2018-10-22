


// All the values to be assigned for different Element
const form = document.getElementById("searchBar");
let searchedMovies;
let keyCounter=0;
let favouriteSection = document.getElementById('favouriteMovies');
let displayContainer = document.createElement('div');

let resultSection = document.getElementById('resultMovies');
let resultHeader = document.createElement('h3');
resultHeader.className = 'section-headers';

let flag =false;
let storageOk=false;
favouriteSection.style.display='none';

const getPosts = () => {
    let searchInput = form.firstElementChild.firstElementChild.value;
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=be17bfd1e7f392857691ca608bfc28c4&query=${searchInput}`)
        .then(res => res.json())
        .then(posts => {
            searchedMovies = posts.results;
            showSearchResults(searchedMovies);
        })
        .catch(err => console.error('Caught error: ', err));
}
//Event Listeners
form.addEventListener("submit", showAlert);
//Functions
function showAlert(e) {
    e.preventDefault();
    getPosts();
}
function showSearchResults(searchedMovies) {
    // console.log(searchedMovies)
    let resultContainer = document.createElement('div');
    let rowNumber = Math.ceil(searchedMovies.length / 3)
    if (searchedMovies.length > 0) {
        resultHeader.innerHTML = 'RESULTS';
        resultHeader.style.display = 'block';
        resultContainer.style.display = 'block';
    }
    else {
        resultHeader.style.display = 'none';
        resultContainer.style.display = 'none';
    }
    //Adds new grid layouts
    resultSection.innerHTML="";
    let columns = document.getElementsByClassName('col-sm-4');
    for (let i = 0; i < rowNumber; i++) {
        if (i === 0)
            resultSection.appendChild(resultHeader);
        let x = 3;
        resultContainer = document.createElement('div');
        resultContainer.className = 'row';
        resultContainer.innerHTML = '<div class="col-sm-4"></div><div class="col-sm-4"></div><div class="col-sm-4"></div>';
        resultSection.appendChild(resultContainer);
        x = x * i;
        createCard(columns, x);
    }
}
function createCard(columns, x) {
    for (let i = 0 + x; i < 3 + x; i++) {
        console.log('This is bleh' + columns[i]);
        columns[i].innerHTML = '<div class="card-body"><h5 class="card-title">' + searchedMovies[i].title + '</h5><button type="submit" id="btn'+ i +'" class="btn btn-danger"><i class="fa fa-heart"></i></button></div>';
        document.getElementById("btn" + i).addEventListener("click", function () { addToFav(searchedMovies[i]) });
    }
}

function toggleFav(){
    flag=!flag;
    if(flag){
        favouriteSection.style.display='block';
            displayCards();
    }
    else{
        favouriteSection.style.display='none';
    }
}

function addToFav(searchedMovie) {
    let previousList;
    previousList = localStorage.getItem('fav-movie');
    previousList += ",,,";  
    previousList+=searchedMovie.title;
    afterList = previousList;
    let dataArray = afterList.split(",,,");
    
    let mySet = new Set();
    for(let i =0 ; i< dataArray.length ;i+=1){
        mySet.add(dataArray[i]);
    }

    let uniqueMovies = [];

    for(let item of mySet) {
        uniqueMovies.push(item);
    }
    let k = uniqueMovies.join(',,,');
    localStorage.setItem("fav-movie",k);
}
//different method to display cards in favourites, works fine without appending rows, try this on top too
function displayCards() {
    displayContainer.innerHTML='';
    let newList=localStorage.getItem('fav-movie').split(',,,');
    for (let i = 0 ; i < newList.length; i++) {
        let cell=document.createElement('div');

        cell.innerHTML = '<div class="col-sm-4"><div class="card-body"><h5 class="card-title">' + newList[i]+ '</h5><button type="submit"  class="btn btn-danger">View</button></div></div>';
        displayContainer.appendChild(cell);
    }
    favouriteSection.appendChild(displayContainer);  

}




