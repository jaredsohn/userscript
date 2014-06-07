// ==UserScript==
// @id             auto-clicktoview.org
// @name           auto clicktoview.org
// @author         fizzebu
// @description    Redirects to the stream
// @require        http://code.jquery.com/jquery-1.8.2.min.js
// @include        *://clicktoview.org/*
// @run-at         document-end
// ==/UserScript==

function center(){
	$("table:first").css("margin-top",0);
	arg = window.innerHeight/2 - $("table:first").height() / 2 - 17;
	$("table:first").css("margin-top",arg);
}

function initStream(){
    center();
	window.onresize = center;
	$("body").css("background-color","#000");
	function $$(elem){return document.getElementById(elem);}
	$("table:first").css("border",0);
	$$("player_ads").style.display = 'none';
	$$("player_img").style.display = 'none';
	$$("player_code").style.visibility = 'visible';
}

function init(){
    h3 = $("body").find("h3").html();
    if(h3 == "Stream File"){
        $("table:first").show().parentsUntil("body").andSelf().siblings().hide();
         $("table:first").append('<tr><td colspan="2" ><input id="btn_download" value="Continue to Video" type="submit"></input></tr></td>');
         $("input[class=captcha_code]").focus();
        center();
    } else if(h3 == "Streaming Link Generated"){
    	$("html").css("height","100%");
    	$("body").css("height","100%");
        $("table:first").show().parentsUntil("body").andSelf().siblings().hide();
        initStream();
	}
}

$("form:first").find('input[type=submit][value="Create Streaming Link"]').trigger("click").hide().parentsUntil("body").siblings().hide();
init();