// ==UserScript==
// @name           http://www.windows-tech.info/
// @namespace      realbart
// @description    verwijder advertenties
// @include        http://www.windows-tech.info/*
// ==/UserScript==

var uW;

if (typeof unsafeWindow === 'object') {

	uW = unsafeWindow;

} else {

	uW = window;

}

var divs = uW.document.getElementsByTagName('div');
for (i in divs)
{
	if (divs[i]) if(divs[i].id) if(divs[i].id.substring(0,5)=='floor')
	divs[i].parentNode.removeChild(divs[i]);
}

var iframes = uW.document.getElementsByTagName('iframe');
for (i in iframes)
{
	if(iframes[i].id) if(iframes[i].id.substring(0,10)=='google_ads')
	iframes[i].parentNode.parentNode.parentNode.removeChild(iframes[i].parentNode.parentNode);
}
