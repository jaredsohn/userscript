// ==UserScript==
// @name No Romanji in mainichi site
// @description Hide romanji translation to keep on learning the Japanese writing system.
// @namespace http://userscripts.org/users/121730
// @include http://www.mainichijapanese.com/*
// @include http://mainichijapanese.com/*
// ==/UserScript==

var divs = document.getElementsByTagName("div");
var nsfwRegEx = /.*romanji.*/i;
for(i = 0; i < divs.length; i++)
{
	div = divs[i];
	if(nsfwRegEx.test(div.className))
	{
            div.style.display="none";
	}
}