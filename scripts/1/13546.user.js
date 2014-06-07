// ==UserScript==
// @name           NyaaTorrents
// @namespace      http://www.nyaatorrents.org
// @description    Convert torrent info links to direct links
// @include        http://www.nyaatorrents.org/*
// ==/UserScript==

var nyaa = {
	xpath : function(expr, ref, type) {
		ref = (ref ? ref : document);
		type = (type ? type : XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
		return document.evaluate(expr, ref, null, type, null);
	},

	replace : function() {
		var links = nyaa.xpath("//a");
		for (var i = 0; i < links.snapshotLength; i++)
		{
			links.snapshotItem(i).href = links.snapshotItem(i).href.replace(/\?page=torrentinfo/, "?page=download");			
		}
	}
};

if (document.body)
        nyaa.replace();