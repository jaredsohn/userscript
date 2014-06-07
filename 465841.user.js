// ==UserScript==
// @name		Grooveshark Now Playing Title Scroll
// @namespace	http://grooveshark.com
// @description	Replaces the title bar on Grooveshark with scrolling information of the song you're listening to.
// @include		http://*.grooveshark.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @version		1
// ==/UserScript==

$(document).ready(function () {
	var title = document.title + ' - ';
	title = title.split('');
	
	$('#np-meta-container').bind('DOMSubtreeModified', function () {
		title = $('#now-playing-metadata').text().trim().replace(/\s{2,}/g, ' ') + ' - Grooveshark - ';
		title = title.split('');
	});
	
	setInterval(function () {
		title.push(title.shift());
		document.title = title.join('');
	}, 250);
});