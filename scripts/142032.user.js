// ==UserScript==
// @name       clearly city8.com street map 
// @namespace  http://123hurray.tk
// @version    1.0
// @description  enter something useful
// @match      http://*.city8.com/*
// @copyright  2012, Ray
// ==/UserScript==
(function() {
	var crack = function() {
		var reg = new RegExp(/(fuYeFlashInit\(.*?\'\,\')/g);
		var fun = document.body.innerHTML.match(reg);
		fun = fun + "true');"
		eval(fun);
		var remove = document.getElementsByClassName('Play_bottom')[0];
		remove.parentNode.removeChild(remove);
	}
	var scriptNode = document.createElement ('script');
	scriptNode.type = "text/javascript";
	scriptNode.textContent  = '(' + crack.toString() + ')();';
	scriptNode.onload = function() {
		document.getElementsByTagName('head')[0].removeChild(scriptNode);
	};
	document.getElementsByTagName('head')[0].appendChild(scriptNode);
	
})();