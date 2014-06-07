// ==UserScript==
// @name          Tapuz forums - prevent adding post to homepage pool
// @namespace     http://www.tapuzon.co.il
// @description   DO NOT add new post to homepage pool of posts
// @include       http://www.tapuz.co.il/Forums2008/AddMsg.aspx?ForumId=*
// ==/UserScript==

window.document.getElementById('ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMain_cbxExcludedFlood').checked = true;