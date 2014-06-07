// ==UserScript==
// @name           TalkTrack Automatic
// @author	   DrRuco
// @namespace      talktrack.com
// @include        http://bus.talktrack.com/
// ==/UserScript==

var STEVILKA_POSTAJE = 329;
var STEVILKA_AVTOBUSA = 14;

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
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
	$.noConflict();

	var loader = "<img src = 'http://www.sanbaldo.com/wordpress/wp-content/bigrotation2.gif' id = 'loader' />";
	$("#div_results").html(loader);
	
	var viewstate = $("#__VIEWSTATE").val();

	$.post("default.aspx", { tb_stationNo: STEVILKA_POSTAJE, tb_routeNo: STEVILKA_AVTOBUSA, b_submit: "Display", __VIEWSTATE: viewstate},
   		function(data){
			var results = $(data).find('#div_results');
			$("#div_results").css("padding", "0px 0 50px 30px")
			$("#div_results").html(results);

			$("#LanguageSpan").remove();
   		}
	);
}
