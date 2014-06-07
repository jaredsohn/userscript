// ==UserScript==
// @name           Remove Gaadi.com Annoying Footer
// @namespace      Gaadi.com
// @description    Remove Gaadi.com Annoying Footer
// @include        http://www.gaadi.com/*
// ==/UserScript==

function hideFooter()
{
	var frame = document.getElementById('site-bottom-bar');
	frame.style.visibility = 'hidden';
}

hideFooter();