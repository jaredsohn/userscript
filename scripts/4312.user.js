// ==UserScript==
// @name	 Flickr Pool Date
// @namespace	http://6v8.gamboni.org/
// @description Show when the photo was added to the group pool
// @version        0.5
// @identifier	http://6v8.gamboni.org/IMG/js/flickrpooldate.user.user.js
// @date           2008-01-19
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @include http://*flickr.com/groups/*/pool*
// 
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
		name: " Flickr Pool Date",
		namespace: "http://6v8.gamboni.org/",
		description: "Show when the photo was added to the group pool",
		identifier: "http://6v8.gamboni.org/IMG/js/flickrpooldate.user.user.js",
		version: "0.5",								// version
		date: (new Date("2008-01-19"))		// update date
		.valueOf()
	};

	
	function M8_log() {
		if(unsafeWindow.console)
			unsafeWindow.console.log(arguments);
		else
			GM_log(arguments);
	}

	
	function getObjectMethodClosure(object, method) {
		return function() {
			return object[method](); 
		}
	}

	var FlickrPoolDate = function() {this.init();}

	FlickrPoolDate.prototype = {
		page: 1,
		group_id: null,

		init: function() {

			var matches = /\/page([0-9]+)\/?$/.exec(document.location.pathname);
			if(matches)
				this.page = matches[1];

			var self = this;
			
			var listener = {
				flickr_urls_lookupGroup_onLoad: function(success, responseXML, responseText, params){
					if(success) {
						var rsp = responseText.replace(/<\?xml.*\?>/,'');
						rsp = new XML(rsp);
						self.group_id = rsp.group.@id;	
					} else
						M8_log(responseText);
				}
			};
			
			unsafeWindow.F.API.callMethod('flickr.urls.lookupGroup', {
				url:document.location				   
			}, listener);
			this.waitForGroupId();
		},

		waitForGroupId: function() {
			if(this.group_id) {
				
				var self = this;			
				var listener = {
					flickr_groups_pools_getPhotos_onLoad: function(success, responseXML, responseText, params){
						if(success) {
							var rsp = responseText.replace(/<\?xml.*\?>/,'');

							rsp = new XML(rsp);
							self.insertDates(rsp);
						} else
							M8_log(responseText);
					}
				};
				
				var params =  {
					group_id:this.group_id,
					per_page:30,
					page: this.page
				};

				if(matches = /\/pool\/([0-9]+@N[0-9]{2})\/?/.exec(document.location.pathname)) {
					params['user_id'] = matches[1];
				} 
				if(matches = /\/pool\/tags\/([^\/]+)/.exec(document.location.pathname)) {
					params['tags'] = matches[1];
					params['per_page'] = 24;
				}
				unsafeWindow.F.API.callMethod('flickr.groups.pools.getPhotos',params, listener);
			} else {
				setTimeout(getObjectMethodClosure(this,'waitForGroupId'),1000);
			}
		},

		formatDate: function(seconds) {
			var now = new Date();
			now = now.getTime()+now.getTimezoneOffset() * 60*1000;
			var when = (now/1000) - seconds;
			var days = parseInt(when/(3600*24));
			if(days > 10) {
				var date = new Date(seconds*1000);
				return "on "+date.toLocaleDateString();
			} else {
				var ret = '';
				if(days > 0)
					ret = days + ' day'+((days>1)?'s':'');
				var rest = when - days*3600*24;
				if(when%(3600*24) > 0) {
					if(rest/3600 > 1) {
						if(ret) ret += ', ';
						ret += parseInt(rest/3600)+' h';
					} else if(days < 1)
						ret = "less than an hour";
				} else if(days < 1)
						ret = "less than an hour";
				return ret +' ago';
			}
		},

		insertDates: function(photos) {
				var images = document.evaluate(
											 "//div/p[contains(@class,'PoolList')]//a/img",
										  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
				for(var i = 0; i < images.snapshotLength; i++) {  
					var image = images.snapshotItem(i);
					var matches = /\/([0-9]+)_/.exec(image.src);
					if(matches) {
						var photo = photos..photo.(@id == matches[1]);
						if(photo) {
							var date = this.formatDate(photo.@dateadded);
							var div = image.parentNode.parentNode.appendChild(document.createElement('div'));
							var abbr = document.createElement('abbr');
							abbr.title = new Date(photo.@dateadded*1000).toLocaleString();
							abbr.setAttribute('style','font-size:90%;color: #6C6C6C;');
							abbr.appendChild(document.createTextNode('posted '+ date));
							div.appendChild(abbr);
						}
					}
				}
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
									
									var flickrgp = new FlickrPoolDate();
		}, false);
	} catch (ex) {}
})();
