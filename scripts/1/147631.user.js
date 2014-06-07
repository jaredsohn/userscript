// ==UserScript==
// @name			The Escapist (Zero Punctuation) - highlight watched videos
// @description		Marks watched videos with a purple link
// @author			Gary Jacobson
// @include			http://www.escapistmagazine.com/videos/view/*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

$('<style type="text/css">\n' +
	'div.filmstrip_video a { color: #0071BC; }\n' +
	'div.filmstrip_video a:visited { color: purple; }\n' +
	'</style>').appendTo('head');
$('div.filmstrip_video').each( function() {
	var link = $(this).find('a').attr('href');
	$(this).find('div.title').wrapInner('<a href="' + link + '"></a>');
} );