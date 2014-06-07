// ==UserScript==
// @name          湘南学院教务样式补丁
// @namespace     http://www.psjay.com/xnxyjw-style-patch.html
// @description	  fix the style under Chrome , Firefox
// @include       http://www.xnxyjw.com/*
// @version		  0.1.0
// ==/UserScript==


(function() {

	GM_addStyle("#OfficeMain {width: auto;}");		//fix main frame's position
	GM_addStyle("#proc {display: none;}");	//hide loading div
})();

