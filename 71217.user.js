// ==UserScript==
// @name           inthemix: autohide media
// @namespace      http://userscripts.org/users/rws
// @description    makes TRZA's posts readable
// @include        http://*.inthemix.com.au/forum/show*
// ==/UserScript==

var tbodies = document.getElementsByTagName('tbody');

for (var i = 0; i < tbodies.length; i++) {
	if (tbodies[i].getAttribute('id')) {
		var col = tbodies[i].getAttribute('id');
		if (col.match(/collapseobj_media_[0-9]+/i)) {
			col = col.replace('collapseobj_', '');
			// toggle_collapse(col);

			// greasemonkey is dumb
			location.assign("javascript:toggle_collapse('" + col + "');void(0)");
		}
	}
}