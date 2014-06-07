// ==UserScript==
// @name           kakku man's xsketch cleaner
// @description    bigger chatbox and guessbox and more spacious
// @description    version 0.1
// @namespace      kakku man
// @include        http://xsketch.com/#*
// @include	   http://www.xsketch.com/#*
// @include        http://gpokr.com/#*
// @include	   http://www.gpokr.com/#*
// @version        0.1
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
// ==/UserScript==

kmxc = {};

kmxc.checkUD = function(dat){
	answer = $(dat).find('.tagline').text().split(">")
	var ver = answer[answer.indexOf('kmxc')+1];
	
	if(kmsc.VERSION != ver){
		if(confirm("version "+ ver +" of kakku man's Xsketch Cleanup is available!\nDo you want to upgrade now?"))	window.location = "http://userscripts.org/scripts/source/104992.user.js";
	}
	GM_log("checked for update=="+ver+" ? "+kmsc.VERSION);
}

kmxc.init = function(){
//check version:
	kmxc.VERSION = "0.1";
	var now = new Date().getTime()
	if(GM_getValue("kmxc_checkUpdate")!=undefined && now-parseFloat(GM_getValue("kmxc_checkUpdate")) > 86400000){	//daily check
		//GM_log("gonna check for update >"+(now-parseFloat(GM_getValue("kmsc_checkUpdate")))+" ??");
		$.get("http://xsketch.com/profile/45032677", function(data){ 		kmxc.checkUD(data); 		});
	}
	GM_setValue("kmxc_checkUpdate", now.toString());
	
//gamewindow:
	$(".iogc-Controls").css("background-color"," #f0f0f4");//.css("border-bottom"," 1px solid #8899AA");
	$('.iogc-GameWindow tr:last').hide();
	$("#outside > div:last").hide();
	$('#menu div:last').hide();
	$('#mainpage').css("padding","0")
	$('.iogc-GameWindow-layout').removeClass();
//chat bigger
	$('.iogc-MessagePanel').css("margin"," 0px")
	$('.iogc-ChatPanel-messages').css("height","200px").css("width","auto");
	$('.iogc-MessagePanel-messages').css("height","225px");
	$('.iogc-MessagePanel-inner .gwt-HTML').css("padding-left"," 0px").css("padding-right"," 0px");
	$('.rdews-RoundedCompositeInside').css("padding-left"," 0px").css("padding-right"," 0px");
//chatbox
	$('.iogc-MessagePanel-inner tr:first-child').hide();
	$('table.iogc-MessagePanel-inner tr:last').hide();
	$('.rdews-RoundedCompositeInside').removeClass();
	$('.rdews-RoundedCompositeOutside').removeClass();
	$('.iogc-ChatPanel').css("margin","0 0 0 5px");//
////buttons	
//	$(".iogc-NewButton").addClass("gwt-Button");
//	$(".iogc-NewButton .gwt-Button").removeClass('iogc-NewButton')
//	$(".gwt-Button").css("padding","2px");

//header:
	$('#logo a').appendTo("#hd")
	$('#hd div:first-child').hide();
	$('#hd').css("padding","5px 0 5px").css("text-align","left").css("width","auto")
	$('#hd img').css("height","40px")
	
//chatbox's:	
	$('.iogc-MessagePanel-messages').css("height","250px");
	$('.iogc-ChatPanel-messages').css("height","220px");

	$('.rdews-RoundedCompositeInside').css("padding","0");

//menu move to stop
	$('#iogc-regularMenu').insertAfter('#hd');

GM_log("done");
}

$(document).ready(function() {
	if (window.top != window.self)  //-- Don't run on frames or iframes
	    return;

	window.setTimeout(kmxc.init, 1400);
});