// ==UserScript==
// @name       	修正就业在线
// @namespace  	http://allan@100steps.net/
// @version    	0.1
// @description 修正就业在线chrome中无法看下一页的问题
// @match		http://202.38.194.183:8880/information/*
// @match		http://employ.scut.edu.cn:8880/
// @copyright	2012+, Allan Ruin
// ==/UserScript==


var mbody = document.getElementsByTagName('body')[0];
var newscript = mbody.parentNode.appendChild(document.createElement('script'));
var newHtml = "function gotoPage(pageNO){\n" 					+ 
	"var form = document.getElementsByName('listForm')[0];\n" 	+ 
	"form.pageNO.value = pageNO;\n"								+
	"form.submit();\n"											+
"}";

newscript.textContent = newHtml;