// ==UserScript==
// @name        Spooky Food Eating Contest Auto Cheer
// @namespace   http://www.kanojo.de/scripts/spookyfood
// @include     http://www.neopets.com/halloween/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1
// ==/UserScript==
setTimeout(function(){
    votebutton = $("#vote1").attr("class");
    refresh = true;
    if(votebutton.indexOf("Dim")==-1) {
	setTimeout(function() { 
	    $(".cheerButton").click();
	    $("#pageDesc").append("<h3 style='color:red;'>Voted! (Check your inventory)</h3>");
	},Math.random()*10000);
    } else if(votebutton.indexOf("buttonDimSmall")>-1) {
	$("#pageDesc").append("<h3 style='color:red;'>Reached today's maximum. Stopping.</h3>");
	refresh = false;
    } else {
	$("#pageDesc").append("<h3 style='color:red;'>Waiting..</h3>");
    }
    if(refresh) {
	setTimeout(function() { location.reload(); }, 300000);
    }
},2000);