// ==UserScript==
//
// @name           Facepunch Ticker Watcher
//
// @description    Alerts you when someone dares to speak your name (request by Turing, kinda)
//
// @author         neokabuto
//
// @version        1.0
//
// @match http://*.facepunch.com/fp_ticker.php
// @match http://facepunch.com/fp_ticker.php
//
// @history        1.0 first version
//
// ==/UserScript==

var script = document.createElement('script');

script.innerHTML = "function AddTickerPost(post)\
{\
	alt = !alt;\
	\
	if(post.attributes.getNamedItem( \"html\" ).value.indexOf(\"mentioned</div>\") != -1){\
		alert(\"You were mentioned in a new post!\");\
	}\
	\
	if ( alt )\
		$('#TickerBox').prepend( \"<div class='ticker_item' style='background-color: #f0f0f0; display: none;'>\" + post.attributes.getNamedItem( \"html\" ).value + \"</div>\" );\
	else\
		$('#TickerBox').prepend( \"<div class='ticker_item' style='background-color: #fefefe; display: none;'>\" + post.attributes.getNamedItem( \"html\" ).value + \"</div>\" );\
}\
";

document.getElementsByTagName('head')[0].appendChild(script); 