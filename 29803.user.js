// ==UserScript==
// @name YourFileHost Download
// @description Adds a small download button to every video on YourFileHost
// @author KayKay
// @namespace kk.tools
// @version 1.0cm
// @include        http://yourfilehost.com/*?*file=*
// @include        http://*.yourfilehost.com/*?*file=*
// ==/UserScript==
GM_setValue("version","1.0");

var lnk_all = document.getElementsByTagName("a");
for(var i = 0; i < lnk_all.length; i++)
	if(lnk_all[i].href.match(/.*\/downloadfile.php.*/g)) {
		var lnk_dl = lnk_all[i];
		break;
	}
if(lnk_dl) {
	lnk_dl.setAttribute("href","#");
	lnk_dl.addEventListener('click', function() { var link = "http://www.flashload.net/popup.php?url=" + escape(window.document.location.href); window.open(link,'FlashLoader','fullscreen=no,toolbar=no,status=no,menubar=no,scrollbars=yes,resizable=yes,directories=no,location=no,width=800,height=600,top=100,left=100'); }, false);
}

setTimeout(check_version,1000);
function check_version() {
	if(typeof GM_getValue("day") == "undefined") GM_setValue("day",(new Date()).getDay());
	if(GM_getValue("day") != (new Date()).getDay()) {
		var script_url = "http://userscripts.org./scripts/source/29803.user.js";
		GM_xmlhttpRequest({ method:"GET",url:script_url,
			onload:function(result) {
				if(result.responseText.indexOf("@version "+GM_getValue("version")) == -1 &&
					 confirm('A new version of the "YourFileHost Download" userscript for Greasemonkey is available.\n\nDo you want to update now?')) top.location.href = script_url;
			}
		});
		GM_setValue("day",(new Date()).getDay());
	}
}