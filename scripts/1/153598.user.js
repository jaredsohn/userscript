// ==UserScript==
// @name        Centre
// @namespace   http://www.neogaf.com/
// @include     http://www.youtube.com/watch?v=*
// @version     1
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {

	var cssObj = {
		'margin-left' : 'auto',
		'margin-right' : 'auto',
		'width' : '70%'
	}
	
	var cssObjFull = {
		'margin-left' : '-25%',
		'width' : '148%'
	}
	
	$('body').css(cssObj);	
	
	$('DIV#yt-masthead-container').css(cssObjFull);
}
addJQuery(main);