// ==UserScript==
// @name           RedirectToBlog
// @namespace      ajorpheus
// @description    Clicks on the 'View Blog' for the first blog on the blogger dashboard
// @include        http://www.blogger.com/*
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
      $("document").ready(function(){
	$("a:contains('Sign In')").focus();
	var redirecLocation= $("div.blogContainer").find(":first").find("div.blogLastPublished").find("a:first").attr("href");
	if(redirecLocation)
		document.location = redirecLocation;	
      });
}

// load jQuery and execute the main function
addJQuery(main);