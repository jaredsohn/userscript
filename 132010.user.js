// ==UserScript==
// @name           PHP Sadness Pagination
// @namespace      phpsadnavi
// @description    PHP Sadness Pagination
// @include        http://phpsadness.com/sad/*
// ==/UserScript==
(function() {
	var container = document.getElementsByClassName('quiet')[0],
		wrapper = document.createElement('div'),
		prev = document.createElement('a'),
		prevText = document.createTextNode("<< Previous"),
		next = document.createElement('a'),
		nextText = document.createTextNode("Next >>"),
		baseUrl = 'http://phpsadness.com/sad/',
		currentId = parseInt(location.href.replace(baseUrl, ''));
		
	if (currentId > 1) {
		prev.appendChild(prevText);
		prev.href = baseUrl + (currentId - 1);
		prev.setAttribute('style', 'margin-right: 20px;');
		wrapper.appendChild(prev);		
	}
	
	next.appendChild(nextText);
	next.href = baseUrl + (currentId + 1);
	wrapper.appendChild(next);
	
	wrapper.setAttribute('style', 'float: right;');
	
	container.appendChild(wrapper);
})()