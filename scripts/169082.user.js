// ==UserScript==
// @id fakkuddl@scriptish
// @name Yet Another Fakku Download
// @version        4.4
// @namespace      Wikipedia@fakku.net
// @icon           http://puu.sh/34jZ1
// @require        http://code.jquery.com/jquery.min.js
// @author         Wikipedia
// @homepage       FuckU
// @description    Add direct link and button direct download on fakku pages
// @include        http://www.fakku.net/games/*
// @include        http://www.fakku.net/videos/*
// @include        http://www.fakku.net/manga/*
// @include        http://www.fakku.net/doujinshi/*
// ==/UserScript==

$(document).ready(function() {
	
	GM_addStyle('#tail, .footer-tail, .footer-links, #download-raw {display: none;} #add0 {font-weight: bold; left: 1%; width: auto;} #add1 {left: 7%; width: auto;}');
	var location = window.location.href+"/download#footer";
	
		
		$("#add").before('<a id="add0" class="js-download red button">↯</a>');
		$("#add").before('<a id="add1" class="js-download grey button">Download</a>');
		$(".content-wrap").after('<iframe id="download-raw" width="100%" height="300px" frameborder="0" src="'+location+'" style="height: 100px;">');
		
		$("#add0").click(function(){
			$('#download-raw').slideToggle(1000);
			$('iframe').contents().find('html').animate({ scrollTop: $('#download-raw').offset().top }, 'slow');
		});
		$("#add1").click(function(){
			if ($('.download-row .link').length) {
				window.location= $('.download-row .link').attr('href');}
			else { window.location= $('iframe').contents().find('.download-row .link').attr('href');}
		});
		
 	var func = function () { 
		$('iframe').contents().find('.download-row').clone().insertAfter(".content-wrap");
		$(".download-row").after('<br>');
	}
		setTimeout(func, 3000);
		
});


//  Wikipedia  //