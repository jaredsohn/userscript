// ==UserScript==
// @id             chrome_extension_download_helper
// @name           Chrome扩展下载助手
// @version        1.1
// @namespace      jiayiming
// @author         jiayiming
// @description    在Chrome官方扩展下载页面顶部添加直接下载功能，方便下载备份和避免大瓷器投毒。
// @include        *://chrome.google.com/webstore/*
// @updateURL      https://userscripts.org/scripts/source/156472.meta.js
// @downloadURL    https://userscripts.org/scripts/source/156472.user.js
// @run-at         document-end
// ==/UserScript==

(function()  {
	var DEBUG = 0;
	function log(message) {
		if (DEBUG && GM_log) {
			GM_log(message);
		}
	}

	function $(select) {
		var name = select.substring(1);
		switch (select.charAt(0)) {
		case '#':
			return document.getElementById(name);
		case '.':
			return document.getElementsByClassName(name);
		case '/':
			return document.getElementsByTagName(name);
		default:
			return document.getElementsByName(select);
		}
	}

	//悬浮下载按钮
	function floatBtn() {
		var html = '<div class="tips_container"><a  href="" onclick="location.href=\'https://clients2.google.com/service/update2/crx?response=redirect&amp;x=id%3D\'+location.href.match(/\\/detail\\/[^\\/]*?\\/([a-z]+)/i)[1]+\'%26uc\'" style="color:red" >\u70B9\u6211\u76F4\u63A5\u4E0B\u8F7D\u6269\u5C55</a></div>';
		var css = '.tips_container{position:fixed;top:0.5em;left:43%;width:8em;color:green;opacity:0.8;background:#fff;padding:6px;z-index: 2147483647;}.tips_container:hover{opacity:1.0}';
		var style = document.createElement('style');
		style.textContent = css;
		document.head.appendChild(style);
		if ($("#floatBtn") == null) {
			var div = document.createElement('div');
			div.style.position = 'relative';
			div.innerHTML = html;
			div.id = 'floatBtn';
			document.body.insertBefore(div, document.body.childNodes[0]);
		} else {
			//document.querySelector("div.tips_container").innerHTML = "";
		}
                log(div.innerHTML);
	}

        floatBtn();
})();