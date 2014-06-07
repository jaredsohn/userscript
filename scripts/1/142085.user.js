// ==UserScript==
// @name        stop youtube autoplay
// @namespace   PandaScripting
// @include     *
// @version     5
// @grant       none
// ==/UserScript==

function replaceSources(aElems)
{
	for (var i = aElems.length; i--; )
	{
		var nElem = aElems[i],
		sSrc = nElem.src;
		if (/^https?:\/\/(www\.)?youtube\.com\/.*$/i.test(sSrc))
			nElem.src = sSrc.replace(/(\?)?&?autoplay=1/, "$1");
	}
}

replaceSources(document.getElementsByTagName("iframe"));
replaceSources(document.getElementsByTagName("embed"));