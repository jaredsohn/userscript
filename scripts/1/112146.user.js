// Google Search Reverse || Google搜索还原器
// version 0.4
// 2011-9-5
// Copyright (c) 2011, Felix Ding
// http://dingyu.me/blog
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Google Search Reverse || Google搜索还原器", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Search Reverse || Google搜索还原器
// @namespace     http://dingyu.me/
// @description   Google binds an "onmousedown" event to each link in the search results so as to track what you are going to visit, which unfortunately prevents you from opening any new tabs with "Command+Click" ("Ctrl+Click" on Windows). This little script removes the event binding and gives your control back. Another feature of the script is it reverses the outgoing URL to its original value, instead of the one encrypted by Google. STOP BEING EVIL GOOGLE!  || Google在其搜索结果中，给每一个链接绑定了“onmousedown”事件，以便于追踪你要访问的网站地址，不幸的是这样一来你就没办法用“Command+Click”（Windows上是“Ctrl+Click”）来开新标签页了。这个简单的脚本删除了上述事件绑定，并将网页的控制权交还给你。 这个脚本的另外一个功能是，还原每一个搜索结果链接到其原本的链接，而非经由Google加密的。别再作恶了Google！
// @include http://*.google.com/search?*
// @include https://*.google.com/search?*
// ==/UserScript==

// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};

var links = document.getElementsByTagName("a");
var length = links.length;

for(var i=0;i<length;i++) {
	links[i].removeAttribute("onmousedown");

	var href = links[i].getAttribute("href");
	if(href && href.slice(0, 4) == "/url") {
		var url = decodeURIComponent(parseUri(href).queryKey.url);
		links[i].setAttribute("href", url);
	}
}