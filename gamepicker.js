var overzichtScherm = document.getElementById("overzicht");
var winkelmandjeScherm = document.getElementById("winkelmandje");
var switchButton = document.getElementById("switchButton");
var gameList = document.getElementById("gameList")
var selectGenres = document.getElementById("genres")
var selectRating= document.getElementById("ratings")

var FilterButton = document.getElementById("filterButton")
var priceFilterInput = document.getElementById("priceFilterInput")


FilterButton.addEventListener("click", filterGames);
switchButton.addEventListener("click", switchScreens);

var winkelmand = [];

winkelmandjeScherm.style.display = "none";


renderOverzicht(games)
var genres = []
games.forEach((game)=>{
    if (!genres.includes(game.genre)){
        genres.push(game.genre);
        }
    });
genres.forEach((genre) => {
    var option = document.createElement("option")
    option.innerText = genre
    selectGenres.appendChild(option)
});



function switchScreens() {
    if (overzichtScherm.style.display == "none"){
        overzichtScherm.style.display = "block";
        winkelmandjeScherm.style.display = "none";
        priceFilterInput.value = ""; 
        selectGenres.selectedIndex =0;
        selectRating.selectedIndex =0;
        renderOverzicht(games);
    } else {
        overzichtScherm.style.display = "none";
        winkelmandjeScherm.style.display = "block";
        renderWinkelmandjeContent();
    }
}

function addToCart() {
    var i = winkelmand.findIndex(game=>game.name === this.dataset.name)
    if (i>-1){
        winkelmand.splice(i,1)
    }
    else{
        winkelmand.push({name: this.dataset.name, price: this.dataset.price});
    }
}

function renderWinkelmandjeContent(){
    //clear de inhoud
    winkelmandjeScherm.innerHTML = "<h1>Winkelmandje</h1>";
    
    var winkelmandList = document.createElement("ul");
    var totalPrice = 0;
    winkelmand.forEach((winkelmandItem)=>{
        var winkelmandElem = document.createElement("li");
        totalPrice += parseFloat(winkelmandItem.price);

        winkelmandElem.innerText = winkelmandItem.name + " - " + winkelmandItem.price;
        winkelmandList.appendChild(winkelmandElem);
    });
    winkelmandjeScherm.appendChild(winkelmandList);
    var priceElem = document.createElement("p");
    priceElem.innerText = totalPrice;
    winkelmandjeScherm.appendChild(priceElem);
}

function filterGames(){
    var list = games
    if (priceFilterInput.value != ""){
        list = filterPrice(list)
    }
    if (selectGenres.value != ""){
        list = filterGenre(list)
    }
    if (selectRating.value != ""){
        list = filterRating(list)
    }
    renderOverzicht(list)

}

function filterPrice(list){
    var maxPrice = parseFloat(priceFilterInput.value);
    var filteredList = list.filter(game => game.price<=maxPrice);
    return filteredList;

}

function filterGenre(list){
    var selected = selectGenres.value;
    var filteredList = list.filter(game => game.genre==selected);
    return filteredList;
}

function filterRating(list){
    var selected = parseInt(selectRating.value);
    var filteredList = list.filter(game => game.rating<=selected);
    return filteredList;
}

function renderOverzicht(gamesToRender){
    gameList.innerHTML='';
    gamesToRender.forEach((game)=>{
        var gameBox = document.createElement("div");
        gameBox.classList.add("gameBoxStyle");
        var titelElem = document.createElement("h2");
        var genreElem = document.createElement("p");
        var ratingElem = document.createElement("p");
        var selectGameButton = document.createElement("input");
        
        selectGameButton.type = "checkbox"; 
        var i = winkelmand.findIndex(e=>e.name===game.title)
        if (i>-1){
            selectGameButton.checked = true;
        }
        
        titelElem.innerHTML = game.title;
        genreElem.innerHTML = game.genre;
        ratingElem.innerHTML = game.rating;
        gameBox.innerText = game.price;

        selectGameButton.dataset.name = game.title;
        selectGameButton.dataset.price = game.price;
        selectGameButton.addEventListener("click", addToCart);

        gameList.appendChild(gameBox);

        gameBox.appendChild(selectGameButton);
        gameBox.appendChild(titelElem);
        gameBox.appendChild(genreElem);
        gameBox.appendChild(ratingElem);
    });
}