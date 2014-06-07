// ==UserScript==
// @name           Warez-BB link to Rapidshare
// @description    Changes the structure of any Warez-bb topic so as to provide download links for rapidshare files.
// @include        http://www.warez-bb.org/viewtopic*
// @include        http://warez-bb.org/viewtopic*
// @version    	   2.0
// ==/UserScript==

function GetElementsByClassName (Class) {
	var Matches= new Array();
	var AllElms= document.getElementsByTagName("*");
	for (i= 0; i < AllElms.length; i++) {
		if ( AllElms[i].className == Class ) {
			Matches[Matches.length]= AllElms[i];
		}
	}
	
	return Matches;
}

var CodeBlocks= GetElementsByClassName("code");
for (i= 0; i < CodeBlocks.length; i++) {
	CodeBlocks[i].innerHTML= CodeBlocks[i].innerHTML.replace(/(http:[^\s<>]*)/g, '<a href="$1" target="_blank">$1</a>');
}