// ==UserScript==
// @name		Tomassie91's usenet4all improvements
// @namespace		http://www.usenet4all.eu
// @description		Enhances the experience on the usenet4all forum
// @include		http://www.usenet4all.eu/unet/viewtopic.php*
// @include		http://usenet4all.eu/unet/viewtopic.php*
// @include		https://www.usenet4all.eu/unet/viewtopic.php*
// @include		https://usenet4all.eu/unet/viewtopic.php*
// @require 		https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @grant		none
// ==/UserScript==

$('#postform').submit(function() {
	var id = $('.post').first().attr('id').substring(1);
	$.ajax({
		url: './reputation.php?p=' + id,
		async: false
	});
	
	return true;
});