// ==UserScript==
// @name           RB-Fans.de Forum hide_LuK_topic
// @namespace      www.rb-fans.de
// @description    Dieses Skript versteckt im Forum das Thema "Leidenschaft und Kommerz"
// @author         Andreas Rodriguez Rivera arrmaniac+hideTopics@gmail.com
// @version        0.1.1
// @include        http://www.rb-fans.de/*
// @include        http://rb-fans.de/*
// ==/UserScript==

var allLinks = document.getElementsByTagName("a");
for(var i = 0; i<allLinks.length;i++) {
	tempLink = allLinks[i];
	if(!tempLink.className.match(/topictitle/)) continue;
	if (tempLink.innerHTML.match(/Leidenschaft und Kommerz/)) tempLink.parentNode.parentNode.style.display = "none";
        /* 
         * Für JavaScript-Kenner oder Experimentierfreudige:
         *
         * einfach die unten stehende Zeile auskommentieren und den Thementitel anpassen, 
         * um ein weiteres Thema zu verstecken 
         */
        //if (tempLink.innerHTML.match(/Anderes Thema/)) tempLink.parentNode.parentNode.style.display = "none";
}
