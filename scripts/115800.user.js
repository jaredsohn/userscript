// ==UserScript==
// @name Basecamp Quick Login
// @namespace Basecamp Quick Login
// @description	Automatically redirects you to the login page when visiting basecamphq.com
// @include  http://basecamphq.com/
// ==/UserScript==

quickRedirect();

function quickRedirect(){
window.location = "https://launchpad.37signals.com/basecamp/signin"
	}
