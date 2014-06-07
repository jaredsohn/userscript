// ==UserScript==
// @name        實價登錄 Layout Changer
// @namespace   River
// @include     http://lvr.land.moi.gov.tw/N11/*
// @run-at	document-start
// @grant	none
// @version     0.1
// ==/UserScript==


$(function(){
	$("[name=search]").click(_lvr_search_on_click);
});

function _lvr_search_on_click(){

	var viewportWidth = $(window).width();
	var viewportHeight = $(window).height();

	$(".content").css("position", "absolute").css("right", "10px");
	$(".contain_left").css("position", "absolute").css("left", "0").css("width", (viewportWidth - 650) + "px");
	$(".footer").hide();
		
	this.unbind("click", _lvr_search_on_click);
}