// ==UserScript==
// @name           BU login
// @namespace      *
// @description    avoid the hack to prevent automated bu login
// @include        https://weblogin.bu.edu//web@login3*
// ==/UserScript==

if (document.forms) {

	// no need to wait
	setTimeout( function() {

		document.forms[0].elements.namedItem('pw').value = document.forms[0].elements.namedItem('pw2').value;

		// lets not autosubmit
		// document.forms[0].submit();

	}, 500);

}