// ==UserScript==
// @name         War of Ninja - Avatar Zoom
// @namespace    for WarofNinja.com
// @version		 1.0
// @include      http://forums.warofninja.com/*
// @include      http://forums.warofninja.com
// @include      forums.warofninja.com/*
// @include      forums.warofninja.com
// @include      http://www.warofninja.com/my-friends
// @include      www.warofninja.com/my-friends
// @author       Sand_Spirit
// @description  Increases size of avatars on mouseover.
// @require 	 http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @history		 1.0 - First release
// ==/UserScript==

// Adds jQuery
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// MAIN FUNCTION
function main() {
jQuery.noConflict();


		$("div.poster img").mouseover(function(){
			$(this).animate({width:150,height:150},'1000');
		});
		$("div.poster img").mouseout(function(){
			$(this).animate({width:75,height:75},'1000');
		});

function zoomAvy(){
		$("div.poster img").mouseover(function(){
			$(this).animate({width:150,height:150},'1000');
		});
		$("div.poster img").mouseout(function(){
			$(this).animate({width:75,height:75},'1000');
		});
		$("[data-ajax='GET']").click(function(){
		setTimeout(function(){zoomAvy();},2000);
		});
		$("[data-ajax='POST']").click(function(){
		setTimeout(function(){zoomAvy();},2000);
		});
}

$("[data-ajax='GET']").click(function(){
setTimeout(function(){;zoomAvy();},2000);
});

$("[data-ajax='POST']").click(function(){
setTimeout(function(){;zoomAvy();},2000);
});


/* End of main() */}

// Runs main()
addJQuery(main);