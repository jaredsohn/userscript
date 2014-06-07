// ==UserScript==
// @name           Crymod image resizer
// @namespace      http://crymod.com/ins
// @include        http://www.crymod.com*
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
	$(".postbody img").each(function() {
		var myImg = $(this);
		myImg.css("max-width","725px");
		myImg.wrap("<a href='" + myImg.attr("src") + "' />");
	});
}

// load jQuery and execute the main function
addJQuery(main);




