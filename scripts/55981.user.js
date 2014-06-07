// ==UserScript==

// @name           Stern.de Hide Icons

// @namespace      http://www.nurivo.de

// @description    Hides Stern.de Sprite Icons

// @include        http://www.stern.de/*
// @include        https://www.stern.de/*
// @include        http://wefind.stern.de/*


function getElementsByClass( searchClass, domNode, tagName) {
	if (domNode == null) domNode = document;
	if (tagName == null) tagName = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagName);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) {
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1)
			el[j++] = tags[i];
	}
	return el;
}

var sternSpriteIcons = getElementsByClass('spriteIcons');

for (i = 0; i < sternSpriteIcons.length; i++) 
{
	sternSpriteIcons[i].style.backgroundImage = 'none';
}



// ==/UserScript==