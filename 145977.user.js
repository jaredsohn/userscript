// ==UserScript==
// @name         DSWikiParser
// @namespace    FileFace
// @description  Stellt die nicht geparsten Formeln in der DSWiki als Formeln von Latex dar
// @version      1.1
// @author       Zorbing
// @include      http://wiki.die-staemme.de/wiki/*
// ==/UserScript==

(function() {
	var win = unsafeWindow ? unsafeWindow : window,
	$ = win.jQuery,
	HTML = $('body').html(),
	regex   = /&lt;math&gt;([^;]+)&lt;\/math&gt;/,
	regex_g = /&lt;math&gt;([^;]+)&lt;\/math&gt;/g,
	matches = HTML.match(regex_g);
	for ( var i = 0; match = matches[i]; ++i )
		HTML = HTML.replace(match, genImg(match));
	
	$('body').html( HTML );
	
	function genImg(match) {
		var code = match.replace(/&lt;\/?math&gt;/g,'');	// nur den Code
		code = code.replace(/<[^>]+>|\n/g,'');	// alle Tags entfernen
		code = code.replace(/^\s*/,'').replace(/\s*$/g,'');	// trimmen
		return '<img title="'+ code +'" src="http://latex.codecogs.com/gif.latex?'+ code +'">';
	}
})();