// ==UserScript==
// @name           Google Image Relinker
// @namespace      http://userscripts.org/users/33515/scripts
// @description    Just another Image Relinker... As easy as it gets.
// @include        http://images.google.*/*
// ==/UserScript==


	var links = document.getElementsByTagName("a");
	for (var i=0; i<links.length; i++) {
		if (links[i].href.match(/\/imgres\?imgurl\=(.*?)\&imgrefurl\=/gi)) {
			var imgurl = RegExp.$1;
			links[i].setAttribute("onclick", "window.location.href='"+decodeURI(imgurl)+"'; return false;");
		}
	}