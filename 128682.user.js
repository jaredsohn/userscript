// ==UserScript==
// @name                Pene-izer
// @namespace	        JuasJuasJuas
// @description	        Fran Is the best
// @include		*
// ==/UserScript==


var linkArray = document.getElementsByTagName("a");
for(var a=0;a<linkArray.length-1;a++){
	linkArray[a].innerHTML= linkArray[a].innerHTML + 'Pene';
}

var buttonArray = document.getElementsByTagName("input");
for(var a=0;a<buttonArray.length-1;a++){
	if(buttonArray[a].type == 'submit'){
		buttonArray[a].value= buttonArray[a].value + 'Pene';
	}
}
