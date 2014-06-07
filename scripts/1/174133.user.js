// ==UserScript==
// @name           Widoczne Przyciski Moderacji
// @namespace      http://www.fotka.pl/profil/suchar
// @include        http://www.fotka.pl/profil/*
// @description    Sprawia, że przyciski do zaznaczania i usuwania zdjęć są domyślnie widoczne, a przycisk info jest jako pierwszy na liście.
// @version        1.1
// @copyright      2014, suchar
// @author         suchar
// @grant          unsafeWindow
// ==/UserScript==
var $ = unsafeWindow.$;
setTimeout(function(){
	$('#moderacja_zdjec').show();
}, 333);
var info = $('#profile-actions-list a[onclick="showinfo(\'\',event);"]');
info.remove();
$("#profile-actions-list").prepend(info);