// ==UserScript==
// @name          Redirect remover for Newzbin
// @namespace     Raistlins magic powder
// @description   Removes the URL redirect that newzbin makes on external links
// @include       http://v3.newzbin.com/*
// @include       https://v3.newzbin.com/*
// @include       http://www.newzxxx.com/*
// @include       http://newzxxx.com/*
// ==/UserScript==
//
// This is an extended version of "Newzbin redirect remover" made by "battleaxe" (http://userscripts.org/scripts/show/10441)
//
(function(){
	var links = document.getElementsByTagName("a");
	for (var i=0;i<links.length;i++){
		var href=links[i].href;
		if (href.length > 22){
			switch (0){
				case href.indexOf("http://v3.newzbin.com/r/?"):
					links[i].href = href.substring(25)
					break;
				case href.indexOf("https://v3.newzbin.com/r/?"):
					links[i].href = href.substring(26);
					break;
				case href.indexOf("http://www.newzxxx.com/r/?"):
					links[i].href = href.substring(26)
					break;
				case href.indexOf("http://newzxxx.com/r/?"):
					links[i].href = href.substring(22)
					break;
			}
		}
	}
}
)();