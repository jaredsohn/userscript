// ==UserScript==
// @name           DotA Allstars Cleanup
// @namespace      dota
// @description    Cleanup the DotA Allstars site.
// @include        http://*.dota-allstars.com/*
// ==/UserScript==
document.body.style.setProperty('background-image', 'none', null);
document.getElementById('header').style.setProperty('display', 'none', null);
document.getElementById('navstrip').style.setProperty('text-align', 'center', null);
document.getElementById('navstrip').style.setProperty('position', 'float', null);
for (var i = 0; i < document.getElementsByTagName('div').length; ++i)
{
	var div = document.getElementsByTagName('div')[i];
	if (div.className == 'container' || div.className == 'container2')
	{
		div.style.setProperty('width', '100%', null);
		div.style.setProperty('background-image', 'none', null);
	} else if (div.className == 'containertext')
	{
		div.style.setProperty('width', '100%', null);
	}
}
document.getElementById('frame').style.setProperty('width', '100%', null);