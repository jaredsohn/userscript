// ==UserScript==
// @name        Show danbooru restricted images
// @namespace   http://userscripts.org/users/450869
// @description Show danbooru images with gold account restriction
// @include     http://danbooru.donmai.us/posts/*
// @include     http://donmai.us/posts/*
// @version     0.1
// @copyright   2013+, Zero
// @grant       none
// ==/UserScript==

(function(){
	var metasrc = document.querySelector('meta[name="twitter:image:src"]'),
		goldtip = document.querySelector('#image-container > p');
	if(metasrc && goldtip){
		goldtip.innerHTML = '<img src="' + metasrc.content + '">';
	}
}());