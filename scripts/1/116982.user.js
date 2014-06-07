// ==UserScript==
// @name           115 Linker
// @namespace      68a7053d-e267-41ba-95d4-1ff56be19ad5
// @description    115网盘文件页去除广告。原来能跳过未登录用户30秒等待的，现在不行了，没啥用了。详细介绍: http://userscripts.org/scripts/show/116982
// @include        http://115.com/file/*
// @author         tomchen1989
// @version        1.2.1
// ==/UserScript==
function addGlobalStyle(css) {
	if (typeof(GM_addStyle) !== "undefined") {
		GM_addStyle(css);
	} else {
		var head, style;
		head = document.getElementsByTagName("head")[0];
		if (!head) { return; }
		style = document.createElement("style");
		style.type = "text/css";
		style.innerHTML = css;
		head.appendChild(style);
	}
}
addGlobalStyle(".ban-right,.ban-top,.ban-info{display:none;}");