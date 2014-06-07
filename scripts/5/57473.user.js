// ==UserScript==
// @name           WikipediaImageRelink
// @namespace      http://userscripts.org/scripts/review/57473
// @description    Rewrites image href from description page to full resolution image on sites using MediaWiki (i.e. Wikipedia)
// @include        http://*.wikipedia.org/*
// @include        http://*.wikimedia.org/*
// @include        https://*.wikipedia.org/*
// ==/UserScript==

images = document.getElementsByClassName("image");

for (var e = 0; e < images.length; e++)
{
	code1 = images[e].innerHTML.match(/(http:\/\/upload\.wikimedia\.org\/wikipedia\/.+?)\/thumb(.+?)\/([^/]+)"/);	
	code2 = images[e].innerHTML.match(/(http:\/\/upload\.wikimedia\.org\/wikipedia\/.+?)"/);

	if (code1) images[e].href = code1[1] + code1[2];
	else if (code2) images[e].href = code2[1];
}