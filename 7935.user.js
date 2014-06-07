// ==UserScript==
// @name           Shelfari - Focus Sign-in
// @namespace      http://mathiasbaert.be/userscripts/shelfari.com/focusloginfield
// @description    Places the focus on the user name fiels of the sign-in box
// @include        http://www.shelfari.com/
// ==/UserScript==

// startpoint of this script
var userName;
if ( userName = document.getElementById('LoginControl_UserName') ) {
	userName.focus();
}
