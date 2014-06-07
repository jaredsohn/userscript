// ==UserScript==
// @name           Freecause google redirect
// @namespace      abcdefghijklmnopqrustuvwxyz, Dygnatus, random nonsense, GreatSlovakia
// @description    Redirects to google page from freecause
// @include        http://search.freecause.com/search?*
// ==/UserScript==

function GET(vari){
	URI = document.location.href;
	URI2 = URI.split("?");
	URI3 = URI2[1].split("&");
	for(i=0;i < URI3.length; i++){
		URI4 = URI3[i].split("=");
		if(URI4[0] == vari){
			return URI4[1]
		}
	}
}
window.addEventListener("load", function(e) {
	var theBody = document.getElementsByTagName('body')[0]; 
 	theBody.innerHTML = '<iframe style="display: none;"></iframe><iframe style="border:0px;" src="http://www.google.com/#hl=en&q='+GET('p')+'" width="100%" height="100%"><p>Your browser does not support iframes.</p></iframe>'+theBody.innerHTML;
 	theBody.style.overflow = "hidden";
 	theBody.style.margin = "0px";
	//window.location.href = "http://www.google.com/#hl=en&q="+GET('p');
}, false);
