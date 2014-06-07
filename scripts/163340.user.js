// ==UserScript==
// @name        Enlarge restricted profile pictures' thumbnail for Facebook
// @description Allow you to see Facebook restricted profile pictures in full size just by clicking on it's thumbnail.
// @namespace   rAthur's space
// @downloadURL https://userscripts.org/scripts/source/163340.user.js
// @updateURL   https://userscripts.org/scripts/source/163340.meta.js
// @include     http*://*facebook.com/*
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==
if (!$('.profilePicThumb:eq(0)').attr('href'))
{
	var thumbObj = $('.profilePicThumb:eq(0)').find('.profilePic.img');
	var thumbURL = thumbObj.attr('src');
	var thumbJPG = thumbURL.split('/')[thumbURL.split('/').length-1];
	var pictFolder = 'https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-prn1/';
	var pictURL = pictFolder+thumbJPG;
	thumbObj.wrap('<a target="_blank" style="position: relative;" href="'+pictURL+'"/>').before('<span style="display: block; position: absolute; left: 0; top: 0; background: rgba(0,0,0,0.75); color: #fff; margin: 0; padding: 0 3px 0 3px; border-radius: 3px 3px 0 0;">Picture&nbsp;successfully&nbsp;hacked</span>');
}