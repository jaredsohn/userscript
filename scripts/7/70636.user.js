// ==UserScript==
// @name           xxx get
// @namespace      Filth
// @description    Shows last 3 digits of posts on 4chan.
// @include        http://*.4chan.*/*
// ==/UserScript==

var elements = document.getElementsByTagName("*");

for (var i = 0; i < elements.length; i++) {
	var type = 0;
	if (elements[i].id.substr(0, 5) == 'norep') {
		type = 5;
	} else if (elements[i].id.substr(0, 8) == 'nothread') {
		type = 8;
	}
	if (type != 0) {
		var post = elements[i].id.substring(type);
		elements[i].innerHTML = elements[i].innerHTML.replace(post.substring(0, post.length - 3) + "XXX", post);
	}
}
