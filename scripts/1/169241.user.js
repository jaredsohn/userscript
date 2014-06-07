// ==UserScript==
// @name        Springerlink rename download links
// @namespace   rename@springerlink
// @include     http://han.srv.meduniwien.ac.at/han/eBook-Katalog/link.springer.com/*
// @include     http://link.springer.com/*
// @require	    http://code.jquery.com/jquery-1.9.1.min.js
// @grant       none
// @version     1
// ==/UserScript==

$(document).ready(main);

function main() {
	$('.toc-item.chapter-item').each(function(){
		console.log($(this).find('.title').text());
		chapter = ($(this).find('a.pdf-link').attr('href').split('.pdf')[0].split('_').reverse()[0])
		chapter = "0000000000000000".substring(0,3-chapter.length)+chapter;
		$(this).find('a.pdf-link').text(chapter + ' ' + $(this).find('.title').text());
	});
}