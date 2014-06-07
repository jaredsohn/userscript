// ==UserScript==
// @name           Remove portrait images - wallbase.net
// @description    Removes all portrait images from search results
// @author         Balbes
// @include        http://wallbase.net/
// @version        1.0
// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js
// ==/UserScript==

$(document).ready(function(){

	var deleteImages = function() {

		$('.thumb:not(.changed)').each(function(){
		
		var image = $(this).find('img')
		if ((image.width() / image.height()) < 1.25) {
			$(this).hide();
		}

		$(this).addClass('changed')

		})
	}

	deleteImages();

	$(window).scroll(function(){
		deleteImages();
	})

})