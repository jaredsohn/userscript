// ==UserScript==
// @name          Pues aca
// @namespace     http://www.thatquiz.org/
// @description	  Its just a test
// ==/UserScript==


// Add jQuery
var GM_JQ = document.createElement('script');
//GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.src= 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.0/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {

$(".tqhome").html('<img src="http://www.studyglobal.net/images/sep_logo.jpg" width="100" height="100" />');
$(".tqhome").removeClass('tqhome');
$("#body").css("background-image","url(http://media.sitagan.com/static/images/bg.gif)");
$("#body").css("margin","0");
$("#body").css("padding","0");
//$("#centerpanel").css("background-image","url(http://www.eurielec.etsit.upm.es/imag/cuadricula.gif)");
$("#centerpanel").css("background-color","white");
$('<center><img src="http://media.sitagan.com/static/images/header/header.png /></center>"').insertBefore("#body");
$("#quiztable").css("width", "930px");
$("#quiztable").css("margin-left", "auto");
$("#quiztable").css("margin-right", "auto");
$("#quizoptions").css("background-color", "#F4F0EC");
$("#I0:first-child").hide();
}