// ==UserScript==
// @name           Show Comic Alt Text
// @namespace      http://userscripts.org/scripts/show/124870
// @description    Displays the hidden ALT text of web comics: Whomp, xkcd, Doghouse diaries
// @version        1.2
// @include        http://www.whompcomic.com/*
// @include        http://xkcd.com/*
// @include        http://what-if.xkcd.com/*
// @include        http://thedoghousediaries.com/*
// ==/UserScript==

var comics = [

	{//www.whompcomic.com
	elSelector: '#comic-1 img[src*="whompcomic.com/comics/"]',
	attrGrab: 'title',
	style: 'margin-top: 10px; margin-bottom: 10px; font-weight: bold; font-size: 120%;',
	insBefore: false,
	insAfter: true
	},
	
	{//xkcd.com
	elSelector: '#comic > img[src*="xkcd.com/comics/"]',
	attrGrab: 'title',
	style: 'margin-top: 10px; margin-bottom: 10px; font-weight: bold; font-size: 120%;',
	insBefore: false,
	insAfter: true
	},

	{//what-if.xkcd.com
	elSelector: '.entry img[src*="/imgs/"]',
	attrGrab: 'title',
	style: 'margin-top: 2px; margin-bottom: 10px; font-weight: bold; font-size: 80%; color: #888888; text-align: center;',
	insBefore: false,
	insAfter: true
	},

	{//thedoghousediaries.com
	elSelector: '.object > a > img[src*="thedoghousediaries.com/comics/"]',
	attrGrab: 'title',
	style: 'margin-top: 10px; margin-bottom: 10px; font-weight: bold; font-size: 120%;',
	insBefore: false,
	insAfter: true
	}
	
];



function newCaption(txt, style)
	{
	var textDiv = document.createElement('div');
	textDiv.appendChild(document.createTextNode(txt));
	style && textDiv.setAttribute('style', style);
	return textDiv;
	}



// http://stackoverflow.com/questions/4793604/how-to-do-insert-after-in-javascript-without-using-a-library
function insertAfter(referenceNode, newNode)
	{
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}



function insertBefore(referenceNode, newNode)
	{
	referenceNode.parentNode.insertBefore(newNode, referenceNode);
	}



var el, els, txt, comic;
var iE, iC = comics.length;
while (iC--)
	{
	comic = comics[iC];
	els = document.querySelectorAll(comic.elSelector);
	iE = els ? els.length : 0;
	while (iE--)
		{
		el = els[iE];
		txt = el[comic.attrGrab];
		if (!txt) continue;
		if (comic.insAfter) insertAfter(el, newCaption(txt, comic.style));
		if (comic.insBefore) insertBefore(el, newCaption(txt, comic.style));
		}
	}
	
