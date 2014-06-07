// ==UserScript==
// @name           Kurir.mk (lightweight)
// @namespace      dejan.greasemonkey
// @description    Kurir.MK minimalisticki stil
// @include        http://kurir.mk/*
// @include        http://*.kurir.mk/*
// @exclude 	   http://kurir.mk/services/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==

$(document).ready(function () {

	$('body').css('background-image', 'none');

	$('#master_banner_left').remove();
	$('#master_banner_right').remove();	
	$('#master_banner').remove();	
	$('#top_banner').remove();	
	
	$('.moduletable_video').remove();
	$('#gk_mainbody').addClass('clear');
	$('#gk_banner').remove();
	$('div.moduletable_content:has(iframe)').remove();
	$('div.moduletable_content:has(object)').remove();
	$('#video').remove();
	$('div.article div:nth-child(3)').remove();
	$('#denesni-dobitnici').remove(); 
	$('#right_top .moduletable_servisi_tabs').remove();
	$('.video_embed').remove();
	$('.faceandtweet').remove();
	
	$('a:[name="fb_share"]').remove();
	
	$('.article h2').css('clear','both');
	$('#relateditemtitle').parent().css('clear','both');
	
//	$('#').remove(); 
});
