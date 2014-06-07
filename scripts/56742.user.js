// ==UserScript==
// @name			Auto Redirect To Delicious Sign In Page After Logout
// @author			Erik Vold
// @namespace		deliciousLogoutAutoPressSignIn
// @include			http://delicious.com/logout
// @include			http://delicious.com/logout#*
// @include			http://delicious.com/logout?*
// @include			https://delicious.com/logout
// @include			https://delicious.com/logout#*
// @include			https://delicious.com/logout?*
// @include			http://*.delicious.com/logout
// @include			http://*.delicious.com/logout#*
// @include			http://*.delicious.com/logout?*
// @include			https://*.delicious.com/logout
// @include			https://*.delicious.com/logout#*
// @include			https://*.delicious.com/logout?*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-08-31
// @lastupdated		2009-08-31
// @description		This userscript will auto redirect you to the Delicious sign in page after you logout.
// ==/UserScript==

window.location = "https://secure.delicious.com/login";
