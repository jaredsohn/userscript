// ==UserScript==
// @name        zongheng.totaltome.loadAll
// @namespace   clumsyman
// @description load all chapters in tome
// @include     http://tome.zongheng.com/parttome/*/*.html
// @grant       unsafeWindow
// @version     1
// ==/UserScript==

var jQuery = unsafeWindow.jQuery;
var Domain = unsafeWindow.Domain;
var chapterTxt = unsafeWindow.chapterTxt;

function load(source) {
	// copied from the load() function in totaltome.min.js
	var bookId = jQuery("body").attr("bookId");
	var chapterId = source.attr("chapterId");
	var chapterName = source.attr("chapterName");
	var param = {
		"chapterId" : chapterId,
		"userId" : "0"
	};
	if (window.user != null && window.user != undefined) {
		param.userId = window.user.userId;
	}
	if (typeof(window.logger) != "undefined") {
		window.logger.log(document.body.getAttribute("chapterLogger"), param);
	}
	jQuery.getScript(Domain.textHostName + "/chapterjs/" + bookId + "/" + chapterId + ".txt?r=" + (new Date().getTime()), function () {
		if (chapterTxt[chapterId] != null && chapterTxt[chapterId] != undefined) {
			console.log("load: " + chapterId + " - " + chapterName + ": " + "<<content>>");
		} else {
			console.log("load: " + chapterId + " - " + chapterName + ": " + "null");
		}
		source.html(chapterTxt[chapterId]);
		chapterTxt[chapterId] = null;
		try {
			if (typeof(ReadConfig) != "undefined") {
				var config = ReadConfig.getConfig();
				ReadConfig.apply(config);
			}
		} catch (e) {}
	});
};

function loadAll() {
	// copied from the jQuery scroll-handler function in totaltome.min.js
	// and removed visiable check
	jQuery("div.lazy-load").each(function () {
		var source = jQuery(this);
		var status = source.attr("data-bind-status");
		if (status == "1") {
			return;
		}
		var handler = function () {
			if (source.attr("data-bind-status") == "1") {
				return;
			}
			source.attr("data-bind-status", "1");
			source.html("<p>章节内容正在加载，请稍后...</p>");
			load(source);
		};
		setTimeout(handler, 100);
	});
}

loadAll();
