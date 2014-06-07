// ==UserScript==
// @name                        douban_site_img
// @namespace              		douban_site_img
// @version                     1.2
// @author                      Mescoda on http://mescoda.com/
// @description              	Block the img on site.douban.com to help instapapering pages
// @reason						Update for new Douban site
// @include                     http://site.douban.com/widget/notes/*
// @require                     http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
	$('<div style="position:fixed;top:20px;left:20px;width:110px;height:80px;border:3px solid #aaa;text-align:center;padding-top:10px;"><p style="margin-bottom:5px;"><strong>Douban_site_img</strong><br /><a href="http://userscripts.org/scripts/show/123517">Home Page</a></p><input type="button" id="hide" value="Peekaboo" /></div>')
	.insertBefore('#content');
	$('#hide').click(function() {
		$('#content .bd .note-content div.cc').remove();
	})
});