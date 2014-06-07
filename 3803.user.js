// ==UserScript==
// @name	Flyr Pool
// @namespace	http://6v8.gamboni.org/
// @description display directly a google map of the pool using Flyr. Works on most of the pages showing multiple photos (group pool, tag pool, search, user page, set pool) 
// @version        0.3
// @identifier	http://6v8.gamboni.org/IMG/js/flyrpool.user.js
// @date           2006-05-18
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @include http://*flickr.com/photos/*
// @include http://*flickr.com/groups/*
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
// Copyright (C) 2006 Pierre Andrews
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

(function () {

	var SCRIPT = {
		name: "Flyr Pool",
		namespace: "http://6v8.gamboni.org/",
		description: "Display directly a google map of the pool using Flyr.",
		source: "http://6v8.gamboni.org/Flyr-Pool.html",			// script homepage/description URL
		identifier: "http://6v8.gamboni.org/IMG/js/flyrpool.user.js",
		version: "0.3",								// version
		date: (new Date(2006, 05, 18))		// update date
		.valueOf()
		};

	var win = (unsafeWindow || window.wrappedJSObject || window);	
	var API_KEY = "e8c3239ff04c102ce2d6ed885bf99005";

	win.FlyrPool = function() {;}

	win.FlyrPool.prototype = {
		photos: new Array(),
		photoCnt: 0,
		cntTries: 20,
		cnt: 0,
		geotag: false,


		checkTags: function(photoId) {
			var url = 'http://www.flickr.com/services/rest/?method=flickr.tags.getListPhoto&api_key='
			+API_KEY
			+"&photo_id="
			+photoId;

			var self = this;

			function onRez(result) {
					self.cnt++;
					var doc = result.responseText.replace(/<\?xml.*\?>/,'');
					doc = new XML(doc);
					for each (tag in doc..tag) {
						if(tag.@raw.match(/geo:(lat|long?)=/)) {
							self.geotag = true;
							self.photos.push(photoId);
							break;
						}
					}
			}

			GM_xmlhttpRequest({
					method: 'GET',
						url: url,
						headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey Flyr Pool',
							'Accept': 'application/atom+xml,application/xml,text/xml'
							},
						onload: onRez});
		},

		getPhotos: function() {
			var tagNodesSnapshot = 
			document.evaluate( "/html/body/div[@id='Main']/div[1]//a|//p[@class='Photo']/a",
							   document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );			
			for(var i=0; i<tagNodesSnapshot.snapshotLength; i++)
				{
					var streamListNode = tagNodesSnapshot.snapshotItem(i);
					href = streamListNode.href;
					matches = /\/([0-9]+)\//.exec(href);
					if(matches) {
						photoId = matches[1];
						this.photoCnt++;
						this.checkTags(photoId);
					}
				}
		},

		insertFlyr: function() {
			
		
			var gmd = document.createElement("div");
			gmd.setAttribute("style","font-size:85%; margin-bottom: 1em;clear: right;");
			//Group/Set pool
			var goodStuffs;
			var xpath = document.evaluate("//div[@class='HoldPhotos']",
										  document.body,
										  null,
										  XPathResult.ANY_UNORDERED_NODE_TYPE,
										  null);
			if(xpath) {
				goodStuffs = xpath.singleNodeValue;
			}
			if(goodStuffs) {
				goodStuffs.insertBefore(gmd,goodStuffs.firstChild);
			} else {
				//When we see the calendar
				var xpath = document.evaluate("//table[@class='SurfsUp']",
											  document.body,
											  null,
											  XPathResult.ANY_UNORDERED_NODE_TYPE,
											  null);
				if(xpath) {
					goodStuffs = xpath.singleNodeValue;
					if(goodStuffs) goodStuffs.parentNode.insertBefore(gmd,goodStuffs.nextSibling);
					else {				
						xpath = null;
						//in the user page
						xpath = document.evaluate("//div[@class='StreamView']",
												  document.body,
												  null,
												  XPathResult.ANY_UNORDERED_NODE_TYPE,
												  null);
						if(xpath) {
							goodStuffs = xpath.singleNodeValue;
							if(goodStuffs) {
								goodStuffs = goodStuffs.parentNode.parentNode.parentNode.insertBefore(document.createElement('tr'),goodStuffs.parentNode.parentNode);
								goodStuffs = goodStuffs.appendChild(document.createElement('td'));
								goodStuffs.setAttribute('colspan',2);
								goodStuffs.appendChild(gmd);

							} else {
								goodStuffs = document.getElementById('setThumbs');
								if(goodStuffs) goodStuffs.insertBefore(gmd,goodStuffs.firstChild);
								else gmd = null;
							}
						}
					}
				}
			}
			
			if(gmd) {
			
				//highly inspired by greasemap
				function insertFlyrMap() {				
					var f = document.createElement('iframe');
					var close = document.createElement("a");
					close.innerHTML = "&nbsp;Close";
					close.href="#";
					close.addEventListener('click',function() {
											   gmd.removeChild(f);
											   gmd.removeChild(close);
											},false);
					gmd.appendChild(close);
					
					f.setAttribute('width', '812');
					f.setAttribute('height', '420');
					f.setAttribute('src', mapurl);
					gmd.appendChild(f);
				}

				var mapurl = 'http://flyr.whatfettle.com/maps?ids='
						+ encodeURIComponent(this.photos.join(','));
				gmd.innerHTML = this.photos.length+" geotagged photos have been found. <a target=\"_blank\" href=\""+mapurl+"\">Open in new window</a>,";
				var direct = document.createElement("a");
				direct.setAttribute("style","font-weight:bold;");
				direct.innerHTML = "&nbsp;Display Here";
				direct.href="#";
				direct.addEventListener('click',function() {
									   insertFlyrMap();
										},false);
				gmd.appendChild(direct);
			}
		},

		waitForResults: function() {
			this.cntTries--;
			if(this.cnt >= this.photoCnt) {
				if(this.geotag) this.insertFlyr();
			} else {
				var self = this;
				if(this.cntTries>0) setTimeout(function() {self.waitForResults();},1000);
			}
		}
		
	}
	
	
	// update automatically (http://userscripts.org/scripts/show/2296)
	try {
		window.addEventListener("load", function () {
									try {
										win.UserScriptUpdates.requestAutomaticUpdates(SCRIPT);
									} catch (ex) {} 
									var fltags = new win.FlyrPool();
									fltags.getPhotos();
									fltags.waitForResults();
								}, false);
	} catch (ex) {}



})();
