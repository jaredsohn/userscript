// ==UserScript==
// @name			Vegzetur lelekszivas osszegzes
// @author			cyla
// @namespace		http://dev.jmk.hu/userscripts/vegzetur
// @description		Vegzetur lelekszivas osszegzes
// @include			http://*.doomlord.net/index.php?m=csataleiras*
// @include			http://*.vegzetur.hu/index.php?m=csataleiras*
// @exclude			http://forum.vegzetur.hu/*
// ==/UserScript==

(function(){

var drain = 0;

var spans = document.getElementsByTagName( "span" );
for ( var i = 0; i < spans.length; i++ ) {
	if ( spans[i].getAttribute( "class" ) == "drain" ) {
		drain += parseInt( spans[i].innerHTML.replace( /.*?([+-]\d+) .*/, "$1" ) );
	}
}

if ( drain != 0 ) {
	var divs = document.getElementsByTagName( "div" );
	for ( var i = 0; i < divs.length; i++ ) {
		if ( ( divs[i].getAttribute( "class" ) == "result_win" ) || ( divs[i].getAttribute( "class" ) == "result_loss" ) ) {
			divs[i].innerHTML = divs[i].innerHTML.replace( /(.*? \d+) (.*)/, "$1 (" + ( drain > 0 ? "+" : "" ) + drain + ") $2" );
		}
	}
}

})();