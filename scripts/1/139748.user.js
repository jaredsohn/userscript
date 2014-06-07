// ==UserScript==
// @name           change acFun Embed
// @description    改变Acfun的视频式样
// @include        http://www.acfun.tv/v/*
// @require        http://code.jquery.com/jquery-latest.min.js
// @author         congxz6688
// @version        2012.8.25
// @grant          GM_addStyle
// ==/UserScript==


if ($("#info-article").children("a")[1].href.indexOf("/v/list63/index.htm") == -1) {
	function changeTo(w) {
		var buttonn = w.target;
		var wid = buttonn.value;
		acFuncss="";
		acFuncss+="#ACFlashPlayer-re{width:"+(Number(wid) + 407)+"px;height:"+ (Math.floor(Number(wid) / 16 * 9) + 47) +"px; position:static;}";
		acFuncss+="#item-player-shadow{display:none;}";
		acFuncss+="body{overflow-x:hidden;}";
		GM_addStyle(acFuncss);	
		content.scrollTo(0, 145);
	}
	var newSpanasa = $("<span>").css({
			"display" : "block"
		}).appendTo($("#area-player"));
	$("<input>", {
		type : "button",
		val : "640",
		click : changeTo
	}).appendTo(newSpanasa);
	$("<input>", {
		type : "button",
		val : "720",
		click : changeTo
	}).appendTo(newSpanasa);
	$("<input>", {
		type : "button",
		val : "800",
		click : changeTo
	}).appendTo(newSpanasa);
	$("<input>", {
		type : "button",
		val : "854",
		click : changeTo
	}).appendTo(newSpanasa);
	$("<input>", {
		type : "button",
		val : "960",
		click : changeTo
	}).appendTo(newSpanasa);
}