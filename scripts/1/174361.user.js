// ==UserScript==
// @id             zhidao.baidu.com@scriptish
// @name           BaiDu ZhiDao Helper
// @version        0.1
// @namespace      zhidao.baidu.com@scriptish
// @include        http://zhidao.baidu.com/question/*
// @run-at         document-end
// @updateURL      http://userscripts.org/scripts/source/174361.user.js
// @downloadURL    http://userscripts.org/scripts/source/174361.user.js
// @author         zklhp
// ==/UserScript==

setInterval(function () {
	btn = document.querySelector("a.btn.btn-32-green.grid-r");

	var f = function (e)
	{
		if (e.keyCode == 13 && e.ctrlKey)
		{
			//Ctrl+Enter
			btn.click();
		}
	};
	window.addEventListener("keypress", f, true);
	document.getElementById("ueditor_0").contentWindow.addEventListener("keypress", f, true);
	}, 1000);

