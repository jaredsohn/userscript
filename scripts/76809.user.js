// ==UserScript==
// @name           Google Reader's image links into embeded images.
// @description    Transforms links pointing to images into embeded images within Google Reader's comments.
// @version        1.2
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// @include        http://www.google.com.mx/reader*
// @include        https://www.google.com.mx/reader*
// ==/UserScript==

document.getElementById("entries").addEventListener ('DOMNodeInserted', OnNodeInserted, false);
function OnNodeInserted (evt) {
	var newContent = document.evaluate( 
				'//a[@class="ot-anchor" and ( contains(@href, ".jpg") or contains(@href, ".png") or contains(@href, ".gif") or contains(@href, ".jpeg") ) and ' + 
				'not(@class=done) and not(contains(@href,"bGBbc.jpg")) and not(contains(@href,".jpg/")) and not(contains(@href,".png/")) and not(contains(@href,"NSFW")) ]', 
				evt.target, null,XPathResult.ANY_UNORDERED_NODE_TYPE,null).singleNodeValue;
	if (newContent) {
		var i=document.createElement('img');
		i.setAttribute('src',newContent.href);
		i.setAttribute('style','border:1px solid #C2CFF1;width:30%;padding:2px');
		i.setAttribute('alt', 'loading... if it doesn\'t just click this link');
		newContent.setAttribute('class','done');		
		newContent.innerHTML = "";		
		newContent.appendChild(i);
		//s.onload=loadImgs;
		void(i);
		
		return;
	}
}
