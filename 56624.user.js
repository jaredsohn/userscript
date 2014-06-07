// ==UserScript==
// @name			Auto Check 'Keep me signed in' for Delicious
// @author			Erik Vold
// @namespace		deliciousAutoCheckKeepMeLoggedIn
// @include			https://secure.delicious.com/login
// @include			https://secure.delicious.com/login#*
// @include			https://secure.delicious.com/login?*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-08-29
// @lastupdated		2009-08-29
// @description		This userscript automatically checks the 'Keep me signed in' for the Delicious login.
// ==/UserScript==

var checkbox = document.getElementById( 'rememberme' );
if( checkbox ) {
	checkbox.checked = "checked";
}
