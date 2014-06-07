// ==UserScript==
// @name           OnlineArmorActiveXFix
// @description    Automatically unblock the blocked "ActiveX" content from the Onlime Armor web shield(paid versions only) and fix the scroll bars issues
// @include        *
// ==/UserScript==

var iframeList = document.getElementsByTagName('iframe');
for(var i=0; i < iframeList.length; ++i)
{
	if(iframeList[i].src.indexOf('/ActiveX/Blocked')!=-1)
	{
		iframeList[i].src = iframeList[i].src.replace('/ActiveX/Blocked','/ActiveX/Allowed');
		iframeList[i].scrolling='no';
	}
}