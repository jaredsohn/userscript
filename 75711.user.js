// ==UserScript==
// @name	Remove IRC on HikiCulture
// @description  Remove the IRCHighWay Chat box on Hikiculture forums index
// @require   http://usocheckup.dune.net/75711.js?maxage=5
// @include	  http://hikiculture.prophpbb.com/
// @include	http://www.hikiculture.tk
// @include	http://www.hikiculture.com
// @include	*sid=*
// @exclude *ucp.php*
// @exclude *posting.php*
// @version       0.2

// ==/UserScript==
var div = document.createElement("div");

location.replace("javascript:document.write(\"<h3>Sorry...</h3><p>I'm not going to support a community that turned it's back on me.<br /></p><p>-<a href='http://hikiculture.prophpbb.com/member620.html'>Cface</a><br /></p></div>\")");
document.body.insertBefore(div, document.body);