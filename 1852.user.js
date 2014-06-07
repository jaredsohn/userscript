// ==UserScript==
// @name          4chan Cleaner
// @author        ankut
// @include	  http://*.4chan.org/*
// @include	  http://*.4channel.org/*
// @description	  Cleans up 4chan
// ==/UserScript==

var cleaner = {
	xpath : function(expr, ref, type) {
		ref = (ref ? ref : document);
		type = (type ? type : XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
		return document.evaluate(expr, ref, null, type, null);
	},

	getPage : function getPage(id, uri)
	{
		GM_xmlhttpRequest({
		    method: 'GET',
		    url: uri,
		    headers: {
        		'User-agent': 'Mozilla/4.0',
	        	'Accept': 'text/html',
		    },
		    onload: function(e) {
			var page = document.createElement("div");
			page.innerHTML += e.responseText.replace(/adbrite/g, "");
			
			var forms = cleaner.xpath(".//div[@class='thread']", page);
			for (var i = 0; i < forms.snapshotLength; i++)
			{
				document.getElementById("pageDiv" + id).appendChild(forms.snapshotItem(i));
				cleaner.openReplyNew();
			}
		    }
		});
	},

	getNavLinks : function()
	{
		var links = [];

		// get the links to the next pages, if they exist
		var nav = cleaner.xpath("//div[@class='pages']/a");
		for (i = 0; i < nav.snapshotLength; i++) {
			links.push(nav.snapshotItem(i).href);
		}
	
		return links;	
	},

	openReplyNew : function()
	{
 		var replies = cleaner.xpath("//a[@class='replylink']");
		for (var i = 0; i < replies.snapshotLength; i++)
			replies.snapshotItem(i).target = '_blank';
	},

	hideShowPost : 1,
	buildPost : function()
	{
		GM_addStyle("div.containpost { display: none !important; }");
		GM_addStyle("div.createpost { text-align: center; width: 100% }");

		var postarea = cleaner.xpath("//form[@name='post']").snapshotItem(0);
		var postdiv = document.createElement("div");
		var linkDiv = document.createElement("div");
		var linkPost = document.createElement("a");

		postdiv.className = "containpost";
		linkDiv.className = "createpost";
		linkPost.innerHTML = "New Post";
		linkPost.href = "#";
		linkPost.addEventListener("click", function(e) {
			if (cleaner.hideShowPost++ % 2)	GM_addStyle("div.containpost { display: block !important; }");
			else 				GM_addStyle("div.containpost { display: none !important; }");
		}, true);

		postdiv.appendChild(postarea);
		linkDiv.appendChild(linkPost);
		linkDiv.appendChild(postdiv);
				
		return linkDiv;
	},


	init : function()
	{
		// get the header
		var navtop = document.getElementById("boardNavDesktop");
		if (!navtop) return;

		GM_addStyle("blockquote {border-bottom: 1px dotted #BFBFBF; /*clear: both*/}");
		GM_addStyle("img {padding: 5px;}");

		var links = cleaner.getNavLinks();
		cleaner.openReplyNew();

		var body = document.createElement("body");
		var pageDiv = document.createElement("div");

		// put the navbar on top
		body.appendChild(navtop);
		body.appendChild(document.createElement("hr"));
		body.appendChild(cleaner.buildPost());
		body.appendChild(pageDiv);

		// grab the forms only
		var forms = cleaner.xpath("//div[@class='thread']");
		for(var i = 0; i < forms.snapshotLength; i++)
			pageDiv.appendChild(forms.snapshotItem(i));

		for (var i = 0; i < links.length; i++) { 
			var page = document.createElement("div");
			page.setAttribute("id", "pageDiv" + i);
			body.appendChild(page);
		}

		document.body.parentNode.replaceChild(body, document.body);

		for (var i = 0; i < links.length; i++) { 
			cleaner.getPage(i, links[i]);
		}
	}
}; 

if (document.body) cleaner.init();