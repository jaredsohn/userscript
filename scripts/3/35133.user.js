// ==UserScript==
// @name           fotocommunity Akt
// @namespace      http://www.fotocommunity.de/
// @description    FC Akt freischalten
// @include        http://www.fotocommunity.com/*
// @include        http://www.fotocommunity.de/*
// @exclude        htto://www.fotocommunity.de/
// ==/UserScript==

images=document.getElementsByTagName("img");
for (i=0; i<images.length; i++) {
					images[i].parentNode.href=images[i].src.replace("http://cdn.fotocommunity.com/thumbs/", "http://cdn.fotocommunity.com/photos/");
						
					}
				
