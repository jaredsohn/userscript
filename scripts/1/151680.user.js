// ==UserScript==
// @name        passphra.se - remove spaces and select text
// @namespace   mikecupcake
// @include     http*://passphra.se/
// @include	http*://preshing.com/20110811/xkcd-password-generator
// @grant	none
// @version     0.2
// ==/UserScript==

doIt();

function doIt() {
	if (!document.getElementById('selectme')) {
		var elm = document.getElementById('xkcd_pw_gen_result');
		elm.innerHTML = "<textarea id='selectme' readonly cols='30'>" + elm.textContent.replace(/ /g,""); + "</textarea>";
		elm = document.getElementById('selectme');
		elm.select();
		elm.style.fontSize = '100%';
	}
	setTimeout(function(){ doIt(); }, 500);
}
