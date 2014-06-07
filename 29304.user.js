// ==UserScript==
// @name           http://forum.gamer.com.tw/
// @namespace      http://www.w3.org/1999/xhtml
// @description    http://forum.gamer.com.tw/
// @include        http://forum.gamer.com.tw/*
// ==/UserScript==
function createNode(type, attributes, props) {
	var node = document.createElement(type);
	if (attributes) {
		for (var attr in attributes) {
			node.setAttribute(attr, attributes[attr]);
		}
	}
	if (props) {
		for (var prop in props) {
			if (prop in node) node[prop] = props[prop];
		}
	}
	return node;
}

var scripts = document.getElementsByTagName('body')[0];
if (!scripts) return;
scripts = scripts.getElementsByTagName('script');
if (!scripts) return;

var replace_url = '';
var original_url= 'http://pic.bahamut.com.tw/js/forumRightMenu.js?t=2009122701';
var len = scripts.length;
for (var i = len-1; i >= 0; i--) {
	var f = scripts[i];
	if (f.src == original_url) 
		{

			var newsc = createNode("script", {style: "display: none", language: "JavaScript1.2",src:"http://vanillasky.myweb.hinet.net/forumRightMenu2.js"});

			f.parentNode.insertBefore(newsc, f);
			f.parentNode.removeChild(f);		
		}
}


