// ==UserScript==
// @name           autoMUpremium
// @namespace      JollyIsTheRoger	
// @description    auto adds the 'mgr_dl.php' to the download link
// @include        http://www.megaupload.com/?*
// @exclude        http://www.megaupload.com/?mgr*
// ==/UserScript==

document.location.href = document.location.href.replace('?', 'mgr_dl.php?');