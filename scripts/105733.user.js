// ==UserScript==
// @name          Tineye Image Checker
// @namespace     http://userscripts.org/users/125899
// @description   Tineye Image Checker
// @include       http://*.reddit.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.js
// ==/UserScript==
var imgTypes = ['png','jpeg','jpg','gif','tiff','tif','bmp'];

function main()
{
	// each href that isn't tineye
	$('a').each(function()
	{
		jqThis = $(this);
		// Ignore any anchors without hrefs
		if (jqThis.attr('href') === undefined)
			return true;
		
		// make sure it is an image
		if ($.inArray(jqThis.attr('href').split('.').pop(),imgTypes) >= 0)
		{
			createTineyeLink(jqThis,escape(this.href))
		}
		// if not an image, see if it is imgur
		else if (jqThis.attr('href').indexOf('imgur.com') >= 0)
		{
			createTineyeLink(jqThis,escape(this.href + ".png"))
		}
	});
}
function createTineyeLink(currentLink, imageHref)
{
	var tinEyeLink = $('<a />').attr('href','http://www.tineye.com/search?url='+imageHref).html('(Check Tineye)').attr('target','_blank');
	// Don't add link if it is trying to in 
	if (jqThis.siblings('span').attr('class') != "rank")
		jqThis.siblings('span').append(tinEyeLink);
}
$(document).ready(main());