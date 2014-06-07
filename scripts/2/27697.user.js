// ==UserScript==
// @name           zshare_bypass
// @namespace      dj80hd
// @include        http://www.zshare.net/download/*
// ==/UserScript==


var dl_element = document.getElementById('download');
//If this is not the image button at http://www.zshare.com/images/download.gif
if (dl_element.type != 'hidden')
{
	var html_to_add = document.createElement("a");
	html_to_add.setAttribute("href",unsafeWindow.link);
	html_to_add.innerHTML = "<center><b>I CANT WAIT</b></center>";
	var daddy = dl_element.parentNode;
	daddy.appendChild(html_to_add);
}