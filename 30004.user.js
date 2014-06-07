// ==UserScript==
// @name          Play YouTube on XBMC
// @namespace     http://userscripts.org/users/26469/scripts
// @description   Adds a link to play flv from You Tube in XBMC
// @date          2008-07-13
// @creator       darkscout
// @include       *youtube.*/*v=*
// ==/UserScript==
// All credit for the "hard" stuff goes to Brandyn
// http://userscripts.org/scripts/show/28937

GM_registerMenuCommand("Change XBMC IP, Youtube",set_XBMC_IP);
if (GM_getValue("XBMC_IP")==undefined) {
		set_XBMC_IP;
}
var XBMC_IP=GM_getValue("XBMC_IP");
var download_url = 'http://'+XBMC_IP+'/xbmcCmds/xbmcHttp?command=playfile&parameter=http://www.youtubemp4.com/video/';
var playerDiv = document.getElementById('movie_player');
var flashvars = document.evaluate("attribute::flashvars", playerDiv, null, XPathResult.STRING_TYPE, null).stringValue;
var video_id = flashvars.match(/video_id=([^(\&|$)]*)/)[1];
var video_format = '.mp4'; 
var video_url = download_url + video_id + video_format;
function getEl(w){
	return document.getElementById(w);
}
desc = getEl("watch-views-div");
descP = desc.parentNode;
dv = document.createElement("a");
dv.innerHTML=" Play on XBMC ";
dv.setAttribute("rel", "nofollow");
dv.setAttribute("class", "actionLink");
dv.href="#";
dv.addEventListener('click',function(){playURL(video_url)},false);
descP.insertBefore(dv, desc);

function playURL(movieURL) {s
	GM_xmlhttpRequest({method: 'GET', url: movieURL})
}

function set_XBMC_IP() {
	GM_setValue("XBMC_IP",window.prompt("Enter your XBMC IP address", "192.168.0."));
}