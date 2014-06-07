// ==UserScript==
//
// @name 有道词典网页版搜索框自动聚焦
// 
// @description 适用于从其他程序切回网页版词典后，对输入框自动聚焦，不用移动鼠标或手动键盘聚焦。
// 				这也是本人第一个userscript,虽然简单但能有效减少鼠标移动。嘛~这点就够了
//
// @version 1.0
// 
// @author kidliaa
//
// @include http://dict.youdao.com*
//
// ==/UserScript==

window.onload = function() {
			(function() {
			var location = "" + window.location;
			var matchUrl = /dict.youdao.com*/;
			if (location.match(matchUrl) == "dict.youdao.com") {
			var beFocus = document.getElementById("query");
			addEventListener("focus", function(){beFocus.focus();}, false);
			}
			})();
	};
