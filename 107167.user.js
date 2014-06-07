// ==UserScript==
// @name           test
// @namespace      test
// @description    test
// @include        http://mail.ru
// @include        http://www.mail.ru/
// ==/UserScript==

document.getElementsByClassName('submit')[1].onclick = function() {

	alert('f');
	return false;

}


