// ==UserScript==
// @name           Facebook Notifications
// @namespace      Nickc
// @include        http://www.facebook.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://usocheckup.redirectme.net/71186.js
// @version	1.9.1
// ==/UserScript==

function removertexto(texto,palabra) {
	var Ipos, Fpos;
	Ipos = texto.indexOf(palabra);
	if (Ipos > -1) {
		Fpos = Ipos + palabra.length ;
		texto = texto.substring(Ipos, Fpos);
	}
	return texto ;
};

function precambiar() {
	var loadingimg = document.getElementById('presence_notifications_loading') ;
	if ( loadingimg ) {
	//	console.log("No cambia");
		window.setTimeout(precambiar, 500);
		return ;
	}
	else {
	//	console.log("iniciando cambiar");
		cambiar() ;
	}
};

function cambiar() {
	$('#jewelNotifs').find('.jewelItemNew').removeClass('jewelItemNew').css("background-color","#d8dfea");
	var lindidbol;
	var linkid = new Array();
	var borrar = new Array();
	var allLi = document.getElementById('jewelNotifs').getElementsByTagName('a') ;
	for (var inc = 0; inc < allLi.length; inc++) {
		thisli = allLi[inc];
		linkidbol = 'Si' ;
		for (var incr = 0; incr < linkid.length; incr++) {
			if ( thisli.href == linkid[incr] ) {
				linkidbol = 'no';	
				borrar.push(thisli) ;
			}
		}
		if ( linkidbol == 'Si' ) {
			linkid.push(thisli.href) ;
		}
	}
	for (var ind in borrar ) {
		borrar[ind].parentNode.parentNode.removeChild(borrar[ind].parentNode);
	}
};

var allnot, thisnot;
allnot = document.evaluate(
    '//a[@id="jewelNotif"]',
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
thisnot = allnot.snapshotItem(0);
document.addEventListener('click', function(event) {
    // event.target is the element that was clicked
	if (event.target == thisnot ) {
		precambiar();
	}
}, true);