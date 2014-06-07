// ==UserScript==
// @name		Megaupload Autodownload
// @author		RME (www.rme.es.tl)
// @version		0.1
// @description		Downloads starts once you clic the link


// @include		http://www.megaupload.com/*d=*
// @include		http://megaupload.com/*d=*
// @include		http://*.megaupload.com/*d=*
// @namespace		http://userscripts.org/users/159112
// ==/UserScript==

window.location.href = document.getElementById('downloadlink').firstChild.href;
