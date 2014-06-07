// ==UserScript==
// @name           my test jquery script
// @description    test jquery script

// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

function main() {

	$('.yP').css('color', 'red');
	
}

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// load jQuery and execute the main function
addJQuery(main);