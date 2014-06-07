// ==UserScript==
// @name	Flickr Auto Lighbox
// @namespace	http://6v8.gamboni.org/
// @description Automatically open the lightbox when viewing photos in groups, from contacts, etc.
// @version        1.0
// @identifier	http://6v8.gamboni.org/IMG/js/flickrautolightbox.user.js
// @date           2010-07-16
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @match http://*.flickr.com/*
// @match http://flickr.com/*
// @include http://*flickr.com*
// @exclude http://*flickr.com/photos/*/*#preview
// @exclude http://*flickr.com/photos/organize*
// ==/UserScript==

// --------------------------------------------------------------------
// Copyright (C) 2010 Pierre Andrews
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
//   http://www.gnu.org/copyleft/gpl.html
// or by writing to
//   Free Software Foundation, Inc.
//   51 Franklin Street, Fifth Floor
//   Boston, MA  02110-1301
//   USA

(function() {
	/*
	  Xpath trickery, from:
	  http://ecmanaut.blogspot.com/2006/07/expressive-user-scripts-with-xpath-and.html
	 */
	function $x( xpath, root )
		{
			var doc = root ? root.evaluate?root:root.ownerDocument : document;
			var got = doc.evaluate( xpath, root||doc, null, 0, null ), next;
			var result = [];
			while( next = got.iterateNext() )
				result.push( next );
			return result;
		}

	function foreach( xpath, cb, root )
	{
		var nodes = $x( xpath, root ), e = 0;
		for( var i=0; i<nodes.length; i++ )
			e += cb( nodes[i], i ) || 0;
		return e;
	}

	function pingHome() {
			if(!this.pinged) {
			//check when this is used to make stats. Totally anonymous. Actually handled by Flickr App Garden stats.
			var call = "http://api.flickr.com/services/rest/?method=flickr.tags.getHotList&count=1&format=json&api_key=4f5fc48868124a08d34df8276e09cc66";
			var img = document.body.appendChild(document.createElement('img'));
			img.src =call;
			img.width="1";
			img.height="1";
			}
		}


  foreach("//a[contains(@href,'/in/')]", function(el) {
			el.href = el.href + '/lightbox';
		  });
   pingHome();

})();
