// ==UserScript==
// @name       		Baidu Music Ads Remover
// @namespace 		http://www.oriovo.com
// @description 	Remove Ads from Baidu Music (play.baidu.com)
// @version 		1.1
// @create 			2013-03-06
// @lastmodified 	2013-09-30
// @copyright 		2013+, micle.bu@gmail.com, http://www.oriovo.com

// @match      		http://play.baidu.com/*
// @require 		http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.0.min.js
// @run-at 		document-end
// ==/UserScript==

var run;

function removeads() {
    if($(".ecom-ads-wrap").length == 1) {
        $(".ecom-ads-wrap").remove();
        $(".ui-reelList-viewport").attr("style","");
        clearInterval(run);
    }
    
    $("#right-ads").remove();
    $(".column3").css("right", "10px");
    $(".column3").css("width", "410px");
}

window.addEventListener("DOMContentLoaded", function () {
    run = setInterval(removeads, 1000);
}, true);
