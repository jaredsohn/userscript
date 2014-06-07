//
// FunBeat user script
// version 0.1
// 2010-05-27
// Copyright (c) 2010 Tonny Vildevall
//
// -----------------------------------------------------------------------------------------------------------
//
// This is a Greasemonkey script
//
// version 0.1 - Adding move to first unred on ignore thread button
//
// ----------------------------------------------------------------------------------------------------------
//
// ==UserScript==
// @name		FunBeatScript
// @include	http://www.funbeat.se/*
//@run-at document-start 
//
// ==/UserScript==
var omai = "\
function OnMarkedAsIgnoreAndMove(response)\
{\
	if(response == 'OK')\
	{\
		if($('MarkAsIgnoreHref') != null) $('MarkAsIgnoreHref').onclick = null; \
		if($('MarkAsIgnoreButton') != null) $('MarkAsIgnoreButton').onclick = null; \
		if($('MarkAsIgnoreButton') != null) $('MarkAsIgnoreButton').disabled = true; \
		setInnerText('MarkAsIgnoreHref', 'OK'); \
		location.href = 'http://www.funbeat.se/discussion/redirectfirstunread.aspx'; \
	}\
	else\
		alert(response); \
} ";

scriptElement = document.createElement('script');
scriptElement.innerHTML = omai;
head = document.getElementsByTagName('head')[0];
head.appendChild(scriptElement);

var allHits,  thisHit, red;

allHits = document.evaluate(
	"//input[@id='MarkAsIgnoreButton']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < allHits.snapshotLength; i++){
	thisHit = allHits.snapshotItem(i);
	link = thisHit.getAttribute('onClick');
	link = link.substring(0,link.length - 18)  + "OnMarkedAsIgnoreAndMove);";
	thisHit.removeAttribute('onClick');
	thisHit.setAttribute('onClick', link);
}