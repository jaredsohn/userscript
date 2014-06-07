// ==UserScript==
// @name           Colourblind friendly OSCON 2009
// @namespace      http://pjf.id.au/
// @description    Replace personal schedule icons with ones you can see.
// @include        http://en.oreilly.com/oscon2009/
// ==/UserScript==
//
// BUGS: This script only fixes the icons on image load.  When you
// toggle an icon, you still get the old ones.  Patches welcome.

var old_fav = 'http://en.oreilly.com/images/personal-schedule-icon2.png';
var new_fav = 'http://en.oreilly.com/images/respon.gif';

var images = document.getElementsByTagName('img');

for (var i=0; i < images.length; i++) {
	if ( images[i].src == old_fav ) {
		images[i].src = new_fav;
	}
}
