// Facepunch Improved Title
// Original Code by Tom Doyle
// Changes by Ruairidh Carmichael
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Facepunch Improved Title
// @namespace     http://facepunch.com
// @description   Replace boring and bland Facepunch title with the actual logo.
// @version       1.10
// @include       http://facepunch.com/forum.php
// @include       http://facepunch.com/index.php
// @include		  http://facepunch.com/
// ==/UserScript==

if ( document.getElementById( 'header' ) ) {
	var logo = document.getElementById( 'lastelement' );
	logo.style.paddingRight = '5px';
	logo.innerHTML = '<a href="index.php"><img src="http://i.imgur.com/XCgDw8W.png" alt="logo" width="305" height="62" /></a>';
	

}