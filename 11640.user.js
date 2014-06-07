// ==UserScript==
// @name           Travian: Message Select
// @namespace      
// @description    
// @include        http://*.travian.*/berichte.php*
// @author	   	 Lars M. Poulsen
// ==/UserScript==

(function() {
	var allButton = document.createElement('input');
	allButton.setAttribute('type','button');
	allButton.setAttribute('value','All');
	allButton.className = 'std';
	allButton.setAttribute('onclick',"javascript:var items = document.getElementsByTagName('input'); for(i = 0 ; i < items.length ; i++ ) { items[i].checked = true; }");

	var x = document.getElementsByName('del')[0].parentNode;
	x.appendChild(allButton);
})();