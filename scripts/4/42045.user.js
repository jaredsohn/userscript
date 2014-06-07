// ==UserScript==
// @name           Lambda auto select
// @namespace      ikariam
// @description    Automatyczny wybor swiata lambda na serwerze ikariam.pl
// @include        http://ikariam.pl/
// @include        http://www.ikariam.pl/
// ==/UserScript==

var testerror = document.getElementById('text').getElementsByTagName('h1');
if ( testerror[0].innerHTML == 'Error!'){
	window.location="http://ikariam.pl/";
}

if ( document.getElementById('universe') != null ){
	var opts = document.getElementById('universe').getElementsByTagName('option');
	opts[10].selected = true;
}