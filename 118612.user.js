// ==UserScript==
// @name           popsugar Enable foto save
// @namespace      bitsscream
// @description    Enables you to save fotos from popsugar.com
// @include        http://www.popsugar.com/*
// ==/UserScript==

var scripts=document.getElementsByTagName("a");
for (i=0;i<scripts.length ;i++)
{
	var index = scripts[i].innerHTML.indexOf( "Previous" );
	if ( index != -1 ) {
		scripts[i].style.visibility = 'hidden'; 
           
	}
	var index = scripts[i].innerHTML.indexOf( "Next" );
	if ( index != -1 ) {
		scripts[i].style.visibility = 'hidden'; 
           
	}
}
 