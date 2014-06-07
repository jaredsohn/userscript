// ==UserScript==
// @name           Feedly Colorful Listview Mod
// @version        0.0.4.20140403
// @description    itemをfeed毎に着色します
// @include        http://feedly.com/*
// @include        https://feedly.com/*
// @run-at         document-end
// ==/UserScript==
var ColorfulListview = function () {
	this.initialize.apply(this, arguments);
}
ColorfulListview.prototype = {
	initialize:function () {
		this.colors = {};
	}
	,makecolor:function (str) {
		var h = 0;
		for each (var c in str) {
			h += c.charCodeAt(0);
		}
		return h % 360;
	}
	,color:function (item) {
		var itemid = item.id.replace(/^([^=]+).*$/, "$1");
		item.setAttribute("colored", itemid);
		if (this.colors[itemid] == undefined) {
			this.colors[itemid] = this.makecolor(itemid);
			GM_addStyle(
				"div[colored='" + itemid + "'] {background:hsl(" + this.colors[itemid] + ",70%,80%) !important;}"
				+ "div[colored='" + itemid + "']:hover {background:hsl(" + this.colors[itemid] + ",60%,70%) !important;}"
			);
		};
	}
};
mo = new MutationObserver(function (mutations) {
	var ColorfulListviewObj = new ColorfulListview();
	mutations.forEach(function (mutation) {
		Array.prototype.slice.call(mutation.addedNodes).forEach(function (node) {
			if (node.tagName=="DIV" && node.className=="u0Entry ") {
				ColorfulListviewObj.color(node);
			};
		});
	});
});
mo.observe(document.getElementById("box"), {childList:true, subtree:true});
