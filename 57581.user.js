// ==UserScript==
// @name           cash autodownload
// @author 		   Timendum
// @namespace      sharecash
// @description    Auto-download files from sharecash.org
// @include        http://sharecash.org/offer.php?*
// @version 	   1.3
// ==/UserScript==

if (document.getElementById('notdone')) { document.getElementById('notdone').style.display = "none";}

if (document.getElementById('done')) { document.getElementById('done').style.display = "inline";}

if (document.getElementById('done').getElementsByTagName('a').length == 1 ) { document.location = document.getElementById('done').getElementsByTagName('a')[0].href; } 