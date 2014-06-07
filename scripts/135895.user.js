// ==UserScript==
// @name           Yahoo Axis remover
// @description    Removes the Yahoo axis toolbar at the bottom of the page
// @author         Ran Biron
// @include        http://*/*
// @include        https://*/*
// @version        1.1
// ==/UserScript==

var removeAxis = function(){
	iframe = document.getElementById('ynano_iframe_SearchX'); 
		if(iframe != null) {			
			iframe.style.cssText = "display:none ! important; visibility:hidden !important";			
		}
}

removeAxis();

myinterval = setInterval(function(){removeAxis()},100);
