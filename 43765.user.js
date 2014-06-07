// ==UserScript==
// @name           Large Pictures In Flickr Comments
// @description    This script makes the maximum width of pictures in flickr comments configurable. Without this script the width is limited to 500 pixels.
// @namespace      http://www.jakob.at/greasemonkey/
// @include        http://*flickr.com/*
// @version 0.1
// @creator Steffen A. Jakob (http://www.flickr.com/photos/steffenj/)
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
// 2009-03-07 0.1
//     First public version

maxWidth = GM_getValue('maxWidth', '1280');
GM_registerMenuCommand('Set the maximum width of pictures in flickr comments', function() {
	maxWidth = prompt('maximum width (pixels)', maxWidth);
	GM_setValue('maxWidth', maxWidth);
	document.location.reload();
});
GM_addStyle(
	'img.notsowide { max-width: ' + maxWidth + 'px! important; }\n'
);
