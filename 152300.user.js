// ==UserScript==
// @name          Forum_resize
// @description   HWM mod - Forum_resize
// @include       http://*.heroeswm.ru/forum_thread.php*
// ==/UserScript==

var all_theme_table = document.getElementsByClassName('table3 forum c_darker td_bordered');

forumresize();

function forumresize(){ 
	for (var i = 0; i < all_theme_table.length; i++) {
	all_theme_table[i].childNodes[1].childNodes[0].childNodes[1].setAttribute('width', '40%');
	}
}

//



