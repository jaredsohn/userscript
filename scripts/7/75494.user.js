// ==UserScript==
// @name           Unhide
// @namespace      Unhide
// @description    Unhide
// @include        http://facebook.com/*pages/*4949752878*
// @include        http://www.facebook.com/pages/*4949752878*
// ==/UserScript==

function unhide()
{
var spnum = document.getElementsByTagName("span");
for (var i=13;i<spnum.length;i++)
{
	if(spnum[i].getAttribute("id") == null && spnum[i].parentNode.getAttribute("id") == null){
		spnum[i].style.visibility="visible";
		spnum[i].style.display="inline";
	}
};
}
window.onload = unhide();