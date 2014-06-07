// ==UserScript==
// @name        Fun calls downloader
// @version     1.0
// @date        2009-12-20
// @author      B@rmaley.e><e
//
// @include     http://www.funcalls.ru/*
// @include     http://funcalls.ru/*
// ==/UserScript==

(function(){
	window.addEventListener('DOMContentLoaded', function(){
		var elements = document.querySelectorAll('div.listen:not([id])'), i = 0, id;
		for(; i < elements.length; i++){
			id = elements[i].firstElementChild.id.match(/\d+$/i);
			elements[i].nextElementSibling.lastElementChild.innerHTML += ' &nbsp; <a href="http://www.voicecards.ru/get/track/new/?id=' + id +  '" style="font-weight:bold">Download</a>';
		}
	}, false);
})();