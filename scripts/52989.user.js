// ==UserScript==
// @name           Tvtropes js spoiler tags
// @namespace      http://miff.furopolis.org/
// @include        http://tvtropes.org/pmwiki/pmwiki.php/*
// ==/UserScript==

// JavaScript spoiler tags for TvTropes.org - Version 1.5
// Double click on a spoiler to show it, double-click to hide it.
// Code is public domain, but please attribute MiffTheFox.

window.addEventListener("load", function (){
	var allSpans = document.getElementsByTagName("span");
	var i;
	for (i = 0; i < allSpans.length; i++){
		if (allSpans[i].getAttribute("class") == "spoiler"){
			var el = allSpans[i];
			el.style.cursor = "help";
			el.addEventListener('dblclick', unMaskSpoilerTag, false);
			
			var bg = window.getComputedStyle(el, null).backgroundColor;
			var bgel = el;
			while (bg == "transparent" || bg == "inherit"){
				bgel = bgel.parentNode;
				bg = window.getComputedStyle(bgel, null).backgroundColor;
			}
			
			el.style.backgroundColor = bg;
			el.style.color = bg;
			
			el.style.border = "1px dotted gray";
			el.style.borderTop = "none";
			el.style.fontStyle = "italic";
			
			var allLinks = el.getElementsByTagName("a");
			for (j = 0; j < allLinks.length; j++){
				allLinks[j].style.color = bg;
				allLinks[j].style.backgroundColor = bg;
				allLinks[j].setAttribute("x-spoiler-visible", "0");
				allLinks[j].addEventListener('click', followSpoilerLink, false);
			}
		}
	}
},false);

function followSpoilerLink(e) {
	var revealed = this.getAttribute("x-spoiler-visible") == "1";
	if (!revealed)
		e.preventDefault();
}

function unMaskSpoilerTag(){
	try { window.getSelection().collapseToEnd(); } catch (ex) { }
	var revealed = this.className == "spoiler";
	
	this.className = revealed ? "spoilerRevealed" : "spoiler";
	this.style.color = revealed ? "#a0a0a0" : this.style.backgroundColor;
	
	var allLinks = this.getElementsByTagName("a");
	for (j = 0; j < allLinks.length; j++){
		if (revealed){
			allLinks[j].style.color = null;
			allLinks[j].setAttribute("x-spoiler-visible", "1");
		} else {
			allLinks[j].style.color = allLinks[j].style.backgroundColor;
			allLinks[j].setAttribute("x-spoiler-visible", "0");
		}
	}
}
