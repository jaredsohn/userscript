// ==UserScript==
// @name           LaStationLaMoinsChere
// @namespace      LaStationLaMoinsChere
// @description    Affiche les stations les moins chères sur la carte de http://www.prix-carburants.gouv.fr
// @include        http://www.prix-carburants.gouv.fr/index.php?module=dbgestion&action=search
// ==/UserScript==

function $xa( query ) {
	var res = document.evaluate( query, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
	var element, array = [];
	while ( ( element = res.iterateNext() ) ) {
		array.push( element );
	}
	return array;
}

function draw(set) {
	for(i=0;i<set.length;i++) {
		if (document.getElementById("pompe_"+set[i].pompe)) {
			img=document.getElementById("pompe_"+set[i].pompe);
			img.src=src;
			if (i<set.length/3) img.style.backgroundColor='green';
			else if (i<2*set.length/3) img.style.backgroundColor='orange';
			else img.style.backgroundColor='red';
		}
	}
}

var s = new Array();
var src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAASBAMAAAB2sJk8AAAAAXNSR0IArs4c6QAAABJQTFRFY29sPD485Obk/Pb0/P78////iAkMcwAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2wMGEwU6c/1TngAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABFSURBVAjXYwg2BgLT0AAGAwYgYAYxQCJwBqMpBkMYpkYYpgvICAYxhGEMQUEDCMPREMowNMQtooghAtQe6uzi4hJsHAAA9PkUzdM1vh4AAAAASUVORK5CYII=";

function main(){
	//alert('toto');
	var stationsPrix = $xa( "//div[starts-with(@id,'prix')]" );
	var out ='';
	stationsPrix.forEach( function(i) {
		i.textContent.trim().replace(/\s+/g,' ').split(' - ').forEach( function (j) {
			s.push( { pompe :i.id.split('_')[1], carb: j.split(' : ')[0], prix: j.split(' : ')[1] } );
		} );
	} );
	s.sort(function(a,b){return a.prix > b.prix;})

	
	document.getElementsByTagName('h2')[0].appendChild(document.createTextNode(' [ ' + s[0].prix + ' <= '));
	legend = document.getElementsByTagName('h2')[0].appendChild(document.createElement('img'));
	legend.src=src;
	legend.style.backgroundColor='green';
	document.getElementsByTagName('h2')[0].appendChild(document.createTextNode(' < ' + s[Math.floor(s.length/3)].prix + ' <= '));
	legend = document.getElementsByTagName('h2')[0].appendChild(document.createElement('img'));
	legend.src=src;
	legend.style.backgroundColor='orange';
	document.getElementsByTagName('h2')[0].appendChild(document.createTextNode(' < ' + s[Math.floor(2*s.length/3)].prix + ' <= '));
	legend = document.getElementsByTagName('h2')[0].appendChild(document.createElement('img'));
	legend.src=src;
	legend.style.backgroundColor='red';
	document.getElementsByTagName('h2')[0].appendChild(document.createTextNode( ' <= ' + s[s.length-1].prix + ' ]'));
	draw(s);

}

window.addEventListener("load", main, false);
window.addEventListener("load", function(){setInterval(function(){ draw(s); },2000);}, false);