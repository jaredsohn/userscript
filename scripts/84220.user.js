// ==UserScript==
// @name           Facebook share anywhere
// @namespace      http://scripts.namdx1987.org/
// @description    Put a facebook share button on the current page.
// @include        *
// @exclude        http://www.facebook.com/sharer.php*
// ==/UserScript==

window=unsafeWindow;
document=window.document;
var a=document.createElement('a');
var fbShare=document.createElement('img');
fbShare.src="http://static.userscripts.org/images/handycons/facebook_32.png";
a.appendChild(fbShare);
a.style.position='fixed';
a.style.right='10px';
a.style.top='10px';
document.body.appendChild(a);

a.onclick=function()
{
	window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(document.location.href)+'&t='+encodeURIComponent(document.title),'toolbar=0,status=0,width=626,height=436');
	return false;
}