// ==UserScript==
// @id             zd@scriptish
// @name           百度知道快速回复
// @version        0.1
// @namespace      bccn.net@scriptish
// @include        http://zhidao.baidu.com/question/*
// @run-at         document-end
// ==/UserScript==
var f = function (e)
{
	if (e.keyCode == 13 && e.ctrlKey)
	{
		//Ctrl+Enter
		document.querySelector("a.btn.btn-32-green.grid-r").click();
	}
};
window.addEventListener("keypress", f, true);
document.getElementById("ueditor_0").contentWindow.addEventListener("keypress", f, true);
