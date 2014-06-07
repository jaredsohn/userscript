// ==UserScript==
// @name           laconica AJAX-Reply
// @namespace      http://blog.sebmos.com/
// @description    Shows replies inline, not as seperate pages.
// @include        http://identi.ca/*
// ==/UserScript==

window.getLaconicaReply = function(notice_id, reply_url)
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: reply_url,
		onload: function(r) {
			// something happened that shouldn't
			// have happened, so simply redirect
			// to url anyway
			if (r.status != 200)
			{
				document.location.href =
					reply_url;
				
				return false;
			}
			
			// parse notice
			var element_start =
				"<li class=\"notice_single\"";
			var t = r.responseText;
			
			if (t.indexOf(element_start) < 0)
				return false;
			t = t.substr(t.indexOf(element_start));
			t = t.substr(t.indexOf(">") + 1);
			t = t.substr(0, t.indexOf("</li>"));
			
			// add notice
			var e = document.createElement("div");
			e.setAttribute("id", reply_url);
			e.setAttribute("rel", "ajaxreply");
			e.setAttribute("style", "padding:10px 0px 0px 58px;clear:left;min-height:48px;");
			e.innerHTML = t;
			
			document.getElementById(notice_id).appendChild(e);
			
			// re-set event handlers for in-reply-to-links for new
			// reply-link
			window.initLaconicaReply();
			
			// remove in-reply-to-link that was clicked
			var links = document.evaluate(
				"//a[@href='" + reply_url + "']",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null
			);
			var link = links.snapshotItem(0);
			link.innerHTML = "";
		}
	});
};

window.initLaconicaReply = function()
{
	var elements = document.evaluate(
		"//a[@class='inreplyto']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	for (var i = 0; i < elements.snapshotLength; i++)
	{
		var element = elements.snapshotItem(i);
		
		if (element.rel == "ajaxreply")
			continue;
		
		element.rel = "ajaxreply";
		
		element.addEventListener(
			"click",
			function(event)
			{
				// clicking a link and clicking CTRL openes a new tab,
				// we respect that choice
				if (event.ctrlKey)
					return false;
				
				if (event.target.parentNode.parentNode.getAttribute("rel") == "ajaxreply")
					var notice_id = event.target.parentNode.parentNode.parentNode.id;
				else
					var notice_id = event.target.parentNode.parentNode.id;
				var reply_url = event.target.href;
				
				window.getLaconicaReply(notice_id, reply_url);
				
				// stop from linking to next page
				event.preventDefault();
			},
			false
		);
	}
};

window.initLaconicaReply();