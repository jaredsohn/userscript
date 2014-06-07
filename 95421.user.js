// ==UserScript==
// @name           163wb
// @authur	   Garphy
// @description    Left/Right paging support
// @namespace      http://www.w3.org/1999/xhtml
// @include        http://t.163.com/*
// ==/UserScript==
var exec = function (cmd){
	location.assign( "javascript:"+ cmd +"; void(0) ");
}
document.addEventListener('keypress', function(e) {
	e = e || window.event;
	var key = e.keyCode ? e.keyCode : ( e.which ? e.which : e.charCode );
	var obj = e.target;
	//TEXTAREA excluded
	if( obj.nodeName == 'TEXTAREA') return;
	var num = document.getElementById('pageList').getElementsByTagName('span').length;
	//LEFT
	if( key==37 && num > 1 ){
		exec("listPage.splitPage('previous')");
	//RIGHT
	}else if( key==39 && num > 0 ){
		//window.listPage.splitPage('next');
		exec("listPage.splitPage('next')");
	}
},false);