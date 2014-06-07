// ==UserScript==
// @name          	z0r randomizer
// @namespace     	http://www.example.com/gmscripts
// @description		clicks every 10 seconds the randombutton on z0r.de
// @include       	http://z0r.de/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @version      	0.2
// ==/UserScript==

var timer = 10000;
var randomLink;
var started = true;

$(document).ready(function(){
	$("#footer").append("| <span id='setTimer' style='cursor: pointer; text-decoration: none; font-size: 11px; font-weight: bold;'>stopTimer</span>");
		
	$("#setTimer").live("click", function(){
		if(started){
			started = false;
			$("#setTimer").html("startTimer");
		}else{
			started = true;
			$("#setTimer").html("stopTimer");
		}
	});
	
	$("#navigation").find("a").each(function(){
		if($(this).html() == "Random"){
			randomLink = $(this);
			randomLink.click(function(){
				window.location = randomLink.attr("href");
			});
			startFun();
		}
	});
	
});

function startFun(){
	setTimeout(function(){
		if(started){
			randomLink.click();
		}
		startFun();
	}, timer);
}