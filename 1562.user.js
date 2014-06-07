// ==UserScript==
// @name           LiveJournal mail fix for SquirrelMail
// @namespace      http://henrik.nyh.se
// @description    Makes quoted post section smaller in LiveJournal post comment notification mails within SquirrelMail, with scrollbars if necessary.
// @include        http://*/src/read_body.php?*
// ==/UserScript==

var whatISaid = document.getElementsByTagName("blockquote")[0];

if (whatISaid.style.borderLeft == '2px solid rgb(0, 0, 64)') {

	whatISaid.style.overflow = 'auto';
	whatISaid.style.maxHeight = '150px';
	whatISaid.style.maxWidth = (window.innerWidth - 100) + 'px';
	
}