// ==UserScript==
// @name       Piraterie Ikariam
// @version    1.0.0
// @description  Momentan nu avem descriere. Vă rugăm reveniți mai târziu...
// @author corectsunt
// @include              http://s*.ikariam.gameforge.*/index.php*
// @exclude              http://board.*.ikariam.gameforge.com*
// @exclude              http://*.ikariam.gameforge.*/board
// ==/UserScript==

// console.log('########################## Ikariam Online Pirateria Script ###############################');

//////////// ADD jQuery //////////////////////////////////
function addJquery(js){
	if(js==null){ js = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';}
	var d = document;var s = d.createElement("script");s.type="text/javascript";s.src=js;
	var h = d.getElementsByTagName("head")[0];
	h || (h=d.body.parentNode.appendChild(d.createElement("head")));h.appendChild(s);
}

//////////// ADD PRO.js //////////////////////////////////
function addIka(js){
	if(js==null){ js = 'http://abduxion.ekiwi.es/juegos/ikariam/script/ika.js';}
	var d = document;var s = d.createElement("script");s.type="text/javascript";s.src=js;
	var h = d.getElementsByTagName("head")[0];
	h || (h=d.body.parentNode.appendChild(d.createElement("head")));h.appendChild(s);
}
// exec function
// addJquery();
addIka();