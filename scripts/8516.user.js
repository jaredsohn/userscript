// ==UserScript==
// @name          Webshots script for Bustywebshots users v0.2
// @namespace     http://userscripts.org/scripts/show/8516
// @description   To aid usability for bustywebshots.blogspot.com users on Webshots.com
// @include       http://*.webshots.com/*
// ==/UserScript==

//Check jquery.com for info
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-latest.pack.js';
GM_JQ.id = 'jQs';
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

var docLocation = document.URL;

	switch(true){
	
		case docLocation.indexOf("webshots.com/user/") > -1:
			var holdTemp = $('#box2').clone();
			$('body').html(holdTemp);
			$('.searchLink, script:not(#jQs)').remove();
			$('.options ul').remove();
			$("#box2, #page-navHolder, #albums").css("width","auto");
			break;

		case docLocation.indexOf("webshots.com/album/") > -1:
			var holdTempAlbum = $('#album').clone();
			$('body').html(holdTempAlbum);
			$('script:not(#jQs), .buttons').remove();
			$('#album, #media').css("width","auto");
			$('.header').css("textAlign","center");		
			$('#media ul').css("clear","none");
			$('#album').attr("class","grid");
			$('dd:first,dd:last').empty();	
			var newNav = $('#alt-nav')[0].childNodes[0].nodeValue;
			var links = $.grep( $(newNav), function(i){return i.href;});
			links.pop();
			links.each(function(i){
				$('#media').after('<div id="ajax-loader" style="text-align:center;"><img src="http://img443.imageshack.us/img443/4199/ajaxloaderml4.gif"/></div>');
				$.get(i.href, function(data){
					var trimmedToList = $(data.slice(data.indexOf('\<div id="media">'),data.indexOf('\<div class="description">'))).html();
					$('#media').append(trimmedToList);
					$('#ajax-loader').remove();
				});
			});
		break;

		case docLocation.indexOf("webshots.com/photo/") > -1:
			var imageFull = $('#sidebar .view-actions .fullsize a')[0].href;
			var imgWidth = parseInt($('#data dd').text().split("x")[0]);
			var imgHeight = parseInt($('#data dd').text().split("x")[1]);
			if (imgWidth > 950) {
				f=1-((imgWidth - 950) / imgWidth);
				imgWidth=imgWidth * f;
				imgHeight=imgHeight * f;
			}
			$('body').html('<img src="'+imageFull+'" width="'+imgWidth+'" height="'+imgHeight+'"/>');
			break;
			
	}
}
