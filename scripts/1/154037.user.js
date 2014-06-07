// ==UserScript==
// @name           antiblockkiller 
// @namespace      Troll
// @include        http://*.oprojekt.net*
// @description    alpha2 || removes antiblock.org layer
// @grant	   GM_log
// ==/UserScript==

var run = true;
function hide()
{
	run = false;
	var styleTags = document.getElementsByTagName('style');
	for(i = 0; i < styleTags.length; i++)
	{
		if (styleTags[i].innerHTML.match('{position:fixed!important;position:absolute;top:0;top:expression'))
		{
			layerId = styleTags[i].innerHTML.substr(1,7);
			try
			{
				document.getElementById(layerId).style.display = 'none';
			} catch(e) {
				GM_log('Error.');
			}
		}
	}
}
setTimeout(hide, 2222);
/*
 * if js is disabled timeout will not fire
 */
if (run) {
	hide();
}