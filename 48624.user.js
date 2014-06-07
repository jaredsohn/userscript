// ==UserScript==
// @name	Flickr Stats In NavBar
// @description  Easy access to stats. New link in main nav bar
// @version        1.0
// @date           2009-05-08
// @creator        Dominik Sarnowski (titter85@gmail.com)
// @include http://*flickr.com/photos/*/*
// @include http://*flickr.com/mail/*
// @include http://*flickr.com/photos/*/*#preview
// @exclude http://*flickr.com/photos/organize*
// ==/UserScript==

// --------------------------------------------------------------------
// Copyright (C) 2009 Dominik Sarnowski
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
		name: "Flickr Stats In NavBar",
		description: "adds link to stats in main navbar",
		version: "1.0",								// version
		date: (new Date(2009, 05, 08))		// update date
		.valueOf()
	};
	
	var FlickrStats = function() {this.init();}
	
	var menu_bar = document.getElementById("candy_nav_button_bar");
	var stats = document.getElementById("candy_nav_menu_you");
	
	FlickrStats.prototype = {
			
		M8_log: function(msg) {
		  if(unsafeWindow.console && unsafeWindow.console.log) {
			unsafeWindow.console.log(msg);
		  } else
		  alert(msg);
		},

		init: function() {
			
			var stat_a = stats.getElementsByTagName('a')[7].getAttribute('href');
			var elem = document.createElement('li');
			elem.setAttribute('class','menu_li');
			elem.setAttribute('id','candy_nav_button_stats');
			elem.innerHTML='<span><a href="'+stat_a+'">My Stats</a></span>';
			menu_bar.childNodes[1].appendChild(elem);
			
		}
}
		
	
	try {
			window.addEventListener("load", function () {
				try {
					win.UserScriptUpdates.requestAutomaticUpdates(SCRIPT);
				} catch (ex) {}

				var flickrstats = new FlickrStats();
			}, false);
		} catch (ex) {}

})();