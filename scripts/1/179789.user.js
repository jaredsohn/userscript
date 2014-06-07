// ==UserScript==
// @name		Droid is the new Courier
// @description Use Droid Sans Mono instead of Courier or monospace
// @author		Tommy.Reynolds@Megacoder.com
// @namespace	megacoder
// @version		1.05
// @date		2013-10-19
// @run-at		document-start
// @include		*
// ==/UserScript==

var codes = document.getElementsByTagName('code');
var myfont		= '"Droid Sans Mono"';

for (var i = codes.length - 1; i >= 0; i--) {

	var code  = codes[ i ];
	var style = getComputedStyle( code, '' );
	var	old_style = code.style.fontFamily;
	var new_style = old_style.fontFamily.replace(
		/"Courier New"/gi,
		myfont
	).replace(
		/Courier/gi,
		myfont
	).replace(
		/monospace/gi,
		myfont
	);

	if( old_style != new_style )	{
		alert( old_style + ' ==> ' + new_style );
	}
	code.style.fontFamily = new_style;
}

// vim: noet sw=4 ts=4
