// ==UserScript==
// @name         3ICE's Remove tracking from Google search results
// @namespace    http//3ice.hu/
// @version      1.3
// @description  Removes Google link tracking, kills ugly links like this: http://www.google.com/url?sa=&rct=&q=&esrc=&source=&cd=&cad=&url=...
// @include      http://www.google.com/*
// @include      https://www.google.com/*
// @exclude      http://www.google.com/img*
// @exclude      https://www.google.com/img*
// @exclude      http://www.google.com/*&tbm=isch*
// @exclude      https://www.google.com/*&tbm=isch*
// ==/UserScript==

(function(){
	for(var i=0;i<document.links.length;i++){
		document.links[i].removeAttribute("onmousedown");
		document.links[i].removeAttribute("onclick");
	}

	document.addEventListener('DOMNodeInserted',function(e){
		var l=e.target.getElementsByTagName('a');
		for(var i=0;i<l.length;i++){
			l[i].removeAttribute("onmousedown");
			l[i].removeAttribute("onclick");
		}
		return true;
	},false);
})();
