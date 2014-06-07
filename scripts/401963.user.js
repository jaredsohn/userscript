// ==UserScript==
// @name        TVcountdown.com PirateBay Linker
// @namespace   tvcountdownpiratebaylinker
// @include     http://*tvcountdown.com/*
// @version     1
// @grant       none
// ==/UserScript==

	var allLinks = document.links;
	for (var i=0; i<allLinks.length; i++) {
		var name = allLinks[i].innerHTML;
		if(name.indexOf("(US)") != -1){
			allLinks[i].innerHTML = name.replace("(US)","");
		}
		if(allLinks[i].href.indexOf("/e/") != -1){
			if(allLinks[i].parentNode.previousSibling != null && allLinks[i].parentNode.previousSibling.previousSibling != null){
				allLinks[i].href = "http://thepiratebay.se/search/" + allLinks[i].parentNode.previousSibling.previousSibling.childNodes[0].innerHTML + "%20" + allLinks[i].parentNode.previousSibling.innerHTML + "/0/7/0";
			}
		}
	}