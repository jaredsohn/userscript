// ==UserScript==
// @name           phpmyadmin search icons
// @author         ameboide
// @namespace      http://userscripts.org/scripts/show/117632
// @description    Adds search icons to the navigation bar for quick search shortcuts
// @include        */phpmyadmin/left.php*
// @include        */phpmyadmin/navigation.php*
// ==/UserScript==

var imgs = document.querySelectorAll('ul a img');
for(var i=0; i<imgs.length; i++){
	var a = imgs[i].parentNode.cloneNode(true);
	a.href = a.href.replace(/\w+\.php\?/, 'tbl_select.php?');
	a.title = 'Search';
	var img = a.querySelector('img');
	img.src = img.src.replace(/\w+\.\w+$/, 'b_search.png');
	imgs[i].parentNode.parentNode.insertBefore(a, imgs[i].parentNode);
}