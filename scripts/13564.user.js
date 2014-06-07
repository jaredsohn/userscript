// ==UserScript==
// @name	heise-favicon
// @description aendert das favicon in die Bewertung
// @include http://www.heise.de*/foren/S-*/forum-*/msg-*/*/
// ==/UserScript==


(function(){
divs=document.getElementsByTagName("div");
for(i=0;i<divs.length;i++){
	if(divs[i].className=="vote_posting"){
		head=document.getElementsByTagName("head")[0];
		link=document.createElement("link");
		link.setAttribute("rel", "shortcut icon");
		link.setAttribute("href", divs[i].getElementsByTagName("img")[0].src);
		head.appendChild(link);
	}
}
})();