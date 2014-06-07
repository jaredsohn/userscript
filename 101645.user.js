// ==UserScript==
// @name           PCINpact enhancements
// @author         CaptainH
// @version        0.2
// @description    Améliore l'affichage des images des news de PCINpact | Corrige les liens ratés (http:///)
// @license        WTFPL
// @include        http://www.pcinpact.com/actu/news/*
// @include        http://www.pcinpact.com/dossiers/*
// ==/UserScript==

function runLytebox() {
	var imgs = document.getElementsByClassName("img_news")
	for(var i=0; i<imgs.length; i++) {
		if(imgs[i].parentNode.href.split('=')[0] != "http://www.pcinpact.com/compte/concours_.php?id") {
			imgs[i].parentNode.href = imgs[i].src.replace("mini-", "")
			imgs[i].parentNode.setAttribute("rel", "lytebox[group]")
		}		
	}
}

function linksForDummies() {
	var links = document.getElementsByTagName("a")
	for(var i=0; i<links.length; i++) {
		if(links[i].href == "http:///") {
			links[i].href = links[i].innerHTML			
		}		
	}
}

runLytebox()
linksForDummies()