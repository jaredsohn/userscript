// ==UserScript==
// @name Feedness - Solo Titulos
// @namespace http://www.veintecerodos.com.ar
// @description Greasemonkey script for Firefox to change the appearance of Feedness
// @include *feedness.com*


// ==/UserScript==

(function(){ 
	function soloTitulosFeedness(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	
	var cssStyle = '.pes {display:none;}';
	
	soloTitulosFeedness(cssStyle);

})();
