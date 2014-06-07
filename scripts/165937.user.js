// ==UserScript==
// @name        TSR Bold Thread Titles
// @author      Vulpes
// @namespace   http://userscripts.org/users/vulpes
// @description This extension turns unread thread titles bold
// @include     http://www.thestudentroom.co.uk/
// @include     http://*.thestudentroom.co.uk/
// @include     http://www.thestudentroom.co.uk/*
// @include     http://thestudentroom.co.uk/*
// @version     1.0
// ==/UserScript==


function with_jquery(f) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.textContent = "(" + f.toString() + ")(jQuery)";
  document.body.appendChild(script);
};

with_jquery(function($) {
	var pageURL = window.location.pathname;
	
	if (pageURL == "/" || pageURL == "/index.php" ) {
	
	} else {
    
         $('.thread.unread').css("font-weight","bold");
	 $('.last-post').css("font-weight","normal");
	 $('.count').css("font-weight","normal");    
    }
});