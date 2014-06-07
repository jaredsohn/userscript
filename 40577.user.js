// ==UserScript==
// @name          Blogger large post editor
// @namespace     http://browservulsel.blogspot.com/
// @description   v0.1.3 - It makes the title field wider, but most important: it sets the editor's width to 100% and makes it higher. It works for both plain and rich editing.
// @include       http://www.blogger.com/post-*
// @include       http://blogger.com/post-*
// ==/UserScript==

/*

	Author: Jasper de Vries, jepsar@gmail.com
	Date:   2005-12-19

*/

unsafeWindow.addEventListener('load', function() {
	var ea = document.getElementById('editarea');
	if (ea) {
		ea.parentNode.parentNode.style.width = '99%';
		ea.parentNode.style.width = '650px';
		ea.style.width = '650px';

		document.getElementById('f-title').style.width = '650px';
		document.getElementById('modebar').style.width = '650px';
		document.getElementById('richbars').style.width = '650px';

		var ref = document.getElementById('richeditorframe');
		ref.style.width = '730px';
		ref.style.height = '660px';

		var ta = document.getElementById('textarea');
		ta.style.height = '350px';

		document.getElementById('postoptions').style.width = '100%';
	}
}, false);
