// ==UserScript==
// @name          使用左右方向键翻页(用于www.epzw.com)
// @namespace      http://userscripts.org/users/59173/scripts
// @description  在E品中文网看小说时，可以使用左右方向键翻页。或许可以用于其他小说网站？
// @include        http://www.epzw.com/files/article/html/*
// @exclude        http://www.epzw.com/files/article/html/*/index.html
// ==/UserScript==
	var oldscript = document.evaluate("//script[contains(text(),'jumpPage()')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var string=oldscript.text;
	string=string.substring(0,string.indexOf('}')+2);
	string=string.replace("()","(event)");
	string+="-->";
	var newscript = document.createElement('script');
	newscript.type = 'text/javascript';
	newscript.text = string;
	oldscript.parentNode.replaceChild(newscript,oldscript);
	document.body.setAttribute("onkeydown","jumpPage(event)");
