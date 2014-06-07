// ==UserScript==
// @name        ITM likes:posts ratio
// @namespace   http://userscripts.org/users/138028
// @include     http://www.inthemix.com.au/forum/showthread.php?*
// @include     http://www.inthemix.com.au/forum/showpost.php?*
// @version     1.0.0
// ==/UserScript==

dls = document.getElementsByTagName('dl');

for (i = 0; i < dls.length; i++) {
	// lol just do everything with innerHTML nobody will care
	m = dls[i].innerHTML.match(/<\/span>[\r\n 	]*([0-9,]+)[\r\n 	]*<\/div>/i);
	likes = parseInt(m[1].replace(',', ''));
	
	m = dls[i].innerHTML.match(/info-second-amt">[\r\n 	]*([0-9,]+)[\r\n 	]*<\/dd>/i);
	posts = parseInt(m[1].replace(',', ''));
	
	swag = parseInt(likes / posts * 100000) / 1000;
	
	dls[i].innerHTML += '<dt style="border: 0; border-top: 1px solid #ccc">Swag</dt><dd style="border: 0; border-top: 1px solid #ccc; width: 100px">' + swag + '%</dd>';
}