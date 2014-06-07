// ==UserScript==

// @name           Runescape Ad Remover
// @namespace      runescape.com
// @description    Removes Ad iframe
// @include        *runescape.com*

// ==/UserScript==

if (document.getElementsByTagName("iframe").length>=1){
	if (document.getElementsByTagName("iframe")[0].src != "http://www2.cbox.ws/box/?boxid=1610373&boxtag=6719&sec=main") {
document.getElementsByTagName("iframe")[0].src = ""
document.getElementsByTagName("iframe")[0].height = 0
document.getElementsByTagName("iframe")[0].scrolling = "no"
	}
}

// Script Shouldn't overwrite Freeze's Advanced Forum script now