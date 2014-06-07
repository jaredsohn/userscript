// ==UserScript==
// @name	Flickr Geo Info To Tag
// @namespace	http://6v8.gamboni.org/
// @description Provide a button to transform geographic information provided by flickr map to usual tags.
// @version        0.2
// @identifier	http://6v8.gamboni.org/IMG/js/flickrgeoinfototag.user.js
// @date           2006-09-01
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @include http://*flickr.com/photos/*/*
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

	//update information
	var SCRIPT = {
		name: "Flickr Geo Info To Tag",
		namespace: "http://6v8.gamboni.org/",
		description: "Provide a button to transform geographic information provided by flickr map to usual tags.",
		identifier: "http://6v8.gamboni.org/IMG/js/flickrgeoinfototag.user.js",
		version: "0.2",								// version
		date: (new Date("2006-09-01"))		// update date
		.valueOf()
	};
	
	
	function M8_log() {
		if(unsafeWindow.console)
			unsafeWindow.console.log(arguments);
		else
			GM_log(arguments);
	}

	function getObjectMethodClosure11(object, method,arg1) {
		return function(arg) {
			return object[method](arg,arg1); 
		}
	}	

	var flickrgeoinfototag = function() {this.init();}

	flickrgeoinfototag.prototype = {

		init: function() {
			var tagger = document.getElementById('tagadder');
			if(tagger) {
				var moreLot = document.evaluate(
												"//td[@class='RHS']/ul//li/a[@class='Plain']",
												document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
												);
				for(var i = 0; i < moreLot.snapshotLength; i++) { 
					var map = moreLot.snapshotItem(i);
					if(map.innerHTML == 'map') {
						var ul = map.parentNode.appendChild(document.createElement('ul'));
						var coord = map.getAttribute('onclick');
						var matches;
						if(matches = /new YGeoPoint\(([0-9.-]+),([0-9.-]+)\)/.exec(coord)) {
							var lat = matches[1];
							var lon = matches[2];
							var li1 = ul.appendChild(document.createElement('li'));
							li1.className = 'Stats';
							var a1 = li1.appendChild(document.createElement('a'));
							a1.href="javascript:;";
							a1.className = 'Plain';
							a1.appendChild(document.createTextNode('Add Geotags'));
							a1.addEventListener('click',getObjectMethodClosure11(this,'addtag',"geotagged geo:lon="+lon+" geo:lat="+lat),false);
						}
						var html = map.parentNode.getElementsByTagName('b').item(0);
						if(html && html.innerHTML) {
							var tags = html.textContent.split(',');
							var tut = '';
							for each(t in tags) {
									tut += '"'+t.replace(/(^\s+|\s+$)/,'')+'" ';
								}
							var li2 = ul.appendChild(document.createElement('li'));
							li2.className = 'Stats';
							var a2 = li2.appendChild(document.createElement('a'));
							a2.href="javascript:;";
							a2.className = 'Plain';
							a2.appendChild(document.createTextNode('Add Place Tags'));
							a2.addEventListener('click',getObjectMethodClosure11(this,'addtag',tut),false);
						}
					
						break;
					}
				}
			}
		},

		addtag: function(evt,tags) {
			unsafeWindow.tagrs_addTag(unsafeWindow.page_photo_id,tags);
		}
	}
	//======================================================================
	// launch
	try {
		window.addEventListener("load", function () {
									try {
										
										// update automatically (http://userscripts.org/scripts/show/2296)
										win.UserScriptUpdates.requestAutomaticUpdates(SCRIPT);
									} catch (ex) {} 
									
									var flickrgp = new flickrgeoinfototag();
		}, false);
	} catch (ex) {}
})();
