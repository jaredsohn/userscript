// ==UserScript==
// @name       Anti LGZ Block Ad Block
// @namespace  http://dox-network.com/
// @version    1.3.6
// @description  No Ads, Thanks :)
// @match      http://www.leetgamerz.net/*
// @copyright  2014, Dox-Network
// @udateURL   http://dox-network.com/userscripts/anti_lgz.js
// ==/UserScript==

// On s'occupe d'abord du bloc principal
var inter = setInterval(function() {
    if ($("#y843").css("display") == "block") {
    	/*$("#y843").css("width", "0");
    	$("#y843").css("height", "0");
    	$("#y843").empty();*/
        
        $("#y843").fadeOut(250);
        
        if ($("div#background").css("display") == "none"){
        	$("div#background").css("display", "block");
        }
        
        clearInterval(inter);
    }
},100);

// On s'occupe d'abord du bloc principal
var inter3 = setInterval(function() {
    if ($("#voadtzju").css("display") == "block") {
    	/*$("#y843").css("width", "0");
    	$("#y843").css("height", "0");
    	$("#y843").empty();*/
        
        $("#voadtzju").fadeOut(250);
        $("#voadtzju").remove();
        $(".julfxtas-bg").remove();
        
        if ($("div#background").css("display") == "none"){
        	$("div#background").css("display", "block");
        }
        
        clearInterval(inter3);
    }
},100);

// Puis de la petite bannière du haut
var inter2 = setInterval(function() {
    if ($("a.credit").text() == "Adunblock.com" && $("a.credit").css("display") == "block") {
    	$("a.credit").parent().fadeOut(250);
        clearInterval(inter2);
    }
},100);


// Allez, pour la route, on vire aussi le bloc DailyMotion
$("#webTVright").remove();