// ==UserScript==
// @name google_scholar_enw_fix
// @namespace http://rainbowrain.org/#scholar_enw_fix
// @description 使google scholar使用UTF-8编码输出enw文件
// @include http://scholar.google.*/*
// @version 0.1
// ==/UserScript==
window.addEventListener("load", function() {
	var elements = document.getElementsByTagName("a");
	for (var i=0, j=elements.length; i<j; i++)
	{
		var element = elements[i];
		if (element.href && element.href.length > 0 && element.href.indexOf("/scholar.enw") != "-1")
		{
			element.href = element.href.replace("&oe=ASCII", "&oe=UTF-8").replace("&oe=GB", "&oe=UTF-8").replace("hl=zh-CN", "hl=UTF-8")
		}
	}
}, true);
