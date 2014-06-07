// ==UserScript==
// @name           mafiosi profiel kladblok
// @namespace      mafiosi profiel kladblok
// @include        http://mafiosi.nl/user.php?naam=*
// @include        http://www.mafiosi.nl/user.php?naam=*
// ==/UserScript==

var url = window.location.href;
var naam = url.split('naam=');
var naam = naam[1];


if(naam.indexOf("submit") > 0){
var naam = naam.split('&submit=');
var naam = naam[0];
}

var naam = naam.toLowerCase();

var kladblok = GM_getValue('kladblok_'+naam);
if(!kladblok){
GM_setValue('kladblok_'+naam, 'Geen notities over deze speler.'); 
}
var kladblok = GM_getValue('kladblok_'+naam);



var tr = document.createElement("tr");
tr.id = 'kladblok_tr';
var tekst = '</th><td colspan="2"><textarea id="kladblok" name="kladblok" rows="5" cols="50">' + kladblok + '</textarea><br /><input type="button" value="Save" name="save" id="save"></td>';
tr.innerHTML = tekst;

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function save(){
	var kladblok2 = document.getElementById('kladblok').value;
	GM_setValue('kladblok_'+naam, kladblok2);

	alert('Wijzigingen opgeslagen');
}


var trold = document.getElementsByTagName('table')[1];
insertAfter(trold, tr)

var button = document.getElementById('save');
button.addEventListener('click', save, false);