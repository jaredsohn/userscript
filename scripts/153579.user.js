// ==UserScript==
// @name        [LINK] magnet redirect
// @namespace   Vinicius W Haas
// @description it redirects all magnet to a link (webui in a remote pc)
// @include     *
// @version     1
// ==/UserScript==

var ADDR_TORRENT_SERVER = "iporadress:port";
var USER_TORRENT_SERVER = "username";
var PASS_TORRENT_SERVER = "password";
/***********************************************\
* CONFIGURATION OF THIS USERSCRIPT              *
* ADDR is the address of your computer          *
* USER is the user of your Torrent Client       *
* PASS is the password of your Torrent Client   *
\***********************************************/

var AllLinks = document.getElementsByTagName("a");
for(var i = 0; i < AllLinks.length; i++) {
	if(AllLinks[i].href.indexOf("magnet:") == 0){
		AllLinks[i].href="http://"+ USER_TORRENT_SERVER + ":" + PASS_TORRENT_SERVER + "@" + ADDR_TORRENT_SERVER + "/gui/?action=add-url&s=" + AllLinks[i].href;
	}
}