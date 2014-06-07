// ==UserScript==
// @name           Grooveshark Ad Remover
// @description   Tells the grooveshark site we're premium and removes the ads
// @namespace      Grooveshark
// @include        http://grooveshark.com/*
// @author         Cholik (http://userscripts.org/users/392358)
// ==/UserScript==

function GSWrapper() {
	function onReady(ready) { 
		if (!ready){ 
			setTimeout(function() { 
				if (typeof GS === 'undefined'){ 
					onReady(false); 
				} 
				else{ 
					onReady(true); 
				} 
			}, 300); 
		} 
		else{
			//Let's use the awesome grooveshark object to tell it we're premium and let it remove our ads
			GS.ad.user.IsPremium = 1;
			GS.ad.update();
		}
	}
	onReady(false);
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
addScript('GSWrap', GSWrapper);