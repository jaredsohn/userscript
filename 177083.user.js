// ==UserScript==
// @name		assistance hunter
// @namespace		tehnyk
// @description		HWM mod - assistance hunter (by tehnyk)
// @homepage		
// @version		1.0.0
// @include		http://*heroeswm.*/group_wars.php*
// @include		http://www.heroeswm.ru/group_wars.php*

// ==/UserScript==


// http://*.heroeswm.*/group_wars.php*

var version = '1.0.0';

var url_cur = group_wars.php;
var url = 'http://www.heroeswm.ru/group_wars.php';


var scripts = tag('script');
var Timeout1;
var check = 0;

for (var i=scripts.length; i--;) {
if (scripts[i].innerHTML.indexOf("setTimeout")!=-1 ) {
	if (scripts[i].innerHTML.indexOf("Delta=")!=-1 ) {
		Timeout1 = scripts[i].innerHTML.split("\n")[1].replace(/.*Delta=(\d+).*/, "$1");
		if (Timeout1 < 2) { check = 1; }
	}
	else {
	check = 1;
//	alert("assistance hunter does not work on the current page!");
	}
}
}

if ( check == 0 ) {
setTimeout(function() { window.location=url_cur; }, 34000);
}

function $( id ) { return document.getElementById( id ); }

function tag( id ) { return document.getElementsByTagName( id ); }