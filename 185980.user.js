// ==UserScript==
// @name           JKanime.net - No anuncios (No ADS)
// @namespace      ninguno
// @description    Quitar la publicidad de las paginas de JKanime.net (Remove every single ads from any page of JKanime.net)
// @version        1.0.0
// @author         Gabriel Gonzalez
// @grant          none
// @match      http://*.jkanime.net/*
// ==/UserScript==

setTimeout(function (){
var str = document.documentElement.outerHTML,
        n = str.indexOf("a4gss"),
        o = str.substr(n, 16),
        css = '#moveboxr, .video_right, .video_left, #head_pb, .squareads, .home_end_block, #' + o + ' {display:none;} #letters_bg {position: fixed; top: 0; z-index: 999;}',
        head = document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    
    head.appendChild(style);
    
    $("#head_pb").remove();
    
    $(".squareads").remove();
    
    $(".video_right").remove();
    
    $(".video_left").remove();
    
    $("#head_pb").remove();
    
    $("" + o + "").remove();
    
    $(".home_end_block").remove();
    
    $("#myDIV").remove();
    
    $("script").remove();
    
    $("style").remove();
    
    $("noscript").remove();
    
    $("#moveboxr").remove();
    
    for (var i=0;i<15;i++)
	{ 
		$("div:last").remove();
	}
    
    for (var i=0;i<4;i++)
	{ 
		$(".top_menu_content div:first").remove();
	}
    
    $(".search_right").remove();
    
    $("iframe").remove();
    
}, 100);