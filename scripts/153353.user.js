// ==UserScript==
// @name        ogame simple dropdown
// @namespace   marshen
// @description Removes fancy dropdown boxes with standard html select elements. Keyboard navigation will work again with this script.
// @include     http://*.ogame.*/game/index.php?page=*
// @downloadURL	http://userscripts.org/scripts/source/153353.user.js
// @updateURL	https://userscripts.org/scripts/source/153353.meta.js
// @version     1
// ==/UserScript==

(function() {
	var style;
	// Adds a style rule.
	function addStyle(rule)
	{
		if (!style)
		{
			style = document.createElement('style');
			style.setAttribute('type', 'text/css')
			style.setAttribute('id', 'style');
			
			var head = document.head || document.getElementsByTagName('head')[0];
			head.appendChild(style);
		}
		
		style.appendChild(document.createTextNode(rule + "\n"));
	}
	
	addStyle('.dropdown { display: none; }');
	addStyle('body.ogame div select, body div select { display: block !important; visibility: visible; }');
})();