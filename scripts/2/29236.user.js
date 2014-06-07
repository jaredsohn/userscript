// ==UserScript==
// @name           dcu
// @namespace      http://www.dcu.ie
// @description    correct style of menus when turn off images
// @include        http://www.dcu.ie/
// @include        http://www.dcu.ie/index.php3?flash_set=no
// @include        http://www.dcu.ie/index.php3?flash_set=yes
// ==/UserScript==

var lists,oneItem;
lists = document.getElementsByTagName('li'); 
for (var i = 0; i < lists.length; i++) {     
	oneItem = lists[i]; 
	oneItem.style.fontSize= '10px';
	oneItem.style.fontWeight = 'bold';
	oneItem.style.paddingLeft = '10px';
	oneItem.style.textDecoration = 'underline';
}

var add;
add = document.getElementById('address');
add.style.fontSize= '9px';