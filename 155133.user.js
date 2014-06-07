// ==UserScript==
// @name        GornaBelkaFixed
// @namespace   GornaBelkaFixed
// @include     *strims.pl*
// @version     1
// ==/UserScript==
window.addEventListener ("load", LocalMain, false);
function LocalMain ()
{
	document.getElementById('top_bar').style.position = "fixed";
	document.getElementById('top_bar').style.top = 0;
	document.getElementById('top').style.marginTop = "20px";
	document.getElementById('left').style.top = '20px';
}