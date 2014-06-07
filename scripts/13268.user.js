// Access Flickr Image Url Plugin
// Version 0.1 beta
// Copyright (C) 2007, Jia Mi <winters.mi (AT) gmail.com>
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
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
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// ==UserScript==
// @name           Access Flickr Image Url
// @namespace      jj
// @description    A plugin the get the flickr image url for the flickr banned area
// @include        http://www.flickr.com/photos/*/*/
// ==/UserScript==

var exchangeSource	= new Array(
	/^([^\.]*\.?)farm4.static.flickr.com$/i,
	/^([^\.]*\.?)farm3.static.flickr.com$/i,
	/^([^\.]*\.?)farm2.static.flickr.com$/i,
	/^([^\.]*\.?)farm1.static.flickr.com$/i,
	/^([^\.]*\.?)farm(\d).static.flickr.com$/i,	//Some heuristic idea.  May help for the next image farm, and may not help at the same probability!
	/^([^\.]*\.?)(downloads|code).flickr.com$/i,
	/^([^\.]*\.?)static.flickr.com$/i,
	/^([^\.]*\.?)blog.flickr.com$/i,
	/^([^\.]*\.?)flickr.com$/i
	);
var exchangeDest	= new Array(
	'farm4.static.flickr.yahoo11.akadns.net',
	'farm3.static.flickr.yahoo3.akadns.net',
	'farm2.static.flickr.yahoo3.akadns.net',
	'farm1.static.flickr.yahoo8.akadns.net',
	'farm$2.static.flickr.yahoo3.akadns.net', //?
	'admin2.flickr.mud.yahoo.com',
	'farm1.static.flickr.yahoo8.akadns.net',
	'blog.flickr.com',
	'www.flickr.mud.yahoo.com'
	);
// lines above are taken from Access Flickr! extension of firefox.

showImageUrl();

function showImageUrl() {
	var alldiv, thisdiv;
	var imageUrl;
	alldiv = document.getElementsByTagName("div");

	for (var i = 0; i < alldiv.length; ++i) {
		thisdiv = alldiv[i];
		if (thisdiv.id.indexOf("photoImgDiv") != -1) {
			var imageObj = thisdiv.getElementsByTagName("img")[0];
			if (imageObj != null) {
				imageUrl = imageObj.src;
				break;
			}
		}
	}

	if (imageUrl == null)
		return;

	var hostname, imageLast;
	hostname = imageUrl.substr(7, imageUrl.length);
	imageLast = hostname.substr(hostname.indexOf("/"), hostname.length);
	hostname = hostname.substr(0, hostname.indexOf("/"));
	for (var i = 0; i < exchangeSource.length; ++i) {
		if (exchangeSource[i].test(hostname)) {	
			hostname = exchangeDest[i];
			break;
		}
	}
	
	imageUrl = "http://" + hostname + imageLast;

	for (var i = 0; i < alldiv.length; ++i) {
		thisdiv = alldiv[i];
		if (thisdiv.id.indexOf("DiscussPhoto") != -1) {
			var imageUrlLink = document.createElement("p");
			imageUrlLink.textContent = imageUrl;
			thisdiv.appendChild(imageUrlLink);
			break;
		}
	}
}
