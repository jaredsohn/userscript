// ==UserScript==
// @name           style cleanup for kdice
// @namespace      kakku man style fix
// @description    kakku man cleans up ryan's shitty style
// @include        http://www.kdice.com/*
// @include        http://kdice.com/*
// @require		   https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
// @version 	   1.1
// ==/UserScript==


kmsc = {};
	
kmsc.checkUD = function(dat){
	answer = $(dat).find('.tagline').text().split(">")
	var ver = answer[answer.indexOf('kmsc')+1];
	
	if(kmsc.VERSION != ver){
		if(confirm("version "+ ver +" of kakku man's style cleanup is available!\nDo you want to upgrade now?"))	window.location = "http://userscripts.org/scripts/source/91990.user.js";
	}
	GM_log("checked for update=="+ver+" ? "+kmsc.VERSION);
}

kmsc.init = function() {

//check version:
	kmsc.VERSION="1.1";
	var now = new Date().getTime()
	if(GM_getValue("kmsc_checkUpdate")!=undefined && now-parseFloat(GM_getValue("kmsc_checkUpdate")) > 86400000){	//daily check
		//GM_log("gonna check for update >"+(now-parseFloat(GM_getValue("kmsc_checkUpdate")))+" ??");
		$.get("http://kdice.com/profile/45032677", function(data){ 		kmsc.checkUD(data); 		});
	}
	GM_setValue("kmsc_checkUpdate", now.toString());
	
//remove red shit:
	$('.menu2 style').remove();	

//header:
	$('#logo a').appendTo("#hd")
	$('#hd div:first-child').hide();
	$('#hd').css("padding","5px 0 5px").css("text-align","left").css("width","auto")
	$('#hd img').css("height","45px")
	
	//menu
	$('#iogc-regularMenu').clone().insertAfter('#hd');
	$('#outside #iogc-regularMenu:last').hide();


if(window.location.href.indexOf("#")!= 17  && window.location.href.indexOf("#")!= 21 ) {
//menu
	//$('#iogc-regularMenu').clone().insertAfter('#hd');
//cleaning			
	$("h2.mainheader a").css("font-size","26px").css("color","#555555").css("float","right").css("font-weight","bold").css("padding","18px 20px 0");
	$("h2.mainheader a").insertAfter("#hd img");
	$('.hmenu').css("margin"," 0px");
	$('#forum table').css("width","");
	$('#forum td').css("padding","");
	$('#forum h3').hide();
	$('#menu-out').hide();
	$('#forum div').css("padding-bottom","");
	$('.all-item').css("margin-bottom","");
	
	if(window.location.href.indexOf("profile")!= 17  && window.location.href.indexOf("profile")!= 21 ){		$("h2.mainheader").remove();	}
	
}else{
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
	$('.iogc-ChatPanel').css("margin","0 0 0 5px");
//buttons	
	$(".iogc-NewButton").addClass("gwt-Button");
	$(".iogc-NewButton .gwt-Button").removeClass('iogc-NewButton')
	$(".gwt-Button").css("padding","2px");

//late stuff
	window.setTimeout(function(){
	if( $('#iogc-regularMenu').length == 1){
		GM_log("dctools OFF: "+$('#iogc-regularMenu').length+" >> "+$('.dct-infobox').length+" > "+$('.dct-aet').length);		
		//$('#iogc-regularMenu').insertAfter('#hd');
	}else if( $('#iogc-regularMenu').length == 2){
		GM_log("dctools ON: "+$('#iogc-regularMenu').length+" >> "+$('.dct-infobox').length+" > "+$('.dct-aet').length);		
	}else{
		GM_log("dctools ON?: "+$('#iogc-regularMenu').length+" >> "+$('.dct-infobox').length+" > "+$('.dct-aet').length);	///WTF?! :S	 i really dont get this
	}
//infobox cleanup
		$('.iogc-SidePanel > .iogc-SidePanel-inner .iogc-LoginPanel-playerRow:nth-child(4)').hide();
		$('.iogc-SidePanel > .iogc-SidePanel-inner .iogc-LoginPanel-playerRow:nth-child(3)').hide();
		//}
		$('.iogc-SidePanel > .iogc-SidePanel-inner .iogc-LoginPanel-playerRow:nth-child(2)').hide();
	}, 5500);
	}
}

$(document).ready(function() {
	if (window.top != window.self)  //-- Don't run on frames or iframes
	    return;
	
	window.setTimeout(kmsc.init, 1400);
});