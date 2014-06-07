// ==UserScript==
// @name           DouKu
// @namespace      http://userscripts.org/scripts/show/41964
// @description    add a "Search in YouKu" button on DouBan's movie subject pages.
// @include        http://www.douban.com/subject/*
// ==/UserScript==

var DouKu = {
	initialize: function() {
		// available for movie subjects only
		if (this.xpath("//div[@id='nav']/a[@class='now' and @href='/movie/']") == null) return;
		this.createButton();
	},
	createButton: function() {
		var btn = document.createElement('a');
		with (btn) {
			className = "redbutt ll";
			innerHTML = '<span>搜索优酷</span>';
			href = 'http://so.youku.com/search_video/q_' + this.xpath("//h1")[0].innerHTML;
			target = '_blank';
		}
		this.xpath("//div[@id='mainpic']")[0].appendChild(btn);
	},
	xpath: function(query) {
		var nodes = document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (nodes.snapshotLength > 0) {
			var ret = [];
			for (var i=nodes.snapshotLength-1; i>=0; i--)
				ret.push(nodes.snapshotItem(i));
			return ret;
		} else {
			return null;
		}
	}
};

window.addEventListener("load", function(){ DouKu.initialize(); }, false);