// ==UserScript==
// @name           Flickr Add Now Button
// @description    Adds a "Now" button to the photo date page
// @namespace      http://www.jakob.at/greasemonkey/
// @include        http://*flickr.com/photo_date_posted.gne*
// @include        http://*flickr.com/*/edit-details*
// @version 0.2
// @creator Steffen A. Jakob (http://www.flickr.com/photos/steffenj/)
// ==/UserScript==
//
// Copyright (C) 2009-2010 Steffen A. Jakob
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
// 2009-03-15 0.1
//     First public version
// 2010-07-11 0.2
//    Handle new flickr UI

delta = GM_getValue('delta', '-1');
GM_registerMenuCommand('Post Now: difference to current time (minutes)', function() {
	delta = prompt('Difference to current time (minutes)', delta);
	GM_setValue('delta', delta);
	document.location.reload();
});

var timeName = "time_posted";
var dateName = "date_posted";
var t = document.getElementsByName(timeName).item(0);
if (t == null) {
	// Old layout
	timeName = "time";
	dateName = "date";
	t = document.getElementsByName(timeName).item(0);
}

var n = document.createElement('a');
n.appendChild(document.createTextNode('Now'));
n.setAttribute('href', '#');
var js = 'var n = new Date; n.setTime(n.getTime()+(' + delta + '*60000)); document.getElementsByName("' + timeName + '").item(0).value=n.getHours()+":"+n.getMinutes()+":"+n.getSeconds(); document.getElementsByName("' + dateName + '").item(0).value=n.getMonth()+1+"/"+n.getDate()+"/"+n.getFullYear();'
n.setAttribute('onclick', 'javascript: { ' + js + '};');
t.parentNode.appendChild(n);
