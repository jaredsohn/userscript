// ==UserScript==
// @name           academ.org | MenuPanel
// @namespace      academ.org
// @include        http://*academ.org/*
// @author         Fenex
// @version        1.0
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
function insertPanel() {
	var e = document.createElement('li');
	e.setAttribute('id', 'menu_item_3_0_fnx_1');
	e.setAttribute('class', 'menu_item');
	e.innerHTML = '<a style="background-image: url(http://navigline.academ.org/icons/964d82c639.png);" href="http://forum.academ.org/index.php?showforum=50">\"Автолюбители\"</a>';
	var elem = document.getElementById('menu_folder_3_0').getElementsByTagName('li')[1];
	elem.parentNode.insertBefore(e, elem);
}
function check_loadedMenuItem() {
	if (document.getElementById('menu_item_3_0')) {
		clearTimeout(tm);
		insertPanel();
	}
}
var s = document.createElement('script');
s.innerHTML = insertPanel+check_loadedMenuItem+"var tm = setTimeout('check_loadedMenuItem()', 100);";
document.body.appendChild(s);