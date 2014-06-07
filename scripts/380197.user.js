// ==UserScript==
// @name    	Scribd downloader
// @author  	SchattenMann
// @version 	1.0.0
// @include 	http://*.scribd.com/doc/*
// @include 	https://*.scribd.com/doc/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @require     http://parall.ax/parallax/js/jspdf.js
// ==/UserScript==

(function(href) { // Future-proof code for unknown layouts
   
   jQuery('.download_btn').after('<span class="color_btn primary_action_btn download2_btn" >Free Download</span>')
   jQuery('.download_btn').after('<span class="color_btn primary_action_btn clear_btn" >Clear</span>')
   
   jQuery('.clear_btn').click(function () {
   
        var index;

		var div = document.getElementsByTagName('div');
		for (index = 0; index < div.length; ++index) {
		if (div[index].style.color == "transparent") {
			div[index].style.color = "black";
		}
		if (div[index].unselectable == "on") {
			div[index].unselectable = "off";
		}
		if (div[index].style.zIndex == 8) {
			div[index].style.zIndex = -1;
		}
		
		div[index].style.textShadow = "";

		div[index].removeAttribute("unselectable");

		}

		jQuery('.outer_page').after('<!-- ADD_PAGE -->')

		$('.page_missing_explanation').each(function() {
		$(this).remove();
		});

		$('.outer_page_container script').each(function() {
		$(this).remove();
		});

		$('.buy_doc_bar').each(function() {
		$(this).remove();
		});

		var img = document.getElementsByTagName('img');
		for (index = 0; index < img.length; ++index) {
		if (img[index].style.opacity < 100) {
			img[index].style.opacity = 100;
		}

		};
		
    });
	
	jQuery('.download2_btn').click(function () {
		
		var doc = new jsPDF();

		// We'll make our own renderer to skip this editor
		var specialElementHandlers = {
			'#editor': function(element, renderer){
				return true;
			}
		};

		// All units are in the set measurement for the document
		// This can be changed to "pt" (points), "mm" (Default), "cm", "in"
		doc.fromHTML($('.outer_page_container').get(0), 15, 15, {
			'width': 170, 
			'elementHandlers': specialElementHandlers
		});

		doc.save(jQuery('.doc_info .doc_title').text());
		
	});

})();