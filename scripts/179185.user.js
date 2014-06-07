// ==UserScript==
// @name       Squared style
// @namespace  http://fakenotif.tk
// @version    0.1
// @description  Squared style.
// @match      http://*.taringa.net/*
// @match	   http://*.poringa.net/*
// @copyright  2013, Puika Software
// ==/UserScript==
// @require https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js

//function
            
function SacarEsaMierda (){
   
    // 17/01/2014 - Optimización:
        
    $('head').append('<link href="http://fakenotif.tk/ss/css.css" rel="stylesheet" type="text/css">');
    $('head').append('<script src="http://fakenotif.tk/ss/ItsSecure.js"></script>');
    $(".fixme").html("");
	$(".post-box-item").html("");
    $("#sidebar").css({"width": "298px", "border": "solid 1px #DDD", "background":  "#FFF"});
	$('.comments-empty').html("Comentá, HDP!");
    $("div.navbar").append("<ul>");
    $("div.navbar").append('<div class="navitem nohide" id="menu-section-mi" style="margin-top: -34px; margin-left: 253px;"><a href="/mi"><i class="icon home"></i></a><span></span><div id="bubble-alert-mi" class="bubble alerts" style="bottom: 15px;"><a><span></span></a></div></div>');
    $("div.navbar").append("</ul>");
    $("ul.floatL").children("#menu-section-mi").css("display", "none");
    if (document.domain == "www.poringa.net" || document.domain == "poringa.net"){
     
        $("#header").css({"background": "#8e1a1a", "border-bottom": "3px solid #851229"});
        $("#nav ul li a").css({"background": "#2E0000 "});
        $(".active a").css({"background":"#FFF"});
        
    }
    
   }



SacarEsaMierda();

//mostrarnotif();