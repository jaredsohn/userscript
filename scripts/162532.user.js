// ==UserScript==
// @name           Imgur Google-this-image button
// @description    Google button that replaces the "More Sharing Options". Once clicked, it searches Google for the image viewed.
// @description    Written by Lanjelin
// @include        http://imgur.com/gallery/*
// @author         Lanjelin
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

function openLink() {
	var $imgLink = $('#image').find('img').attr('src');
	window.open('https://www.google.com/searchbyimage?safe=off&site=search&image_url=' + $imgLink);
}

$(document).ready(function() {
	$('#social ul').append('<li class="title" original-title="Google this image"><span id="googleIt" style="background-image:url(\'http://expdvl.com/files/web/google.png\'); background-size:31px 31px; display:block; "></span></li>');
	$('.st_sharethis_custom').parent().attr("class", "title email-button-hide");
	$('#googleIt').click(function(){
		openLink()
	});
});
