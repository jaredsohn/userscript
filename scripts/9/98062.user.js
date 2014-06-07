// ==UserScript==
// @name           Fix Chatty Article Hyperlink Color
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @namespace      http://www.indosauros.com
// @description    Changes color of links in the chatty article to blue
// @version	0.1
// @include		   http://*.shacknews.com/chatty*

// ==/UserScript==
/*

Version history:
0.1 2011-2-28:
Changed color of hyperlinks

*/

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

function main() {
	
	$('<style type="text/css">a { color: #09F; font-weight: normal; }</style>').appendTo('head');
}

// load jQuery and execute the main function
addJQuery(main);