// ==UserScript==
// @name           9gag lazy loader
// @namespace      *9gag.com*
// @include        http://9gag.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


$(document).ready(function(){
	if ($('#jump_next').length == 0)
		return;
	$('.s-300').remove();
	var status = false;
	//get page
	var page = 1;
	url_parts = (document.URL).split("/");
	if (jQuery.inArray('page', url_parts) !== -1)
		page = url_parts[jQuery.inArray('page', url_parts) + 1];
	var current1 = parseInt(page) + 1;

$(window).scroll(function() {   
	if (!status && ($(document).height() - $(document).scrollTop() - window.innerHeight) <= 1000)
	{
		status = true;
		$('#entry-list').append('<div align="center" class="mloader"><img src="http://www.photoshopatoms.com/tutorials/creating-an-ajax-style-loading-gif/images/img16.gif" align="center"></div>');

		$.get($('#jump_next').attr('href').replace('page/' + current1, 'page/' + ++page), function(data) {

			$('#entry-list').append($(data).find('#block-content #content #entry-list').html());
			status = false;
			$('.mloader').remove();
		});
	}
});


});
