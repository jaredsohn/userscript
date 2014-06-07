// ==UserScript==
// @name           Wiki
// @description    Clear Wikipedia
// @namespace      opensuse
// @author         Opensuse
// @version        1.0
// @include        *wiki*
// ==/UserScript==


window.onload = function()
{
	document.getElementById("mw-head").style.display='none';
	document.getElementById("mw-head-base").style.display='none';
	document.getElementById("mw-page-base").style.height="1em";
	
	document.getElementById("content").style.marginLeft="1em";
	document.getElementById("content").style.marginRight="1em";
	
	document.getElementById("mw-panel").style.display='none';
	document.getElementById("ca-nstab-main").style.display='none';
	document.getElementById("ca-talk").style.display='none';
	document.getElementById("ca-view").style.display='none';
	document.getElementById("ca-edit").style.display='none';
	document.getElementById("ca-ve-edit").style.display='none';
	document.getElementById("ca-history").style.display='none';

	document.getElementById("pt-createaccount").style.display='none';
	document.getElementById("pt-login").style.display='none';

	document.getElementById("footer").style.display='none';
	
	document.getElementById("catlinks").style.display='none';

}