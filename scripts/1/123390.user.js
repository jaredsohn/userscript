// ==UserScript==
// @name           widoczne przyciski moderacji
// @namespace      http://www.fotka.pl/profil/Bozar
// @include        http://www.fotka.pl/profil/*
// @version        1.0.1
// ==/UserScript==

var $ = unsafeWindow.$;

setTimeout(function(){
	$('#moderacja_zdjec').show();
}, 333);

var info = $('#akcje_avatar a[onclick="show_info();"]');
info.remove();
$("#akcje_avatar").prepend(info);