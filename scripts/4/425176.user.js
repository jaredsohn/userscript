// ==UserScript==
// @name       facebook multicolumn layout
// @namespace  Krzysztof Szumny
// @version    0.0.2
// @description  2-column facebook layout
// @include        http://*facebook.com/*
// @include        https://*facebook.com/*
// @run-at     document-start
// ==/UserScript==
// Initiate custom CSS function
function GM_addStyle(css) {
	var parent = document.getElementsByTagName("head")[0];
	if (!parent) {
		parent = document.documentElement;
	}
	var style = document.createElement("style");
	style.type = "text/css";
	var textNode = document.createTextNode(css);
	style.appendChild(textNode);
	parent.appendChild(style);
}
GM_addStyle("\
body._5vb_ #globalContainer {\
width: calc(100% - 210px);\
}\
div#contentArea{ \
width:100% !important;\
}\
#rightCol{\
display: none;\
}\
._4ikz {\
width: calc(50% - 20px);\
float: left;\
margin: 10px;\
}\
._4-u2.mbl._5us6{\
float: left;\
width: calc(50% - 20px);\
}\
#pagelet_composer{\
width: calc(100% - 20px);\
margin: 10px;\
}\
._5umn.clearfix{\
width: calc(100% - 20px);\
}\
#pagelet_canvas_nav_content{\
display:none;\
}\
#appsNav{\
display:none;\
}\
");
