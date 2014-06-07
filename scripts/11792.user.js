// ==UserScript==
// @name           Ingenta connect link follower
// @namespace      geologicalhammers.com
// @description    Takes you straight to the full text of an article linked to from ingenta connect, if you're entitled to it.
// @include        http://www.ingentaconnect.com/content/*
// ==/UserScript==

function goTo(url) {
	window.location.href = url;
}

imgs = document.getElementsByTagName("img");
for (i=0; i<imgs.length; i++) {
	if (imgs[i].className == "go-button") {goTo(imgs[i].parentNode.href);}
}

as = document.getElementsByTagName("a");
for (i=0; i<as.length; i++) {
	if (as[i].innerHTML == "Proceed") {goTo(as[i].href);}
}