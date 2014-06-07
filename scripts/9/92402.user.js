// ==UserScript==
	// @name                Lorem ipsum highlighter
	// @namespace	        http://output/satellites/
	// @description	        script that highlites lorem ipsums
	// @include				http://output/satellites/*
// ==/UserScript==

var all_links = document.getElementsByTagName('a');
for (i = 0; i < all_links.length; i++) {
	var x = all_links[i].innerHTML;
        var x2 = all_links[i].getAttribute('href');
	var regexp2 = /http:/ig;
        var regexp = /lorem ipsum/ig;
	if (regexp.test(x)) {
		all_links[i].style.color='#cc0000';
		all_links[i].style.border='1px solid #cc0000';
	}
	if (regexp2.test(x2)) {
		all_links[i].style.color='#322FFF';
		all_links[i].style.border='1px solid #322FFF';
	}
}