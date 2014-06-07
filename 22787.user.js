// ==UserScript==
// @name          LOR - News collapse
// @description   News collapse
// @include       http*://*.linux.org.ru/
// @exclude       http*://*linux.org.ru/*view-message.jsp?*
// @exclude       http*://*linux.org.ru/*view-message.jsp?*
// @exclude       http*://*linux.org.ru/*s
// ==/UserScript==
//
// License: GPL
// Author:  sdio ( http://www.linux.org.ru/whois.jsp?nick=sdio )
// Version: 0.7


(function() {
	var jq;
	if (typeof(GM_log) == 'function') {
		// For FF, Mozilla (with greasemonkey sandbox)
		jq = unsafeWindow.$;
	} else {
		// For Epiphany, Opera
		jq = $;
	}

	jq("div.msg").hide();
	jq("article.news h2").click(function() { 
           jq("div.msg", this.parentNode).toggle();
           return false;
        });
})();
