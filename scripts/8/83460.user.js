// ==UserScript==
// @name          hoverclick 
// @namespace     \m/\m/\m/
// @include       http://apps.facebook.com/swacmfuccfoundanb*
// ==/UserScript==

@name 
@description 	
window.onload=init;
		function init() {
		document.getElementById('app118916128153393_btn').onmouseover = function() {
			document.getElementById('app118916128153393_btn').click();
		};
	}