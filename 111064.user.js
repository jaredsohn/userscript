// ==UserScript==
// @name           expandables
// @namespace      http://wakachan.org/unyl/
// @description    expand preview images
// @include        http://wakachan.org/*
// @include        http://*.wakachan.org/*
// @include        http://iichan.ru/*
// @include        http://*.iichan.ru/*
// @include        http://iichan.net/*
// @include        http://*.iichan.net/*
// @include        http://fgs221.appspot.com/*
// @include        http://fgs223.appspot.com/*
// @author         unylnonymous
// ==/UserScript==

function expander(image, target_src, max_width) {
	return function(event) {
		event.preventDefault();
		event.stopPropagation();
		
		var current_style = image.getAttribute('style');

		var expanded_image = document.createElement('img');
		expanded_image.src = target_src;
		expanded_image.alt = 'I, for one, welcome our new waxtёr overlords!';
		expanded_image.setAttribute('style', 
		    (current_style && current_style + ';' || '')
		    + 'max-width: ' + max_width + 'px !important;'
		    + 'max-height: ' + parseInt(window.innerHeight * 0.9) + 'px !important;')
		expanded_image.setAttribute('class', image.getAttribute('class') || '');

		image.parentNode.replaceChild(expanded_image, image);
		expanded_image.addEventListener('click', function (event) {
			event.preventDefault();
			event.stopPropagation();

			expanded_image.parentNode.replaceChild(image, expanded_image);
		}, false);
	}
}

function instrument() {
	var images = document.getElementsByTagName('img');

	for (var i = 0; i < images.length; ++i) {
		var image = images[i];

		if (!image.parentNode
		|| image.parentNode.nodeName.toLowerCase() != 'a') {
			continue;
		}

		var href = image.parentNode.href;
		var max_width = parseInt(image.parentElement.parentElement.clientWidth) * 0.95;
		if (href.match('\.(jpg|png|gif|bmp)$')) {
			image.addEventListener('click', expander(image, href, max_width), false);
		}
	}
}

(function() {

	instrument();

})();