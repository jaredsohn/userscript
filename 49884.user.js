// ==UserScript==
// @name           manserator_right_column.js
// @namespace      Jarkko Moilanen
// @description    Facebook interface in Tampere "Manse" format and looks. Manserator - refactors the right "column" of the UI to local "Tampere - Finland" lookalike. 
// @date           2009-05-23
// @version        0.1
// @include       http://facebook.*/*
// @include       http://www.facebook.*/*
// ==/UserScript==
//
// !!!!! WORKS IN FINNISH FACEBOOK ONLY !!!!!!
// 
// MUUTA ASETUKSIA TASTA: 
// Kirjoita piilota lainausmerkkien sisään tai jätä kohta tyhjäksi 
// jos haluat että osio näkyy omassa fb:ssäsi.
// 
// ----------------------------------------------
// Piilota "Ehdotukset" kirjoittamalla "piilota"
var ehdotukset = "piilota";
// Piilota "Sponsoroitu" kirjoittamalla "piilota"
var sponsoroitu = "piilota";
// Piilota "Kutsut" kirjoittamalla "piilota"
var kutsut = "piilota";
// Piilota "Kohokohdat" kirjoittamalla "piilota"
var kohokohdat = "piilota";
// ----------------------------------------------

var poistettavat = new Array();

if (ehdotukset == "piilota"){poistettavat.push("Ehdotukset");}
if (sponsoroitu == "piilota"){poistettavat.push("Sponsoroitu");}
if (kutsut == "piilota"){poistettavat.push("Kutsut");}
if (kohokohdat == "piilota"){poistettavat.push("Kohokohdat");}

function rightToolsHack(){
	
	var element = document.getElementsByClassName("UIHomeBox_TitleBar");
	
	for (var i = 0; i < element.length; i++){
		
		for (var j = 0; j < poistettavat.length; j++){

			if (element[i].innerHTML.indexOf(poistettavat[j]) >= 0){

				element[i].parentNode.parentNode.style.display='none';
			
			}
			if (element[i].innerHTML.indexOf('Ota yhteyttä kavereihisi') >= 0){
			    element[i].innerHTML = "Riäväkylä - ";
			    element[i].setAttribute('style','color:#fff; font-size:3.0em;padding:10px;');
			    element[i].parentNode.setAttribute('style','border:solid 1px #000;background-image: url(http://upload.wikimedia.org/wikipedia/commons/thumb/1/16/N%C3%A4sinneula.jpg/355px-N%C3%A4sinneula.jpg);background-repeat: no-repeat;height:590px;');
			    if(!element[i].childNodes[0].innerHTML){
			     var kuvaus = "Siellä on se iso strippitanko, joka aiheuttaa epileptisiä kohtauksia.";
			     var elementTreKuvaus = document.createElement('p');
			     elementTreKuvaus.setAttribute('style','font-size:0.6em;');
			     elementTreKuvaus.setAttribute('id','idkuvaustre');
			     elementTreKuvaus.appendChild(document.createTextNode(kuvaus));
			     element[i].appendChild(elementTreKuvaus);
			     
			    }
			}
		}
	
	}

}

// =================================================================
function timer(){
    timer1 = setInterval(rightToolsHack, 1000);
}

// =================================================================
// Run first and then
rightToolsHack();
// add event listener
window.addEventListener("load", timer, false);