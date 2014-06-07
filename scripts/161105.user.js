// ==UserScript==
// @name       		ifeng Ads Remover
// @namespace 		http://www.oriovo.com
// @description 	Make ifeng pages clean by removing ads and enhance access speed by remove all scripts.
// @version 		1.0
// @create 			2013-03-06
// @lastmodified 	2013-03-06
// @copyright 		2013+, micle.bu@gmail.com, http://www.oriovo.com

// @match      		http://*.ifeng.com/*
// @require 		http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.0.min.js
// @run-at 		document-end
// ==/UserScript==

// add addtional block here
var remover = {
    script: "script",
    ads1: "div[class^=ad]",
    ads2: "div[class$=ad]",
	ads_flash: "div[id^=flash]",
    ads_box: "div[class^=box200]",
    ads_couplet: "div[id^=couplet]",
    ads_banner: ".col_banner",
    block_banner: "#turnRedbnner",
    block_left: "#leftCoupletId",
    block_right: "#rightCoupletId"
};

var repeater, runtime = 0;

function removeads() {
    $("div[id^=_Ad]").remove();
    $("embed").remove();
    $("object").remove();
    $("iframe").remove();
    $("a[href^='http://bc.ifeng.com']").remove();   
    
    if (runtime++ > 30) {
    	clearInterval(repeater);
    }
}

window.addEventListener("DOMContentLoaded", function () {
    // remove ads
    $.each(remover, function(name, value){
        $(value).remove();
    });     
    repeater = setInterval(removeads, 1000);    
    
    // resize
    $(".col_L").remove();
    $(".col_R").css("width","960px");
    $(".col").css("background", "#ffffff");
    $(".box360").css("width", "450px"); 
}, true);
