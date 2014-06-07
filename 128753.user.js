// ==UserScript==
// @name           Turk.Internet.Com - Headline fix
// @description    Remove onclick attributes of Headlines
// @version        1.2
// @require 		http://code.jquery.com/jquery-latest.min.js
// @date           15.04.2014
// @author         Volkan K.
// @namespace      http://userscripts.org/users/volkan
// @include        http://www.turk.internet.com/portal/index.php*
// @include        http://turk.internet.com/portal/index.php*
// @include        http://www.turk-internet.com/portal/index.php*
// @include        http://turk-internet.com/portal/index.php*
// @include        http://195.87.51.20/portal/index.php*
// @include        http://195.87.51.21/portal/index.php*
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

if ( jQuery("#featured").height() < jQuery("#featured ul.ui-tabs-nav").height() ) {
	jQuery("#featured").height( jQuery("#featured ul.ui-tabs-nav").height() );
}

if ( jQuery("ul.ui-tabs-nav li").length>15 ) {
	var ui_tabs_nav = jQuery("ul.ui-tabs-nav li").length;
} else {
	var ui_tabs_nav = 15;
}

for (var i = 1; i <= ui_tabs_nav; i++) {
	var fragment = document.getElementById("nav-fragment-" + i);
	if (fragment)
	{
		var links = fragment.getElementsByTagName("a");
		for (var j = 0; j < links.length; j++) {
			if ( (links[j].getAttribute('onclick')!="") && (links[j].getAttribute('href')!="") ) {
				links[j].removeAttribute('onclick');
			}
		}
	}
}