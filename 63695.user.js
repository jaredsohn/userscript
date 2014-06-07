// ==UserScript==
// @name           Reddit NSFW NoThumb
// @namespace      Allan Bogh
// @include        http://*.reddit.com/*, http://reddit.com/*
// ==/UserScript==

var taglines = document.getElementsByClassName("title loggedin");

for(i=0, il=taglines.length; i < il; i++){
	var pos = taglines[i].innerHTML.search(/(NSFW)|(nsfw)/g);
	if(pos > -1){
		//alert(pos);
		taglines[i].innerHTML = taglines[i].innerHTML.replace(/(NSFW)|(nsfw)/g,"TPSNB");
		var prev = taglines[i].parentNode.parentNode.previousSibling;
		if(prev.tagName == 'A'){
			var firstChild = taglines[i].parentNode.parentNode.previousSibling.firstChild;
			if(firstChild.tagName == 'IMG'){
				firstChild.style.display = 'none';
			}
		}
	}
}