// ==UserScript==
// @id             FeedlyLastModifiedFix
// @name           Feedly LastModified Fix
// @version        0.0.1.20140121
// @description    記事の取得時刻を経過時間から記事が公開された時刻に書き換えます。ただそれだけのscriptです。
// @include        http://feedly.com/*
// @include        https://feedly.com/*
// @run-at         document-end
// ==/UserScript==
var css = {
	publish:"div.lastModified>span"
};
var formatDate = function (dateobj, dtype) {
	var result;
	dateobj.toLocaleString().match(/^(\d{4})年(\d{1,2})月(\d{1,2})日\s+(\d{1,2}):(\d{1,2}):(\d{1,2})/)
	var datetime = RegExp.$1 + "-" + ("0" + RegExp.$2).slice(-2) + "-" + ("0" + RegExp.$3).slice(-2) + " " + ("0" + RegExp.$4).slice(-2) + ":" + ("0" + RegExp.$5).slice(-2) + ":" + ("0" + RegExp.$6).slice(-2);
	switch (dtype) {
		case "datetime":
			result = datetime;
			break;
		case "timestamp":
			result = datetime.replace(/-/g, "").replace(/ /, "T").replace(/:/g, "")
			break;
	}
	return result;
};
var lastModifiedFix = function (obj) {
	if (obj.getAttribute("lastModifiedfix")==null) {
		var lastModified = obj.querySelector("span");
		if (lastModified==null) {
			lastModified = obj;
		}
		var publish = new Date(obj.title.replace(/^published:(.+?GMT).+$/, "$1"));
		if (publish.getDate()==new Date().getDate()) {
			lastModified.innerHTML = formatDate(publish, "timestamp").replace(/\d{8}T(\d{2})(\d{2})\d{2}/, "$1:$2");
		} else {
			lastModified.innerHTML = formatDate(publish, "timestamp").replace(/\d{4}(\d{2})(\d{2})T\d{6}/, "$1/$2")
		}
		obj.setAttribute("lastModifiedfix", "true");
	};
};
var mo = new MutationObserver(function () {
	var items = Array.prototype.slice.call(document.querySelectorAll(css.publish));
	items.forEach(function (item) {
		lastModifiedFix(item);
	})
});
mo.observe(document.getElementById("box"), {childList:true, subtree:true});