// ==UserScript==
// @name				aktienRechner
// @author				Ferdie_der_Hamster
// @description			aktienRechner
// @include				http://www.zityland.net/index.php*cmd=aktiekaufen*
// @include				http://www.zityland.net/index.php?cmd=kaufen*
// ==/UserScript==

var formular = document.forms[0];
var cell = document.getElementsByClassName('forum1')[0];
var newInput = document.createElement('input');
var newTr = document.createElement('input');
var newTd = document.createElement('input');

var aktCountIt = function(){
	anzahl = parseFloat(formular.kaufmenge.value);
	preis = parseFloat(formular.aktienpreis.value)
	
	gesamt = anzahl*preis;
	newInput.value = kaufm(gesamt);
};

var marktCountIt = function(){
	anzahl = parseFloat(formular.kaufmenge.value);
	preis = parseFloat(formular.kaufvkpreis.value)
	
	gesamt = anzahl*preis;
	newInput.value = kaufm(gesamt);
};

function kaufm(x) {
	  var k = (Math.round(x * 100) / 100).toString();
	  k += (k.indexOf('.') == -1)? '.00' : '00';
	  return k.substring(0, k.indexOf('.') + 3);
}

function createMenu(){
	
	if(document.URL.match(/cmd=aktiekaufen/))
		formular.kaufmenge.onkeyup = aktCountIt;
	else if(document.URL.match(/cmd=kaufen/))
		formular.kaufmenge.onkeyup = marktCountIt;
	
	newInput.type = 'text';
	newInput.setAttribute('id', 'newInput');
	newInput.style.display = 'block';
	newInput.style.width = '75px';
	
	formular.parentNode.appendChild(document.createElement('br')); 
	formular.parentNode.appendChild(document.createTextNode('Preis: '));
	formular.parentNode.appendChild(newInput);
		
}

function main(){
	createMenu();
	if(document.URL.match(/cmd=aktiekaufen/))
		newInput.value = 0;
	else if(document.URL.match(/cmd=kaufen/))
		marktCountIt();
	
	
	
}

main();
