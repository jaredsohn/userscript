// ==UserScript==
// @name			Facepunch Title Fixer
// @namespace	http://*.facepunch.com/
// @description	Makes large titles less annoying without removing them completely.
// @include		*
// ==/UserScript==

var titles = document.getElementsByClassName( "usertitle" );

for ( var i in titles )
{
	var t = titles[i];
	
	if ( t.clientHeight > 200 )
	{
		var f = t.getElementsByTagName( "font" );
		for ( var j in f ) { f[j].size = "4"; f[j].bold = "1"; }
	}
}