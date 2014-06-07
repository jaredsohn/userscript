// ==UserScript==
// @name          湘南学院教务样式补丁
// @namespace     http://www.haidx.com/xnxyjw-style-patch.html
// @description	  fix the style under Chrome , Firefox
// @include       http://www.xnxyjw.com/*
// @version		  0.2
// ==/UserScript==


(function() {

	GM_addStyle("#OfficeMain {padding-left:110px;}");		//fix main frame's position
	GM_addStyle("#proc {display: none;}");	//hide loading div
})();


