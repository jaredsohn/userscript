// ==UserScript==
// @name           Repareer bookmark
// @namespace      fixbookmark
// @description    Repareert de bookmark functie op forum.fok.nl
// @include        http://forum.fok.nl/topic/*
// ==/UserScript==

function removeBGonClick()
{
 	var background = document.getElementById("bg").wrappedJSObject;

	if( background ) 
	{	
		background.innerHTML = background.innerHTML.replace("location.href=\'#\'","");
	}
	else {
 		setTimeout( removeBGonClick, 200 );
	}
}


removeBGonClick();