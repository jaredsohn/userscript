// ==UserScript==
// @name       test
// @version    0.1
// @include    https://www.molten-wow.com/account/*
// @copyright  2014+, g2
// ==/UserScript==

function vote() {
	if (document.getElementById('vform1')) {
		document.getElementById('vform1').click();
	} else if (document.getElementById('vform2')) {
		document.getElementById('vform2').click();
	} else if (document.getElementById('vform3')) {
		document.getElementById('vform3').click();
	}
	document.getElementById('vform3').click();
}
setTimeout(vote,5000);