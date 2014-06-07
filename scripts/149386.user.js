// ==UserScript==
// @name        What.CD Buffer
// @namespace   in_space
// @include     https://what.cd/*
// @require	http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$(document).ready(function() {
	var $stats = $('#userinfo_stats');
	
	var ul_text = $stats.find('#stats_seeding .stat').text().replace(',', '');
	var uploaded = parseFloat(ul_text);
	if (ul_text.match('MB')) uploaded = uploaded / 1024; 
	if (ul_text.match('TB')) uploaded = uploaded * 1024; 
	
	var dl_text = $stats.find('#stats_leeching .stat').text().replace(',', '');
	var downloaded = parseFloat(dl_text);
	if (dl_text.match('MB')) downloaded = downloaded / 1024;
	if (dl_text.match('TB')) downloaded = downloaded * 1024;
	
	var required = 0.60;
	var buffer = uploaded/required - downloaded;
	if (buffer >= 1000) buffer = Math.floor(buffer/1024*1000)/1000 + ' TB';
	else buffer = Math.floor(buffer*100)/100 + ' GB';
	$stats.prepend('<li id="stats_buffer">Buffer: <span class="stat">'+buffer+'</span></li>');
});