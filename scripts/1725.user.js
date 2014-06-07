// ==UserScript==
// @name          Bigger "Code" tag
// @namespace     http://www.cigno5.5.org/
// @description	  Enlarge "code" and "pre" tag into web pages
// @include       *
// @version       0.2
// ==/UserScript==

(function(){
	var codeTags = document.getElementsByTagName('code');
	for (var i = 0; i < codeTags.length; i++) {
		var codeTag = codeTags[i];
		codeTag.style.fontSize="12pt";
	}

	var preTags = document.getElementsByTagName('pre');
	for (var i = 0; i < preTags.length; i++) {
		var preTag = preTags[i];
		preTag.style.fontSize="12pt";
	}

})();
