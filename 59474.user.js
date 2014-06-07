// ==UserScript==
// @name           scc photo downloader
// @namespace      www.schloss-einstein-girls.info/gmscripts
// @description    adds a link to the actual photo URL to easily download a photo from schueler.cc
// @include        http://www.schueler.cc/*
// @version        1.0.0
// @copyright 2009+, Stefan T. (http://www.schloss-einstein-girls.info),
// ==/UserScript==
var pic = document.getElementById('foto');


if (pic)
{
	urlstring=(pic.style.backgroundImage);
	
	picurl = urlstring.match(/url\((.*)\)/);
	if (picurl)
	{
	
		var previousContainer = document.getElementById('mld_link');
		var link = document.createElement('span');
		link.innerHTML = '<a href="'+picurl[1]+'" accesskey="s">[ Foto herunterladen ]</a><br>';

		previousContainer.parentNode.insertBefore(link, previousContainer);
	}
}
