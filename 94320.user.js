// ==UserScript==
// @name  	Fix away page on MyBB
// @author 	Orig. - Vkontakte away fix
// @description Remove away link page from all pages on mybb.ru
// @include   	*.mybb.ru/*

// ==/UserScript==


var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
	if (links[i].href.split('click.php?').length == 2) {
		links[i].href = unescape(links[i].href.split('click.php?')[1]);
	}
}