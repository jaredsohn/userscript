// ==UserScript==
// @name           Podnapisi.net Download Button
// @author	   DrRuco
// @namespace      www.podnapisi.net
// @include        http://www.podnapisi.net/ppodnapisi/*
// @description	   Adds download icons in search mode
// @version	   v0.4
// ==/UserScript==

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

	var numbOfSubtitles = $('.NameSel').find('a').size();
	var notification = 'Prenesenih: 0 / ' + numbOfSubtitles;

	//$("body").append('<div id = "pdbNotification" style="position:absolute;top:0;left:0;font-size:15px;">'+notification+'</div>');

	$("table.seznam").find("thead").find("th.name").after("<th class='posts'>Prenos</th>");
	
	$('.NameSel').find('a').each(function(i){

		//get href
		var href = 'http://www.podnapisi.net' + $(this).attr("href");
		var element = $(this);

		//visits href to get download link
		$.get(href, function(data) {
			//finds a download link
 			var newhref = $(data).find(".podnapis_tabele_download").find("a").attr("href");
			
			var downloadButton = '<a href = "'+newhref+'"><img vspace="5" hspace="5" alt="Podnapisi" src="http://static2.podnapisi.net/images/nextgen/podnapisi/download.gif" class = "slikevvrsti"></a>'
			
			var nameSel = $("td.NameSel:nth-child("+i+")");
			nameSel.after("<td align = 'center'>"+downloadButton+"</td>");
			
			//appends download button to document
			element.parent().append();
			//$("#pdbNotification").html('Prenesenih: ' + (i+1) + ' / ' + numbOfSubtitles);
		});
	});
} 
