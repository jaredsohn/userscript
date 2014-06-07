// ==UserScript==
// @name         Baidu Pan Filename Select Patch
// @namespace    http://jixun.org/
// @version      1.0
// @description  Allow user to select file name.
// @include      *://pan.baidu.com/*
// @copyright    2012+, Jixun
// ==/UserScript==

var cssCode = ((function () {/*
.view-file-infos {
	user-select: all;
	-o-user-select: all; 
	-ms-user-select: all;
	-moz-user-select: all;
	-webkit-user-select: all;
}
*/}).toString().match (/\/\*([\s\S]+)\*\//) [1]);
var eStyle = document.createElement ('style');
eStyle.textContent = cssCode;
document.querySelector ('head').appendChild (eStyle);