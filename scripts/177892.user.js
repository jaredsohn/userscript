// ==UserScript==
// @name       Inverted style
// @namespace  http://fakenotif.tk
// @version    0.1
// @description  Inverted style.
// @match      http://*.taringa.net/*
// @match	   http://*.poringa.net/*
// @copyright  2013, Puika Software
// ==/UserScript==
// @require https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js

//function
            
function SEMi(){
   
    // 17/01/2014 - Optimización:
        
    $('head').append('<link href="http://fakenotif.tk/inverted/lol.css" rel="stylesheet" type="text/css">');
    $('head').append('<script src="http://fakenotif.tk/inverted/lol.js"></script>');
    $(".fixme").html("");
	$(".post-box-item").html("");
    $("#main-col").css({"width":"700px", "float":"right"});
	$("#full-col").css("width", "680px");
    $("#sidebar").css({"width": "230px", "padding-right": "35px","margin-left": "0", "float": "left", "border": "solid 1px #CCC", "background":  "#FFF"});
	$("#friends-live-activity").css("width","240px");
	$(".highlight-data").css("width", "200px");
	$(".floatL").css("left", "38px");
	$(".floatL").css("font-size", "11px");
    $("#post-author-box").css({"box-shadow":"0px 0px 8px 1px #D5D5D5", "padding":"7px"});
    $(".big-avatar.authorbox").css({"box-shadow":"0px 0px 10px 2px", "margin-bottom":"10px"});
	$(".counter-type").css("color", "#4E4E4E");
	$(".details").css("color","#413F3F");
	$(".social-bar").prepend($("#flag-post"));
    $("#main").css("background-position", "-900px");
	$('<div class="follow-buttons ">').css("margin-left","0");
    $('.comments-empty').html("Comentá, HDP!");
    $('div#google_ads_div_tar_shout_300x250_estado').css('display', 'none');
    $('div#google_ads_div_tar_h_300x250_general').css('display', 'none');
    $('div#google_ads_div_tar_h_160_general').css('display', 'none');
    $('div#google_ads_div_tar_p_300_imagenes').css('display', 'none');
    $('div#google_ads_div_tar_shout_300x250_imagen').css('display', 'none');
    $(".navitem.useritem div.clearfix a span.nick.floatL").html('');
    $("div.navbar").append("<ul>");
    $("div.navbar").append('<div class="navitem nohide" id="menu-section-mi" style="margin-top: -33px; margin-left: 213px;"><a href="/mi"><i class="icon home"></i></a><span></span><div id="bubble-alert-mi" class="bubble alerts" style="bottom: 15px;"><a><span></span></a></div></div>');
    $("div.navbar").append("</ul>");
    $("ul.floatL").children("#menu-section-mi").css("display", "none");
    if (document.domain == "www.poringa.net" || document.domain == "poringa.net"){
     
        $("#header").css({"background": "#8e1a1a", "border-bottom": "3px solid #851229"});
        $("#nav ul li a").css({"background": "#2E0000 "});
        $(".active a").css({"background":"#FFF"});
        
    }
    
   }



function sacarGlobos (){
    $(".tooltip").css("display", "none");
    $(".tooltip").html("");
    setTimeout("sacarGlobos()", 200);
    
        
}

SEMi();

//mostrarnotif();