// ==UserScript==
// @name        设置所有超链接在当前页面内打开
// @namespace   spdf
// @description 将链接设置为在当前标签页打开；对js控制的窗口打开无效
// @include     http*
// @grant       none
// @version     0.1
// ==/UserScript==
var nlink= this.document.getElementsByTagName("a");
for (var i=0; i<nlink.length; i++) {
	var alink= nlink[i];
	alink.target = "_self";
}main();
