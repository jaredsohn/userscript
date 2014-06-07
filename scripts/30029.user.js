// ==UserScript==
// @name YouTube Old My Videos
// @description Takes you from the new my-video's page to the old one
// @author KayKay
// @namespace kk.tools
// @version 1.0cm
// @include        http://youtube.com/my_videos2*
// @include        http://*.youtube.com/my_videos2*
// ==/UserScript==
GM_setValue("version","1.0");

top.window.location.pathname = "/my_videos";

setTimeout(check_version,1000);
function check_version() {
	if(typeof GM_getValue("day") == "undefined") GM_setValue("day",(new Date()).getDay());
	if(GM_getValue("day") != (new Date()).getDay()) {
		var script_url = "http://userscripts.org/scripts/review/30029?format=txt";
		GM_xmlhttpRequest({ method:"GET",url:script_url,
			onload:function(result) {
				if(result.responseText.indexOf("@version "+GM_getValue("version")) == -1 &&
					 confirm('A new version of the "YouTube Download" userscript for Greasemonkey is available.\n\nDo you want to update now?')) top.location.href = script_url;
			}
		});
		GM_setValue("day",(new Date()).getDay());
	}
}