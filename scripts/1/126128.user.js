// ==UserScript==
// @name		ThatsNOTHot
// @namespace	arne.wendt@tuhh
// @version		0.1.0
// @description 	No What's Hot in G+
//
// @include		*plus.google.com/u/*
//
// ==/UserScript==

function chill(){
	var divs = document.getElementsByTagName("div");
	
	for(var i=0; i<divs.length; i++){
		if(divs[i].className.indexOf(" ch") != -1){
			divs[i].parentNode.removeChild(divs[i]);
		}
	}
}

window.addEventListener('DOMSubtreeModified', chill,true);
window.addEventListener('load', chill,true);
chill();