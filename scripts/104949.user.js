// hootsuite.com-demotion.user.js
//
// ==UserScript==
// @name          Hootsuite.com Demotion
// @namespace     http://userscripts.org/scripts/show/104949
// @description   Hides any promoted content
// @include       http://hootsuite.com/*
// @include       http://www.hootsuite.com/*
// @include       https://hootsuite.com/*
// @include       https://www.hootsuite.com/*
// ==/UserScript==
function demotion() 
{
	window.setTimeout(demotion,1000);
	var elements = document.getElementsByTagName('div');
	for (var i=0; i<elements.length; i++)
	  if (elements[i].className.match(/promoted/))
	  {
	    if (elements[i].style['display'].match(/none/)) continue;
	    elements[i].style['display'] = 'none';
	  }
}
window.setTimeout(demotion,1000);
