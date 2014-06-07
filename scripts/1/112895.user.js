// ==UserScript==
// @name           Meebo Ad Remover
// @description    Removes the bottom ad panel
// @namespace      meebo.com
// @include        http://www.meebo.com/*
// @author         Cholik (http://userscripts.org/users/392358)
// ==/UserScript==

function MBWrapper() {
	function wOnReady(ready) { 
		if (!ready){ 
			setTimeout(function() { 
				if (typeof gMediaBar === 'undefined'){ 
					wOnReady(false); 
				} 
				else{ 
					wOnReady(true); 
				} 
			}, 300); 
		} 
		else{
			gMediaBar.setVisibility(false);
		}
	}
	wOnReady(false);
}
function addScript(id, f) {
	var c = document.body;
	var s = document.getElementById(id);
	if (!s) {
		s = document.createElement('script');
		s.setAttribute('id', id);
		s.innerHTML = '('+f.toString()+')();';
		c.appendChild(s);
	}
}
addScript('MBWrap', MBWrapper);