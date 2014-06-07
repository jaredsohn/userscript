// ==UserScript==
// @name			LAU Websense & WebProxy
// @author			ROX
// @namespace		http://www.Rachini.com
// @description		LAU Websense & WebProxy
// ==/UserScript==

//var BADURL = "http://192.168.104.211:15871";
//var CURL = content.document.location.href;

if (content.document.location.href.match("http://192.168.104.211:15871"))
{
var PREURL = "http://www.arabinarab.com/proxy/browse.php?u=://";
var BLKURL = document.getElementById("UrlText");
var NEWURL = PREURL + BLKURL.innerHTML.slice(7,-1) + "&refresh=399";
//alert(NEWURL);
content.document.location.replace(NEWURL);
}
