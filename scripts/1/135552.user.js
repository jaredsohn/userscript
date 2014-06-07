// ==UserScript==
// @name        Quality To Value for Popmundo
// @namespace   http://germana-ex.tumblr.com/
// @description Append value to quality names on Popmundo V2 P2
// @include     http://*.popmundo.com/*
// @exclude     http://*.popmundo.com/World/Popmundo.aspx/Artist/Popularity/*
// @exclude     http://*.popmundo.com/World/Popmundo.aspx/Character/AddressBook
// @version     1.1
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

$("a[href^='/World/Popmundo.aspx/Help/Scoring/']")
.each(function()
{
	//media value;
	var tmpVal = $(this).attr('title');
	tmpVal = tmpVal.replace('/26','');
	
	$(this).text($(this).text() + ' (' + tmpVal + ')');
});

$("a[href^='/World/Popmundo.aspx/Character/']")
.filter(function()
{
	var tmpHref = $(this).attr('href');
	if(tmpHref.match('Character\/[0-9]{1,10}$'))
	{
		return $(this);
	}
})
.attr('target','_blank');
