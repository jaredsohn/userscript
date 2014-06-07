// ==UserScript==
// @grant          none
// @name           forum.EVE-ru.com remove lightbox
// @namespace      http://forum.eve-ru.com
// @description    Removes lightbox from forum.eve-ru.com after update 05.2013
// @include        http://forum.eve-ru.com/*
// ==/UserScript==

var spans = document.getElementsByTagName("span");

for(i=0;i<spans.length;i++) {
    if(spans[i].getAttribute("rel") == "lightbox") {
        spans[i].setAttribute("rel", "");
        var bbcimgs = spans[i].getElementsByTagName("img");
        if (bbcimgs.length > 0)
            spans[i].innerHTML = "<a href = '"+bbcimgs[0].getAttribute("src")+"'>"+spans[i].innerHTML+"</a>";            
	}
}