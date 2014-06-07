// ==UserScript==
// @name           arabseed no ads 1
// @author         TecHPrO
// @namespace      a
// @description    bypass ads before get download link
// @include        http://www.dualmarket.info/link.php?url=*
// @include        http://www.dualmarket.info/links.php?url=*
// @include        http://www.dualmarket.info/url.php?url=*
// @include        http://www.3rbforex.com/forex.php?url=*
// @include        http://www.forum.arabseed.com/redirect/link.php?url=*
// @include        http://www.forum.arabseed.com/redirect/links.php?url=*
// @include        http://www.forum.arabseed.com/redirect/urls.php?url=*
// @include        http://www.forum.arabseed.com/redirect/url.php?url=*
// ==/UserScript==
	
var link=document.getElementById("continue").getElementsByTagName("a")[0].href;
window.location=link;	