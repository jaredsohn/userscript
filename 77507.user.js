// ==UserScript==
// @name           Geizhals
// @namespace      ASD
// @include        http://geizhals.at/*
// ==/UserScript==


var tabelle = document.getElementById('content_table');
var alleZeilen = tabelle.getElementsByTagName('tr');
var geloescht = 0;

if (document.URL.indexOf('?cat') > -1){

for (var i=1;i<alleZeilen.length;i++){

if ( (alleZeilen[i].innerHTML.indexOf("(zu wenige)") >-1)  || (alleZeilen[i].innerHTML.indexOf("User-Beitr") < 0)){		
	alleZeilen[i].style.backgroundColor  = 'red';
	//geloescht++;
} else if ((alleZeilen[i].innerHTML.indexOf("1 x") >-1) || (alleZeilen[i].innerHTML.indexOf("2 x") >-1)||(alleZeilen[i].innerHTML.indexOf("3 x") >-1)||(alleZeilen[i].innerHTML.indexOf("4 x")>-1)||(alleZeilen[i].innerHTML.indexOf("5 x") >-1)){
	alleZeilen[i].style.backgroundColor  = 'yellow';
} else {
	alleZeilen[i].style.backgroundColor  = 'green';
}
	

}
}
//alert(geloescht);
	