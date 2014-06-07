/*global $: false, navigator : false, GM_getValue : false, window: false, document : false, GM_registerMenuCommand : false, GM_log:false, GM_setValue: false, GM_config : false */

// ImageFAP direct images++
// http://userscripts.org/scripts/show/3923
// based on ImageCASH direct images : http://userscripts.org/scripts/show/1792
// adapted and improved for ImageFAP
// Created: 21 apr 2006 
// Version : 121124
// Copyright (c) 2006-2012 darodi, nips9901 

//Authors: 
//darodi: http://userscripts.org/users/5975
//nips9901 : http://nipsden.blogspot.com  , http://userscripts.org/users/8635

// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// You should have received a copy of the GNU General Public License
// along with this program; see the file COPYING. If not, write to the
// Free Software Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.

// ==UserScript==
// @name          ImageFAP direct images++
// @namespace     http://nipsden.blogspot.com
// @description   Bypass the individual pages for images hosted by ImageFAP 
// @require       http://code.jquery.com/jquery-latest.min.js
// @require       http://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
// @include       http://*imagefap.com/gallery/*
// @include       http://*imagefap.com/gallery.php?*gid=*
// @include       http://*imagefap.com/ajax_gallery_display.php?*
// @include       http://*imagefap.com/pictures/*
// @include       http://*imagefap.com/showfavorites.php?*
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_registerMenuCommand
// @grant         GM_log
// @version       20121124.4
// ==/UserScript==

//CHANGELOG:
//*version 121124.4
// + directories back in wget script
//*version 121124.3
// + filename clean up
//*version 121124.2
// + gm_config added
//*version 121124
// + wget script added again, works with favorites (DonkeyHoatie request)
//*version 121118 
// + update to the newer site changes and jqueryfication
//*version 0.1 (21/04/06): first release

function ImageFapPlusPlus() {
	'use strict';
	var self, initWgetCommand, wgetUnix, wgetWin, addExtensionToFile, md, mkdir;
	self = this;

	addExtensionToFile = function (file, href) {
		var accepted, fileExt, hrefExt, i, isAccepted;
		accepted = ["JPG", "JPEG", "BMP", "PNG", "GIF", "jpg", "jpeg", "bmp", "png", "gif"];
		fileExt = file.split('.')[file.split('.').length - 1];
		hrefExt = href.split('.')[href.split('.').length - 1];
		isAccepted = false;
		for (i = 0; i < accepted.length && !isAccepted; i += 1) {
			if (accepted[i] === fileExt) {
				isAccepted = true;
			}
		}
		if (!isAccepted) {
			file += "." + hrefExt;
		}
		return file.replace(/\.+/, ".").replace(/\s/, "_");
	};
	wgetWin = function (file, href) {
		file = addExtensionToFile(file, href);
		return "start /b \"\" wget -O \"" + file + "\" \"" + href + "\"";
	};
	wgetUnix = function (file, href) {
		file = addExtensionToFile(file, href);
		return "wget -O '" + file + "' '" + href + "' ";
	};
	mkdir = function (dir) {
		return "mkdir " + dir;
	};
	md = function (dir) {
		return "md " + dir;
	};

	this.createDirCmd = (navigator.platform.indexOf("Win") !== -1) ? md : mkdir;
	this.wgetCommand = (navigator.platform.indexOf("Win") !== -1) ? wgetWin : wgetUnix;
	this.hrefs = [];
	this.files = [];
	this.dirs = [];

	this.changeLinks = function () {
		$("a[href*='photo']").each(function (index) {
			var href, file;
			href = $(this).find('img').attr('src').replace(/thumb/, 'full');
			if (href !== undefined) {
				$(this).after("<br><a href='" + $(this).attr('href') + "'>[Std]<\/a>");
				$(this).attr('href', href);
				file = $(this).parentsUntil('table').find('i').text();
				if (file !== undefined && file !== null && file !== '') {
					file = file.replace("...", "-" + index);
					self.files.push(file);
				} else {
					self.files.push(index);
				}
				self.hrefs.push(href);
			}
		});
	};

	this.createDirs = function () {
		var self, createDir, i, dir;
		self = this;
		createDir = function (dir) {
			if (dir !== '' && self.dirs.indexOf(dir) === -1) {
				self.dirs.push(dir);
				dir = dir.replace(/[^\/]*\/$/, "");
				createDir(dir);
			}
		};
		for (i = 0; i < this.files.length; i += 1) {
			dir = this.files[i].replace(/[^\/]*$/, "").replace(/\s/, '_');
			createDir(dir);
		}
		self.dirs.sort();
	};


	this.displayScript = function () {
		$('body').append("<div id='wgetscript'><\/div>");
		$("#wgetscript").css('padding', '20px');
		$("#wgetscript").css('margin', 'auto');
		$("#wgetscript").css('border', '1px solid');
		$("#wgetscript").css('width', '85%');
		$("#wgetscript").css('fontFamily', 'monospace');
		$("#wgetscript").append("<h1><center>wget script added by ImageFap++<\/center><\/h1>");
		var i;
		for (i = 0; i < this.dirs.length; i += 1) {
			$("#wgetscript").append(this.createDirCmd(this.dirs[i]));
			$("#wgetscript").append("<br>");
		}
		for (i = 0; i < this.hrefs.length; i += 1) {
			$("#wgetscript").append(this.wgetCommand(this.files[i], this.hrefs[i]));
			$("#wgetscript").append("<br>");
		}
	};
}

var ifap = new ImageFapPlusPlus();

$(document).ready(function () {
	'use strict';
	ifap.changeLinks();
	if (GM_config.get('show_wget_script')) {
		ifap.createDirs();
		ifap.displayScript();
	}
});

GM_config.init('ImageFap++ Settings', {
	'show_wget_script':	{
		'label': 'automatically show wget script?',
		'type': 'checkbox',
		'default': false // store a boolean
	}
});
GM_registerMenuCommand('ImageFap Direct Images ++: Configuration', function () {
	'use strict';
	GM_config.open();
});
GM_registerMenuCommand('ImageFap Direct Images ++: Show script', function () {
	'use strict';
	ifap.createDirs();
	ifap.displayScript();
});
