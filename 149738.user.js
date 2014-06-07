// ==UserScript==
// @name        ChoualBox AntiTailleReel
// @namespace   choualbox.com
// @description Enleve le Taille reem
// @include     http://choualbox.com/*
// @include     http://www.choualbox.com/*
// @version     1.1
// ==/UserScript==
$('.infosimage').hide();
$('.media_image').each(function() {
	taille = $(this).find('a').attr('title');
	reg = /([0-9]*?)x([0-9]*?)px/;
	if (a = taille.match(reg)) {
		if (555 > parseInt(a[1])) {
			$(this).find('a').find('img').attr('src', $(this).find('a').attr('href'));
		}
	}
});