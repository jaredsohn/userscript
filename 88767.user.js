// ==UserScript==
// @name           Wikipedia
// @namespace      ckiikc
// @include        http://*.wikipedia.org/*
// ==/UserScript==

(function() {

	var middle_size=60; //<<<<<< modify this value to stretch the middle content (max middle_size value=100)
	
	if (middle_size>100){middle_size=100}; //(max check)
	
	var left_size=(100-middle_size)/2; //automatically adjust left and righ distance for left and top menù
	var right_size=left_size; //automatically adjust left and righ distance for left and top menù

	GM_addStyle("body { max-width:" + middle_size + "%; margin-left:auto; margin-right:auto; }");
	GM_addStyle("#mw-head{ max-width:" + middle_size + "% ; margin-left:auto; margin-right:" + right_size + "%; }");
	GM_addStyle("#mw-panel{  margin-left:" + left_size + "%; margin-right:auto; }");

})();