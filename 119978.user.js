// ==UserScript==
// @name           no tactical retreat tip
// @namespace      marshen
// @description    Already know how tactical retreat works? This script removes the tip for you to save the space for more useful information!
// @include        http://*.ogame.gameforge.com/game/index.php?page=messages*
// @downloadURL    http://userscripts.org/scripts/source/119978.user.js
// @updateURL      https://userscripts.org/scripts/source/119978.meta.js
// @version        1.0.2
// ==/UserScript==

(function(){
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
	
	addStyle('#shortreport .retreatText { display: none; }');
})();