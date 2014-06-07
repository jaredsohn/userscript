// ==UserScript==
// @name    No More NP
// @namespace    reddit.com/user/LowSociety
// @description    Replances np links with www and ads "NP" to the title attribute.
// @match    *://*.reddit.com/*
// @version    1.1
// ==/UserScript==

// reddit uses jQuery so just steal that
var $ = unsafeWindow.jQuery; // unsafeWindow is bad!~
var noMoreNP = {
	init : function() {
		$("a[href*='np.reddit']").each(function() {
			this.href = this.href.replace("np.reddit","www.reddit").replace("www.www.","www.");
			var title = $(this).attr("title");
			if(title == null)
				title = "NP";
			else
				title = "NP - " + title;
			$(this).attr("title",title);
		});
	}
}

noMoreNP.init();