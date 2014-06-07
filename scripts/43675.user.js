// ==UserScript==
// @name           Fix Students Homework Description at E-Course of NUTN 
// @namespace      http://dxball.pixnet.net/blog/
// @version	v1.1
// @description    修正Firefox無法顯示課程網站作業的敘述
// @include        http://ecourse.nutn.edu.tw/stu/stu_homework.aspx
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
var original_url= 'http://ecourse.nutn.edu.tw/js/div_prompt.js';
var original_url2= 'http://ecourse.nutn.edu.tw/js/onmouse_color.js';
var len = scripts.length;
for (var i = len-1; i >= 0; i--) {
	var f = scripts[i];
	if (f.src == original_url || f.src == original_url2) 
		{
			var newsc = createNode("script", {style: "display: none", language: "JavaScript1.2",src:"http://dxball-go.myweb.hinet.net/div_prompt.js"});
			f.parentNode.insertBefore(newsc, f);
			f.parentNode.removeChild(f);		
		}
}