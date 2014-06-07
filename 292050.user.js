// ==UserScript==
// @id             YoutubeSearchInUserChannel
// @name           YoutubeSearchInUserChannel
// @version        1.0
// @namespace      Shefla
// @author         Shefla
// @description    Search in user channel from video page.
// @include        http://www.youtube.com*
// @run-at         window-load
// ==/UserScript==

unsafeWindow.yt.pubsub.instance_.subscribe('init-watch', function (){
	var user  = document.querySelector('.yt-user-photo');
	var span  = document.querySelector('.yt-user-separator');
	var form  = document.createElement('form');
	var input = document.createElement('input');
	span.textContent   = '';
	form.method        = 'GET';
	form.action        = user.href.split('?')[0] + '/search';
	form.style.display = 'inline-block';
	input.name         = 'query';
	input.placeholder  = 'Search in user channel';
	input.className    = 'yt-uix-form-input-text search-field';
	input.style.width  = '135px';
	input.style.height = '12px';
	form.appendChild(input)
	span.appendChild(form);
});


