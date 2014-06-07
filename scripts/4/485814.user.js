// ==UserScript==
// @name           No Google Ads (Use Jquery)
// @version        0.5
// @author         klogzoog
// @run-at         document-end
// @grant	   set
// @include        http://www.google.*/*
// @include        https://www.google.*/* 
// @require        http://code.jquery.com/jquery-2.1.0.min.js
// @require		   https://jquery-timer.googlecode.com/svn/trunk/jquery.timer.js
// ==/UserScript== 

$(document).ready(function(){

var timer = $.timer(function(){

        $("#tvcap").css("visibility", "hidden");
    	//console.log("removing ads");
        //$("#tvcap, ._Vb").remove();
        $("#tvcap, ._Vb, .ads-adcard, .cards-card:eq(2)").remove();
    });

timer.set({ time : 1500, autostart : true });
    
});