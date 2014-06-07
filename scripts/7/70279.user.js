// ==UserScript==
// @name           Enable Enter Key
// @namespace      url(http://www.w3.org/1999/xhtml);
// @description    Enable "Enter" key to submit the login form.
// @include        http://www.gtis.com/gta/
// @include        http://www.gtis.com/gta/default.cfm*
// @author         Thierry Ducrest
// @version        0.1
// ==/UserScript==

var ENTER_KEYCODE=13;

function KeyCheck(e)
{
if (e.keyCode == ENTER_KEYCODE) {
	location.assign( "javascript:checkit();void(0)" );
	}
}

window.addEventListener('keydown', KeyCheck, true);
