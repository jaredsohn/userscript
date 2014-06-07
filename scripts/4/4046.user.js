// Remove Mickey Kaus posts from Slate.com
// Release 0.1
// This software is licensed under the GPL
//
// About:
// 
// From the bizarre no-it's-not-really-homophobia glee when he
// perceived that Brokeback Mountain was "failing" at the
// box office (obviously, it wasn't; see 
// http://lefarkins.blogspot.com/2004/12/our-war-against-mickey-kaus.html),
// to his meta editors-on-top-of-editors schtick, to his 
// Avis contrarianism ("We try harder! --ed"), Mickey Kaus is the most 
// annoyingly ubiquitous blogger on a major media website.
// 
// This script prevents me from inadvertently clicking on his posts while 
// visiting slate.com, which is otherwise a fine news & commentary site.
//
// Based on the de-Xeni script by Jesse Andrews.

// ==UserScript==
// @name          de-Kaus
// @description   Remove Mickey Kaus from Slate
// @include       http://slate.com*
// @include       http://www.slate.com*
// ==/UserScript==

// To remove: (features from slate webdesign)
// 
// In top columns: <TD width="118" class="nfdept"><NOBR>Kausfiles</NOBR></TD>
// In older stuff: <DIV class="tmarl">

var allDIVtmarl, allFONTtdptns, allTDnfdept;
allDIVtmarl = document.evaluate(
	"//div[@class='tmarl']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

allTDnfdept = document.evaluate(
	"//td[@class='nfdept']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

for (var i = 0; i < allDIVtmarl.snapshotLength; i++) {
	thiselt = allDIVtmarl.snapshotItem(i);
	if (thiselt.innerHTML.match('Kaus') || thiselt.innerHTML.match('kaus')) {
	  thiselt.parentNode.removeChild(thiselt);
	}
}

for (var i = 0; i < allTDnfdept.snapshotLength; i++) {
	thiselt = allTDnfdept.snapshotItem(i);
	if (thiselt.innerHTML.match('Kausfiles') || thiselt.innerHTML.match('kausfiles')) {
	  thiselt.parentNode.removeChild(thiselt);
	}
}

