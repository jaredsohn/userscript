// ==UserScript==
// @name           FJ Mod Mass Flag
// @author         posttwo (Post15951)
// @include        *funnyjunk.com*
// @exclude		   *funnyjunk.com/sfw_mod/*
// @version        1.4
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js

// ==/UserScript==

	unsafeWindow.nsfw = function()
	{
		var things = $(':checked[name=toflag]').siblings('a:contains("Flag")')
		$.each(things, function(index, value) { 
		$(this).click()
		$('[value=nsfw]').click();
		$('span:contains("Flag")').click();
		});
	}
	
	unsafeWindow.illegal = function()
	{
		var things = $(':checked[name=toflag]').siblings('a:contains("Flag")')
		$.each(things, function(index, value) { 
		$(this).click()
		$('[value=illegal]').click();
		$('span:contains("Flag")').click();
		});
	}
	
	unsafeWindow.spam = function()
	{
		var things = $(':checked[name=toflag]').siblings('a:contains("Flag")')
		$.each(things, function(index, value) { 
		$(this).click()
		$('[value=spam]').click();
		$('span:contains("Flag")').click();
		});
	}
	
	unsafeWindow.copyright = function()
	{
		var things = $(':checked[name=toflag]').siblings('a:contains("Flag")')
		$.each(things, function(index, value) { 
		$(this).click()
		$('[value=copyright]').click();
		$('span:contains("Flag")').click();
		});
	}
	
	unsafeWindow.hate = function()
	{
		var things = $(':checked[name=toflag]').siblings('a:contains("Flag")')
		$.each(things, function(index, value) { 
		$(this).click()
		$('[value=hate_speech]').click();
		$('span:contains("Flag")').click();
		});
	}
	
	unsafeWindow.harassment = function()
	{
		var things = $(':checked[name=toflag]').siblings('a:contains("Flag")')
		$.each(things, function(index, value) { 
		$(this).click()
		$('[value=harassment]').click();
		$('span:contains("Flag")').click();
		});
	}
	
	unsafeWindow.copyrighted = function()
	{
		var things = $(':checked[name=toflag]').siblings('a:contains("Flag")')
		$.each(things, function(index, value) { 
		$(this).click()
		$('[value=copyrighted_content]').click();
		$('span:contains("Flag")').click();
		});
	}
	
	unsafeWindow.gore = function()
	{
		var things = $(':checked[name=toflag]').siblings('a:contains("Flag")')
		$.each(things, function(index, value) { 
		$(this).click()
		$('[value=gore]').click();
		$('span:contains("Flag")').click();
		});
	}

	unsafeWindow.checkboxes= function()
	{
	$('.com .r').append('<input type="checkbox" name="toflag" value="Flag">')
	}
	
$(document).ready(function ()
{
	$('.com .r').append('<input type="checkbox" name="toflag" value="Flag">');
    $('.aCenter').append('<br>')

	$("<a>",
	{
		"class": "lightgreenButton",
		text: "Flag - NSFW",
		onclick: 'nsfw()',
		value: "up",
		type: "button",
	}).appendTo("#contentLeft");
	
	$("<a>",
	{
		"class": "lightgreenButton",
		text: "Illegal",
		onclick: 'illegal()',
		value: "up",
		type: "button",
	}).appendTo("#contentLeft");
	
	$("<a>",
	{
		"class": "lightgreenButton",
		text: "Spam",
		onclick: 'spam()',
		value: "up",
		type: "button",
	}).appendTo("#contentLeft");
	
	$("<a>",
	{
		"class": "lightgreenButton",
		text: "Copyright",
		onclick: 'copyright()',
		value: "up",
		type: "button",
	}).appendTo("#contentLeft");

	$("<a>",
	{
		"class": "lightgreenButton",
		text: "Hate",
		onclick: 'hate()',
		value: "up",
		type: "button",
	}).appendTo("#contentLeft");
	
	$("<a>",
	{
		"class": "lightgreenButton",
		text: "Harassment",
		onclick: 'harassment()',
		value: "up",
		type: "button",
	}).appendTo("#contentLeft");
	
	$("<a>",
	{
		"class": "lightgreenButton",
		text: "Copyrighted",
		onclick: 'copyrighted()',
		value: "up",
		type: "button",
	}).appendTo("#contentLeft");
	
	$("<a>",
	{
		"class": "lightgreenButton",
		text: "Gore",
		onclick: 'gore()',
		value: "up",
		type: "button",
	}).appendTo("#contentLeft");

	$("<a>",
	{
		"class": "yellowButton",
		text: "Add Checkboxes",
		onclick: 'checkboxes()',
		value: "up",
		type: "button",
	}).appendTo("#contentLeft");

});