// ==UserScript==
// @Description does what is says on the tin
// @include https://www.facebook.com/groups/571525942862042/* 
// @include http://www.facebook.com/groups/571525942862042/* 
// @name Add Gay Penguins to Jabronysoc
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version 1.0
// @grant none 
// ==/UserScript==

$.noConflict();
jQuery(document).ready(function($) {
	$('.coverPhotoImg').attr({
	'src': 'https://gs1.wac.edgecastcdn.net/8019B6/data.tumblr.com/0013e2ba932c38dc5d261f0c4cd1cd5b/tumblr_mv0qec5aOD1qh719wo1_500.gif',
	'style': 'height:100%'
	});
});