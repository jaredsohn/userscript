// ==UserScript==
// @name       AntiAntiAdBlock
// @namespace  http://dox-network.com/
// @version    1.0
// @description  No Ads, Thanks :)
// @match      http://youwatch.org/*
// @copyright  2014, Dox-Network
// ==/UserScript==

var inter = setInterval(function() {
    if ($("#jf09").css("display") == "block") {
    	/*$("#y843").css("width", "0");
    	$("#y843").css("height", "0");
    	$("#y843").empty();*/
        
        $("#jf09").fadeOut(250);
        
        if ($("div#background").css("display") == "none"){
        	$("div#background").css("display", "block");
        }
        
        clearInterval(inter);
    }
},100);