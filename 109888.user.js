// ==UserScript==
// @name           Future_Fist MediaFire auto-download,Password Filler
// @namespace      http://userscripts.org/scripts/show/109888
// @include        http://www.mediafire.com/?*
// @updated        2011-08-15
// ==/UserScript==

/*
Time in ms to wait before auto-closing tab.   Allow time for the download to start (and
to accept the download if that isn't set to happen automatically).  If 0 or less, tab will
not close.  To work, set "dom.allow_scripts_to_close_windows" (in about:config) to true.
*/
var windowClose = 0;


updateCheck(1);

window.addEventListener("DOMNodeInserted", linkCheck, true);
function linkCheck(e) {
	var link = e.target;
	if (link.getAttribute("href") && /start download/.test(link.textContent) && /block/.test(link.parentNode.getAttribute('style'))) {
		document.body.innerHTML = '<a href="'+link+'">'+link+'</a>';
		location.href = link.href;
		if (windowClose > 0) setTimeout('this.close()',windowClose);
	}
}

/* Version checker */
function updateCheck(dayDelay){
	if (parseInt(GM_getValue('last_check', 0)) + 24*3600*1000 > (new Date()).getTime()) return;
	var scriptNum = 65655;
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/'+scriptNum+'.meta.js?'+(new Date()).getTime(),
		headers: {'Cache-Control': 'no-cache'},
		onload: function(response){
			GM_setValue('last_check', ''+(new Date()).getTime());

			var localVersion = parseInt(GM_getValue('local_version',0));
			var remoteVersion = parseInt(/@uso:version\s*([0-9]+?)\s*$/m.exec(response.responseText)[1]);
			dayDelay = parseInt(GM_getValue('day_delay',dayDelay));
			
			if (!localVersion || remoteVersion <= localVersion) GM_setValue('local_version',remoteVersion);
			else if (dayDelay > 0) GM_setValue('day_delay',dayDelay-1);		
			else if (confirm('There is an update available for the Greasemonkey script "'+/@name\s*(.*?)\s*$/m.exec(response.responseText)[1]+'".\nWould you like to go to the install page now?')) {
				GM_openInTab('http://userscripts.org/scripts/show/'+scriptNum);
				GM_setValue('local_version', remoteVersion);
				GM_deleteValue('day_delay');
			}
		}
	});
}

// ==UserScript==
// @name          Mediafire Cleaner
// @namespace     http://userstyles.org
// @description	  This script cleans mediafire, specifically at the download page into more clean and nice.
// @author        s4nji
// @homepage      http://userstyles.org/styles/35721
// @include       http://mediafire.com/*
// @include       https://mediafire.com/*
// @include       http://*.mediafire.com/*
// @include       https://*.mediafire.com/*
// ==/UserScript==
(function() {
var css = ".footer, #catfish_div, #remove_ads_button2, #remove_ads_button1, div[style='margin: auto; width: 500px;'] {\ndisplay: none; }\n\n#download_visible_wrapper > .ninesixty_container:nth-child(2) {\nmargin-top: 15% !important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
document.getElementsByName("downloadp")[0].value = "moviesnhacks.com";