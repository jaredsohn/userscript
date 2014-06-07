// ==UserScript==
// @name           Pokemon Hex
// @namespace      http://*
// @description    Battle and capture Pokemon in your browser!
// @include        http://*
// ==/UserScript==

// Pokemon Hex, Ver. 1.0
// by Rayna (Elyneara) 
// Current version supports the first 151 Pokemon
// E-mail: Elyneara@gmail.com with questions and comments
// Feel free to modify and edit my code. 
// Please e-mail me with improvements.

// All Pokemon images are copyright to Nintendo.
// Resources used:  
// Serebii.net, Bulbapedia, http://www.pokemonelite2000.com, 
// Klnothincomin, http://www.spriters-resource.com
// Thank you for the sprites and inspiration.
// Images hosted on Photobucket, Username: PokemonHex



(function () {



// Element Definitions
// env: Environment elements (terrain)
// re: Random Event elements (pokemon encounters)
// dex: Pokedex elements
// menu: Pokemenu elements (opens Pokemon Menu, shows the trainer)
// teamX: Pokemon Team elements (6 Pokemon team, one pokemon per element)
// atk: Pokemon attack elements

var env = document.createElement("div");

var re = document.createElement("div");
var dex = document.createElement("div");
var dexhp = document.createElement("div");
var dexsc = document.createElement("div");
var menu = document.createElement("div");
var team1 = document.createElement("div");
var team2 = document.createElement("div");
var team3 = document.createElement("div");
var team4 = document.createElement("div");
var team5 = document.createElement("div");
var team6 = document.createElement("div");
var atk = document.createElement("div");
// END Element Definitions




// Random Number Generators.
// Event: Likelyhood of a random encounter happening
// Poke: Pokemon ID #, to be inserted into URLs and in the Pokedex. 
// Shiny: Likelihood of Shiny Version Showing up. 
// HP: Pokemon's HP will be random between 50 and 150

var event=Math.floor(Math.random()*10)
var poke=Math.floor(Math.random()*152)
var shiny=Math.floor(Math.random()*20)
var hp=Math.floor(50+Math.random()*100)
var attk=0;

// END random Number Generators





// Layout Section
// this section determines the placement of each image.
env.style.position = "fixed";
env.style.left = "0px";
env.style.bottom = "0px";
env.style.padding = "0px";
env.style.zIndex = "1000";

re.style.position = "fixed";
re.style.left = "35px";
re.style.bottom = "0px";
re.style.padding = "0px";
re.style.zIndex = "1001";

dex.style.position = "fixed";
dex.style.left = "155px";
dex.style.bottom = "2px";
dex.style.padding = "0px";
dex.style.zIndex = "1003";

dexsc.style.position = "fixed";
dexsc.style.left = "159px";
dexsc.style.bottom = "0px";
dexsc.style.padding = "0px";
dexsc.style.zIndex = "1002";

dexhp.style.position = "fixed";
dexhp.style.left = "185px";
dexhp.style.bottom = "15px";
dexhp.style.padding = "0px";
dexhp.style.zIndex = "1003";

menu.style.position = "fixed";
menu.style.right = "0px";
menu.style.bottom = "0px";
menu.style.padding = "0px";
menu.style.zIndex = "1000";

team1.style.position = "fixed";
team1.style.right = "120px";
team1.style.bottom = "30px";
team1.style.padding = "0px";
team1.style.zIndex = "1000";

team2.style.position = "fixed";
team2.style.right = "90px";
team2.style.bottom = "30px";
team2.style.padding = "0px";
team2.style.zIndex = "1001";

team3.style.position = "fixed";
team3.style.right = "60px";
team3.style.bottom = "30px";
team3.style.padding = "0px";
team3.style.zIndex = "1002";

team4.style.position = "fixed";
team4.style.right = "120px";
team4.style.bottom = "0px";
team4.style.padding = "0px";
team4.style.zIndex = "1000";

team5.style.position = "fixed";
team5.style.right = "90px";
team5.style.bottom = "0px";
team5.style.padding = "0px";
team5.style.zIndex = "1001";

team6.style.position = "fixed";
team6.style.right = "60px";
team6.style.bottom = "0px";
team6.style.padding = "0px";
team6.style.zIndex = "1002";

atk.style.position = "fixed";
atk.style.left = "0px";
atk.style.bottom = "0px";
atk.style.padding = "0px";
atk.style.zIndex = "1005";
//END Layout Section




// General Users may start editing here.



//Pokemenu (pokemon Team)
//Pokemenu Icon

menu.innerHTML = '<img src="http://i921.photobucket.com/albums/ad57/PokemonHex/Item1.png"  />';

//Pokemenu Event Listener: Opens the Pokemenu
menu.addEventListener('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
(function m(){

// Trainer: 
// To change: PokemonHex supports 11 unique trainers,
// change "Trainer01.png" to "Trainer02.png", "Trainer03.png" etc.
// Females: 01-06     Males: 07-11
// OR: find a trainer icon, upload the image to an external image server,
// Replace everything between the " " (double quotes) with that URL.

menu.innerHTML = '<img src="http://i921.photobucket.com/albums/ad57/PokemonHex/Trainer1.png"  />';

// PokeTeam Section
// to change the Pokemon in your team replace the number right before 
// '.png' with the Pokemon's National Pokedex Number, 3 digits (001/151/050 etc).
// You will need to change the attacks as well, scroll down.

//Pokemon1
team1.innerHTML = '<img src="http://i921.photobucket.com/albums/ad57/PokemonHex/PokemonTeam/026.png" />';

//Pokemon2
team2.innerHTML = '<img src="http://i921.photobucket.com/albums/ad57/PokemonHex/PokemonTeam/151.png" />';

//Pokemon3
team3.innerHTML = '<img src="http://i921.photobucket.com/albums/ad57/PokemonHex/PokemonTeam/006.png" />';

//Pokemon4
team4.innerHTML = '<img src="http://i921.photobucket.com/albums/ad57/PokemonHex/PokemonTeam/027.png" />';

//Pokemon5
team5.innerHTML = '<img src="http://i921.photobucket.com/albums/ad57/PokemonHex/PokemonTeam/148.png" />';

//Pokemon6
team6.innerHTML = '<img src="http://i921.photobucket.com/albums/ad57/PokemonHex/PokemonTeam/077.png" />';
// END PokeTeam Section

})();
}, true);
// END Pokemenu Event Listener




//Pokemon Attacks
if(event == 0){ 



// Pokemon1 Attack
team1.addEventListener('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
(function attack(){

atk.innerHTML = '<img src="http://i14.photobucket.com/albums/a302/elyneara/Pokemon/Rock-Smash-1.gif" />';
attk= Math.floor(40+Math.random()*5);

})();
}, true);
// END Pokemon1 attack



// Pokemon2 Attack
team2.addEventListener('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
(function attack(){

atk.innerHTML = '<img src="http://i14.photobucket.com/albums/a302/elyneara/Pokemon/Rock-Smash-1.gif" />';
attk= Math.floor(30+Math.random()*10);

})();
}, true);
// END Pokemon2 Attack



// Pokemon3 Attack
team3.addEventListener('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
(function attack(){

atk.innerHTML = '<img src="http://i14.photobucket.com/albums/a302/elyneara/Pokemon/Rock-Smash-1.gif" />';
attk= Math.floor(100+Math.random()*20);

})();
}, true);
// END Pokemon3 Attack



// Pokemon4 Attack
team4.addEventListener('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
(function attack(){

atk.innerHTML = '<img src="http://i14.photobucket.com/albums/a302/elyneara/Pokemon/Rock-Smash-1.gif" />';
attk= Math.floor(30+Math.random()*5);

})();
}, true);
// END Pokemon4 Attack



//Pokemon5 Attack
team5.addEventListener('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
(function attack(){

atk.innerHTML = '<img src="http://i14.photobucket.com/albums/a302/elyneara/Pokemon/Rock-Smash-1.gif" />';
attk= Math.floor(60+Math.random()*20);

})();
}, true);
// END Pokemon5 Attack



//Pokemon6 Attack
team6.addEventListener('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
(function attack(){

atk.innerHTML = '<img src="http://i14.photobucket.com/albums/a302/elyneara/Pokemon/Rock-Smash-1.gif" />';
attk= Math.floor(50+Math.random()*40);

})();
}, true);
// END Pokemon6 Attack
}

else {
re.innerHTML += '';
}

// Stop Attack
atk.addEventListener('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
(function stop()
{

atk.innerHTML = '';
hp -= attk
dexhp.innerHTML = '<sub>Hp: ' + hp +'</sub>';

})();
}, true);
// END Pokemon Attacks
//END Pokemenu




// General users need not edit beyond this point.






//Pokemon! Random Encounter Section

//Capture Event Listener: Makes Randomly Encountered Pokemon Clickable + Capturable
re.addEventListener('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
(function capture()
{

if(hp >= 40){
re.innerHTML = '<sub> The pokemon <br>Ran Away!<sub><br><br><Br>';
}
else if (hp <= 0){
re.innerHTML = '<img src="http://i921.photobucket.com/albums/ad57/PokemonHex/X.png" />';
}
else{

re.innerHTML = '<img src="http://i921.photobucket.com/albums/ad57/PokemonHex/Pokeball.png" />';

}
})();
}, true);
//END Capture Event Listener




//If event=0 a random encounter occurs
if(event == 0){ 

//If shiny=0 the pokemon is shiny
if(shiny == 0){ 
re.innerHTML += '<img src="http://i921.photobucket.com/albums/ad57/PokemonHex/AllPokemon/' + poke + 'S.gif" />';
}

//if shiny /=0 a regular pokemon is encountred
else {
re.innerHTML += '<img src="http://i921.photobucket.com/albums/ad57/PokemonHex/AllPokemon/' + poke + 'N.gif" />';
}


}

// if event /=0 no pokemon is encountered.
else {
re.innerHTML += '';
}

// END Pokemon! Random Encounter Section



//Terrain
// updated through # 151

if (event == 0){

// Night
if ((poke == 23)||(poke == 24)||(poke == 52)||(poke == 53)||
(poke == 92)||(poke == 93)||(poke == 94)){
env.innerHTML = '<img src="http://i921.photobucket.com/albums/ad57/PokemonHex/Night.png" />';
}

// Cave
else if ((poke == 5)||(poke == 4)||(poke == 6)||(poke == 31)||
(poke == 34)||(poke == 35)||(poke == 36)||(poke == 41)||
(poke == 42)||(poke == 46)||(poke == 47)||(poke == 66)||
(poke == 67)||(poke == 68)||(poke == 74)||(poke == 75)||
(poke == 76)||(poke == 95)||(poke == 100)||(poke == 101)||
(poke == 104)||(poke == 105)||(poke == 111)||(poke == 112)||
(poke == 126)||(poke == 138)||(poke == 139)||(poke == 140)||
(poke == 141)||(poke == 142)) {
env.innerHTML = '<img src="http://i921.photobucket.com/albums/ad57/PokemonHex/Cave.png" />';
}

// Sand
else if ((poke == 27)||(poke == 28)||(poke == 50)||(poke == 79)||
(poke == 80)||(poke == 90)||(poke == 91)||(poke == 98)||(poke == 99)){
env.innerHTML = '<img src="http://i921.photobucket.com/albums/ad57/PokemonHex/Sand.png" />';
}

// Snow
else if ((poke == 86)||(poke == 87)||(poke == 144)){
env.innerHTML = '<img src="http://i921.photobucket.com/albums/ad57/PokemonHex/Snow.png" />';
}

// Water
else if ((poke == 7)||(poke == 8)||(poke == 9)||(poke == 54)||
(poke == 55)||(poke == 60)||(poke == 61)||(poke == 62)||
(poke == 72)||(poke == 73)||(poke == 116)||(poke == 117)||
(poke == 118)||(poke == 119)||(poke == 120)||(poke == 121)||
(poke == 129)||(poke == 130)||(poke == 131)||(poke == 134)||
(poke == 147)||(poke == 148)) {
env.innerHTML = '<img src="http://i921.photobucket.com/albums/ad57/PokemonHex/Water.png" />';
}

// Field
else if ((poke == 12)||(poke == 16)||(poke == 29)||(poke == 32)||
(poke == 49)||(poke == 63)||(poke == 77)||(poke == 78)||
(poke == 84)||(poke == 85)||(poke == 128)||(poke == 132)||
(poke == 133)){
env.innerHTML = '<img src="http://i921.photobucket.com/albums/ad57/PokemonHex/Field.png" />';
}

// Inside
else if ((poke == 64)||(poke == 65)||(poke == 81)||(poke == 82)||
(poke == 88)||(poke == 89)||(poke == 96)||(poke == 97)||
(poke == 106)||(poke == 107)||(poke == 109)||(poke == 110)||
(poke == 113)||(poke == 122)||(poke == 124)||(poke == 137)||
(poke == 150)){
env.innerHTML = '<img src="http://i921.photobucket.com/albums/ad57/PokemonHex/Indoor.png" />';
}

// Grass
else {
env.innerHTML = '<img src="http://i921.photobucket.com/albums/ad57/PokemonHex/Grass.png" />';
}
}
else {
env.innerHTML = '<img src="http://i921.photobucket.com/albums/ad57/PokemonHex/Grass.png" />';
}
//END Terrain



// Pokedex. Will only appear if a pokemon appears
// displays the pokemon ID# with a link to Bulbapedia search
if (event == 0) {

// Displays Pokemon's national # and links to Bulbapedia search.

dexsc.innerHTML += '<img src="http://i921.photobucket.com/albums/ad57/PokemonHex/Pokedexscreen.png" border="0" />';

dex.innerHTML += '<a href="http://bulbapedia.bulbagarden.net/wiki/' + poke + '" target="New Window">' + '<img src="http://i921.photobucket.com/albums/ad57/PokemonHex/pokedex.png" border="0" />' + '</a>';

dex.innerHTML += '<sub># ' + poke + '</sub>';

//If the pokemon is shiny: displays * after the #
if (shiny == 0){
dex.innerHTML += '<sub>*</sub>';
}
else {
dex.innerHTML += '';
}

//If the pokemon is fake: displays _Fake after the #

if (poke == 0) {

dex.innerHTML += '<sub>_Fake</sub>';
}

else if (poke >= 494) {

dex.innerHTML += '<sub>_Fake</sub>';
}
else {
dex.innerHTML += '';
}

dexhp.innerHTML += '<sub>Hp: ' + hp +'</sub>';

}
else {
dex.innerHTML += '';
}
// END Pokedex




//These let the HTML work for the elements (env, re, dex, menu, teamx and atk)
document.body.appendChild(env);

document.body.appendChild(re);
document.body.appendChild(dex);
document.body.appendChild(dexhp);
document.body.appendChild(dexsc);

document.body.appendChild(menu);
document.body.appendChild(team1);
document.body.appendChild(team2);
document.body.appendChild(team3);
document.body.appendChild(team4);
document.body.appendChild(team5);
document.body.appendChild(team6);
document.body.appendChild(atk);

})();
