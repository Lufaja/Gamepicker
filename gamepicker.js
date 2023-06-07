var overzichtScherm = document.getElementById("overzicht");
var winkelmandjeScherm = document.getElementById("winkelmandje");
var switchButton = document.getElementById("switchButton");
switchButton.addEventListener("click", switchScreens);

var winkelmand = [];

winkelmandjeScherm.style.display = "none";
// console.log(games);

games.forEach((game)=>{
    var gameBox = document.createElement("div");
    gameBox.classList.add("gameBoxStyle");

    var titelElem = document.createElement("h2");
    var selectGameButton = document.createElement("input");

    selectGameButton.type = "checkbox"; 

    titelElem.innerHTML = game.title;
    gameBox.innerText = game.price;

    selectGameButton.dataset.name = game.name;
    selectGameButton.dataset.price = game.price;
    selectGameButton.addEventListener("click", addToCart);

    overzichtScherm.appendChild(gameBox);
    gameBox.appendChild(selectGameButton);
    gameBox.appendChild(titelElem);
    console.log(game.title);
});

function switchScreens() {
    if (overzichtScherm.style.display == "none"){
        overzichtScherm.style.display = "block";
        winkelmandjeScherm.style.display = "none";
    } else {
        overzichtScherm.style.display = "none";
        winkelmandjeScherm.style.display = "block";
    }
}

function addToCart() {
    winkelmand.push({name: this.dataset.name, price: this.dataset.price});
}