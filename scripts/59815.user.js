// ==UserScript==
// @name			MSDN fixed font fixer
// @description		Changes MSDN's monospace code sample font to something nicer
// @include			http://msdn.microsoft.com/en-us/library/*
// ==/UserScript==

(function() {
	// feel free to modify this font list to your liking
	var fontsList = 'Consolas,"Lucida Sans Typewriter",Monaco,"Lucida Console","DejaVu Sans Mono","Bitstream Vera Sans Mono","Andale Mono",monospace';

	var fontSize = '10pt';

	var styleTag = document.createElement('style');
	styleTag.type = 'text/css';
	styleTag.appendChild(document.createTextNode('pre.libCScode{font-family:' + fontsList + ' !important;font-size:' + fontSize + ' !important}'));
	document.getElementsByTagName('head')[0].appendChild(styleTag);
})();
