// ==UserScript==
// @name	Torrents on Kinopoisk
// @version	0.9
// @updateURL   http://userscripts.org/scripts/source/115991.meta.js
// @updateURL   http://userscripts.org/scripts/source/115901.meta.js
// @namespace	schreque-uso
// @author	schreque
// @description	Adds buttons to simplify the search of films in torrents from kinopoisk.ru
// @require	http://userscripts.org/scripts/source/115991.user.js
// @include	http://kinopoisk.ru/level/1/film/*
// @include	http://www.kinopoisk.ru/level/1/film/*
// @include	http://kinopoisk.ru/film/*
// @include	http://www.kinopoisk.ru/film/*
// ==/UserScript==

/**
 * Use the following informatio to append new links.
 * 
 * {
 * 	tmplItem:	String, contains the template pf each item of the list
 * 			valid patterns are {HREF}, {TEXT}, {ICON}
 * 
 * 	tmplList:	String, contains the template of the list
 * 			Valid pattern is {LIST}
 * 
 * 	container:	DOM element, contains a reference to the html-element 
 * 			where the list sould be inserted
 * 
 * 	links:	[	Array, contains the list of links and their attributes to show
 * 		{
 * 			text:		String, a text that will be shown
 * 
 * 			addr:		String, an URL following to another site
 * 					Valid pattern is {SEEK}
 * 
 * 			icon:		String, an URL to the image favicon.ico
 * 
 * 			transform:	Function, a functin that transforms a seach text
 * 					It can be useful if some sites requires text in UTF
 * 		}, 
 * 	]
 * }, 
 */
document.addEventListener('DOMContentLoaded', function()
{
	// Take the movie name
	var moviename = document.querySelector('h1.moviename-big');
	var movie = moviename.innerHTML.replace(/<(\w+).+\/\1>/g, '').trim();

	// Take some neighbour of the panel's futire location
	var where = document.querySelector('div#div_mustsee_main');

	// Create and put styles there
	var css = document.createElement('style');
	css.type = 'text/css';
	css.innerHTML = [
		'.torrents { background-color: #ccc; padding: 5px; }', 
		'.torrents span { display: inline-block; margin: 0; padding: 0; width: 16px; }', 
		'.torrents a { margin: 0 0 0 -16px; padding: 0 0 0 20px; }', 
	].join('\n');
	where.parentNode.insertBefore(css, where);

	// Create and put the panel
	var panel = document.createElement('div');
	where.parentNode.insertBefore(panel, where);

	// Populate the panel with the actual information
	GMX.SearchLinkPanel(movie, {
		container: panel, 

		tmplItem: '<li><span><img src="{ICON}" /></span><a target="_blank" href="{HREF}" title="{TEXT}">{TEXT}</a></li>\n', 
		tmplList: '\n\n\n<ul class="torrents">{LIST}</ul>\n\n\n', 

		// http://habrahabr.ru/blogs/p2p/79835/
		links: [
			{
				text:	'rutracker.org', 
				addr:	'http://rutracker.org/forum/tracker.php?nm={SEEK}', 
				icon:	'http://static.rutracker.org/favicon.ico'
			}, 
			{
				text:	'tapochek.net', 
				transform:	encodeURIComponent, 
				addr:	'http://tapochek.net/tracker.php?nm={SEEK}', 
				icon:	'http://tapochek.net/favicon.ico'
			}, 
			{
				text:	'nnm-club.me', 
				transform:	encodeURIComponent, 
				addr:	'http://nnm-club.me/forum/tracker.php?nm={SEEK}', 
				icon:	'http://nnm-club.me/favicon.ico'
			}, 
			{
				text:	'tfile.ru', 
				addr:	'http://tfile.ru/forum/ssearch.php?q={SEEK}', 
				icon:	'http://tfile.ru/favicon.ico'
			}, 
			{
				text:	'fast-torrent.ru', 
				addr:	'http://www.fast-torrent.ru/search/{SEEK}/1.html', 
				icon:	'http://www.fast-torrent.ru/favicon.ico'
			}, 
			{
				text:	'rutor.org', 
				addr:	'http://rutor.org/search/{SEEK}', 
				icon:	'http://s.rutor.org/favicon.ico'
			}, 
			{
				text:	'kinozal.tv', 
				addr:	'http://kinozal.tv/browse.php?s={SEEK}', 
				icon:	'http://kinozal.tv/favicon.ico'
			}, 
			{
				text:	'opensharing.org', 
				transform:	encodeURIComponent, 
				addr:	'http://opensharing.org/c.php?search={SEEK}&make_search=1&method=0', 
				icon:	'http://opensharing.org/favicon.ico'
			}, 
		]
	});

}, false);
