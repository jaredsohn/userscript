// ==UserScript==
// @name        Ukrywanie filmów bez lektora na stronie seans-online.eu
// @description Hide subtitled and original english movies at seans-online.eu
// @version     1.1
// @include     http://seans-online.eu/*
// @include     http://www.seans-online.eu/*
// ==/UserScript==
var content=[]; //global table, containing hidden divs contents
function divlist(){
	var regexp=/Napisy|ENG/; //we are looking for movies with "Tłumaczenie: Napisy" or "Tłumaczenie: ENG"
 	var d = document.getElementsByClassName('right-box-film-list'); //get the list of divs containing movies descriptions
	for(i=0;i<=d.length;i++){ //for each such a div ...
		if (d[i].innerHTML.search(regexp) != -1){ //if the div contains the string we are looking for ...
			content[i]=d[i].innerHTML; //copy the contents for use later
			d[i].innerHTML="Ukryty. Kliknij aby odkryć!";
			d[i].addEventListener("click", reverse, false); //add onclick event to show the divs
		}
	}
	return content; //return current content
 }

function reverse(){
	var regexp=/odkryć/; //we are looking for hidden divs
 	var d = document.getElementsByClassName('right-box-film-list');
	for(i=0;i<=d.length;i++){
		if (d[i].innerHTML.search(regexp) != -1){
			d[i].innerHTML=content[i]; //copy the contents back
		}
	}
 }
divlist();