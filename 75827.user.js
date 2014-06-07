// ==UserScript==
// @name           OnlineArmorActiveXFixScrollBar
// @description    When you unblock an 'activex' content (blocked by the web shield of Online Armor paid version), unwanted scrolls bar remain. This script fix this.
// @include        *
// ==/UserScript==

var iframeList = document.getElementsByTagName('iframe');
for(var i=0; i < iframeList.length; ++i)
{
	if(iframeList[i].src.indexOf('/ActiveX/Blocked')!=-1)
	{
		myFrame = iframeList[i];
		mydoc = iframeList[i].contentDocument;
		mydoc.addEventListener('click', function () {myFrame.scrolling = 'no';}, false);
	}
}