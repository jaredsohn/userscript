// ==UserScript==
// @name          Hubski timestamp
// @description   Places timestamp next to username in submission bylines.
// @match          http://hubski.com/*
// @include        http://hubski.com/*
// @match          https://hubski.com/*
// @include        https://hubski.com/*
// @grant          none
// ==/UserScript==
(function()
{
	if(!window.frameElement) // ignore iframes
	{
		// chromium unsafeWindow is *too* safe
		window.unsafeWindow || (
			unsafeWindow = (function() {
				var el = document.createElement('p');
				el.setAttribute('onclick', 'return window;');
				return el.onclick();
			}())
		);
		var $ = unsafeWindow.jQuery;
		//var c = unsafeWindow.console;
		
		// div.postcontent is what wraps each submission item in the list
		$("div.postcontent").each(function() {
			var user = $(this).children("div.feedsubtitle").children("a.ajax");
			var magnify = $(this).children("span.trigger").children("a.ajax");
			//c.log("user: " + user.text() + " magnify: " + magnify.attr("href"))
			
			// ajax mangify data and append time after user
			$.get(magnify.attr("href"), function(data) {
				var byline = $(data).find("div.previewbody").html();
				//var timestamp = byline.match(/<\/a>: (.*?)&nbsp;/)[0];
				var timestamp = byline.split(':')[1].split('&nbsp;')[0];
				user.after(timestamp);
			});
			
		});
	}
})();