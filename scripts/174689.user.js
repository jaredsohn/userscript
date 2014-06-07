// ==UserScript==
// @id             feedlycolorfullistviewbytyjk
// @name           Feedly Colorful Listview by TYJK
// @version        1.5
// @author         http://t.qq.com/HeartBlade
// @homepage       http://userscripts.org/scripts/show/174689
// @updateURL      https://userscripts.org/scripts/source/174689.meta.js
// @description    Feedly彩色条目，并修改查看原文按钮为新标签页打开。
// @include        http*://*feedly.com/*
// @grant          GM_addStyle
// @run-at         document-end
// ==/UserScript==
(function() {
	var colors = {};
	function $x(query, context) {
		return document.evaluate(query, (context || document), null, 
		XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}
	function computeColor(title) {
		var h ="";
		for each (var c in title) {
			h += c.charCodeAt(0);
		}
		h = h % 360;
		colors[title] = h;
		return h;
	}
	function colorFun() {
		try {
			var uncolored = $x('//div[@class="u0Entry "][not(@colored)]', timeline);
			if (uncolored == null) return;
			var titleA = $x("//div[@class='u0Entry '][not(@colored)]//span[@class='sourceTitle']/a", uncolored)
			titleA.setAttribute("style", "color: black;");
			var title=$x("//div[@class='u0Entry '][not(@colored)]//span[@class='sourceTitle']//a", uncolored).attributes["data-uri"].value.split("subscription/feed/")[1];
			uncolored.setAttribute("colored", title);
			if (colors[title] == undefined) {
				var color = computeColor(title);
				GM_addStyle(
				"div[colored='" + title + "'] {background: hsl(" + color + ",70%,80%)}" +
				"div[colored='" + title + "']:hover {background: hsl(" + color + ",90%,85%)}" 
				);
			}
			//链接新建标签页打开
			var linklist=document.querySelectorAll('.condensedTools>a[title="Open in a tab"]');
			for (var a in linklist){linklist[a].target="_blank";}
		}
		catch (e) {	}
	}
	var timeline = document.getElementById("box");
	timeline.addEventListener("DOMNodeInserted",colorFun, false);
	document.addEventListener("DOMAttrModified", function () {
		var read=document.querySelectorAll('.title.read');
		for (var i=0;i<read.length;i++){
			read[i].parentNode.parentNode.parentNode.setAttribute("colored","");
		}
	}, false);
})();