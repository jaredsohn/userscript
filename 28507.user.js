// ==UserScript==
// @name        Ben 10 DNA Lab
// @description Lista alguns códigos que podem ser usados no jogo Ben 10 DNA Lab.
// @version     1.0.1
// @include     http://www.bandai.com/ben10/*
// @include     http://ben10alienforce.com.br/jogos/dna-lab/
// @include     http://ben10jogos.com.br/aliens/dna-lab/
// ==/UserScript==

var newDiv = document.createElement("div");
newDiv.style.border = "2px dotted white";
newDiv.style.font = "normal normal normal 7pt Verdana";
newDiv.style.color = "white";
newDiv.style.backgroundColor = "black";
newDiv.style.position = "fixed";
newDiv.style.top = "0";
newDiv.style.left = "0";
newDiv.style.zIndex = "1000";
var characterList = "";
characterList += addCharacter("Benmummy",    "ansn", "Ben Múmia");
characterList += addCharacter("Benvicktor",  "pkmn", "Ben Víctor");
characterList += addCharacter("Benwolf",     "ypet", "Lobisben");
characterList += addCharacter("CannonBolt",  "swor", "Raio de Canhão");
characterList += addCharacter("Diamondhead", "taki", "Diamante");
characterList += addCharacter("Fourarms",    "nori", "Quatro Braços");
characterList += addCharacter("Ghostfreak",  "rsam", "Fantasmático");
characterList += addCharacter("Gwen",        "mura", "Gwen");
characterList += addCharacter("Heatblast",   "kenm", "Chama");
characterList += addCharacter("Stinkfly",    "aval", "Insectóide");
characterList += addCharacter("Upchuck",     "bafa", "Ultra Berto");
characterList += addCharacter("Upgrade",     "funa", "Ultra T");
characterList += addCharacter("Wildmutt",    "bric", "Besta");
characterList += addCharacter("Vilgax",      "akec", "Vilgax");
characterList += addCharacter("Wildvine",    "rame", "Vinha Selvagem");
characterList += addCharacter("XLR8",        "wjas", "XLR8");
newDiv.innerHTML = "<table><tr><th>Character</th><th>Code</th></tr>" + characterList + "</table>";
document.body.insertBefore(newDiv, document.body.firstChild);

function addCharacter(name, code, namePtBr) {
	return "<tr><td><span style='cursor: help;' title='" + namePtBr + "'>" + name + "</span></td><td>" + code +"</td></tr>";
}
