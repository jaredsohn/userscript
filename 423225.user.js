// ==UserScript==
// @id             heise.de-8280af0b-4f9b-487e-95b3-45fff377348e
// @name           heise.de Easy Reading
// @version        1.2.1
// @namespace      
// @author         SpineEyE
// @description    
// @include        http://www.heise.de/*
// @run-at         document-idle
// ==/UserScript==
// heise.de Cleaner user script
// Copyright 2011-2014, SpineEyE
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
// 
// changelog
// v1.2.1 - 22.03.2014: Fixed meldung_wrapper text content to have
//						 the new style as well
// v1.2 - 01.03.2014: Now uses GM_addStyle to change article style.
//						Text in <pre> tags is readable in whole width
// v1.1.1 - 16.11.2013: fixed h2-link-construction 
//

(function () { // function wrapper for Opera
//console.log("starting");

// change font

if (document.getElementsByClassName('meldung_wrapper').length > 0) {
	GM_addStyle(
		'.meldung_wrapper, .meldung_wrapper p, .meldung_wrapper h5 {' +
			'font-family: Georgia,"Times New Roman",serif;' +
			'line-height: 155%;' +
			'padding: 0.5em 0;' +
			'font-size: 1em !important;' +
			'letter-spacing: 0.2px;' +
		'}'
	);
}

if (document.getElementsByClassName('artikel_content').length > 0) {
	GM_addStyle(
		'.artikel_content article p {' +
			'font-family: Georgia,"Times New Roman",serif;' +
			'line-height: 155%;' +
			'padding: 0.5em 0;' +
			'font-size: 1em !important;' +
			'letter-spacing: 0.2px;' +
		'}'
	);
}

document.getElementById("container_content").style.top = 0;

/* fix to make text in <pre> tags visible over the whole width */

GM_addStyle(
	'pre {' +
		'position: relative;' +
		'z-index: 1;' +
		'background-color: #FFFFFF;' +
	'}' +
	'pre:hover {' +
		'display: table-caption;' +
		'margin-top: 0' +
	'}'
);

/* prevent image popups, rather insert normal hyperlink 
	bild_links, bild_rechts
 **/
var inlineImages = document.evaluate('//span[starts-with(@class,"bild_")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var i;
for(i = 0; i < inlineImages.snapshotLength; i++) {
console.log("Snapshot item " + i);
	var span = inlineImages.snapshotItem(i);
	var img = span.children[0];
	
	var a = document.createElement('a');
	var bigImageURL = img.getAttribute('data-zoom-src');
	if (!bigImageURL) continue;
	a.href = bigImageURL;
	
	// cloning a node removes all event listeners, so the popup as well
	a.appendChild(img.cloneNode(false));
	
	span.insertBefore(a, img);
	span.removeChild(img);
}
})(); // function wrapper for Opera