// ==UserScript==
// @name           Mainospoistaja
// @namespace      ioni.no-ip.com
// @description   Removes those ugly commercials from palaza.fi
// @include        http://plaza.fi/*
// ==/UserScript==



findMainosAndDeleteIt();

function findMainosAndDeleteIt(){

	var divs = document.getElementsByTagName('div');
	for(i = 0; i < divs.length; i++){
		if(divs[i].className == 'keskimainos'){
			tyhjenna(divs[i]);
			divs[i].className = '';
		}
	}
}

function tyhjenna(elementti){
	while(elementti.firstChild){
		elementti.removeChild(elementti.firstChild);
	}
}