// ==UserScript==
// @name           Flickr Hiccup Counter
// @namespace      http://www.jakob.at/greasemonkey/
// @description    Counts flickr hiccups and makes hidden error messages visible.
// @version 0.1beta
// @creator Steffen A. Jakob (http://www.flickr.com/photos/steffenj/)
// @include        http://*flickr.com/*
// ==/UserScript==
//
// Copyright (C) 2009 Steffen A. Jakob
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// The GNU General Public License is available by visiting
// http://www.gnu.org/copyleft/gpl.html
// or by writing to
// Free Software Foundation, Inc.
// 51 Franklin Street, Fifth Floor
// Boston, MA  02110-1301
// USA

// Changelog
// 2009-05-24 0.1beta First public beta version

function importJs(url) {
    var script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
}
importJs('http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js');

function jQueryWait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(jQueryWait, 100);
    } else {
        $ = unsafeWindow.jQuery;
        main();
    }
}
jQueryWait();

function main() {
	var nHiccups = GM_getValue('nHiccups', 0);
	var hiccups = $('h1:contains(Hold your clicks a moment please)');
	if (hiccups.length > 0) {
		nHiccups++;
		var first = GM_getValue('firstHiccupDate', '');
		if (first.length == 0) {
			first = new Date();
			GM_setValue('firstHiccupDate', first.toString());
		} else {
			first = new Date(first);
		}
		var today = new Date();
		nDuration = (today.valueOf() - first.valueOf()) / (1000 * 60 * 60);
		nDuration = Math.round(nDuration);
		var duration = '';
		if (nDuration < 24) {
			duration = nDuration + ' hours';
		} else {
			duration = Math.round(nDuration / 24) + ' days';
		}
		
		var comments = document.evaluate('//div[@id="Main"]/comment()', document, null, 6, null);
		var comment = '<pre style=\"color:red; text-align:left;\">';
		for (var i = 0; i < comments.snapshotLength; i++) {
			var b = (i == comments.snapshotLength - 1) ? "" : "\n<br>";
			comment += comments.snapshotItem(i).data.replace(/</g,'&lt;').replace(/>/,'&gt;') + b;
		}
		comment += '</pre>';
		
		$('div[@id="Main"]').after(comment);
		hiccups.eq(0).append('<p>' + nHiccups + ' hiccups within ' + duration + ' (' + window.location.href + ').</p>');
				
		GM_setValue('nHiccups', nHiccups);
	}
}
