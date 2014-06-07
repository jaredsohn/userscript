// ==UserScript==
// @name        HT-NRG : Advanced Player Info
// @author	_eNeRGy_
// @homepage	http://nrgjack.altervista.org
// @namespace	HT-NRG
// @version 	0.0
// @description	Add stuffs to player's pages
// @copyright	© _eNeRGy_, 2008-2010
// @include	http://*.hattrick.*/Club/Players/Player.aspx?playerId=*
// ==/UserScript==

// mainBody.setAttribute('style','background-color:red;');
//forma.setAttribute('style','background-color:red;');

var mainBody = document.getElementById('mainBody');
var a = getElementsByClassName('skill', mainBody);

var formaLink = a[0];
var resistenzaLink = a[1]; //a[7]
var esperienzaLink = a[5];
var carismaLink = a[6];
var parateLink = a[8];
var regiaLink = a[9];
var passaggiLink = a[10];
var crossLink = a[11];
var difesaLink = a[12];
var attaccoLink = a[13];
var calciPiazzatLink = a[14];

var forma = getNumber(formaLink);
var resistenza = getNumber(resistenzaLink);
var esperienza = getNumber(esperienzaLink);
var carisma = getNumber(carismaLink);
var parate = getNumber(parateLink);
var regia = getNumber(regiaLink);
var passaggi = getNumber(passaggiLink);
var cross = getNumber(crossLink);
var difesa = getNumber(difesaLink);
var attacco = getNumber(attaccoLink);
var calciPiazzat = getNumber(calciPiazzatLink);




function getNumber(link){
	var href = link.href;
	var hrefQuestion = href.split("?")[1];
	var regex = new RegExp(/\d{1,2}/);
	var m = regex.exec(hrefQuestion);
	return m[0];
}

function getElementsByClassName(classname, node) {
	if(!node) node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++)
	if(re.test(els[i].className))a.push(els[i]);
	return a;
}
