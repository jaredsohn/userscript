// Feedly Unread Count in Favicon and Title Bar
// 15 March 2013
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "ReTweet", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Feedly Unread Count in Favicon and Title Bar
// @description   Places unread count in favicon and title bar
// @version       1.3
// @include       http://feedly.com/*
// @include       https://feedly.com/*
// @include       http://www.feedly.com/*
// @include       https://www.feedly.com/*
// @include       http://cloud.feedly.com/*
// @include       https://cloud.feedly.com/*
// @include       http://www.cloud.feedly.com/*
// @include       https://www.cloud.feedly.com/*
// @match         http://feedly.com/*
// @match         https://feedly.com/*
// @match         http://www.feedly.com/*
// @match         https://www.feedly.com/*
// @match         http://cloud.feedly.com/*
// @match         https://cloud.feedly.com/*
// @match         http://www.cloud.feedly.com/*
// @match         https://www.cloud.feedly.com/*
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_registerMenuCommand
// ==/UserScript==

if(!GM_getValue) {
	function GM_getValue(name, fallback) {
		return fallback;
	}
}

// Register GM Commands and Methods
if(GM_registerMenuCommand) {
	GM_registerMenuCommand( "Feedly Favicon Alerts > Unread Count On", function() { setUnreadCountDisplay(true) } );
	GM_registerMenuCommand( "Feedly Favicon Alerts > Unread Count Off", function() { setUnreadCountDisplay(false) } );
	GM_registerMenuCommand( "Feedly Favicon Alerts > Grayscale On", function() { setGrayscaleDisplay(true); } );
	GM_registerMenuCommand( "Feedly Favicon Alerts > Grayscale Off", function() { setGrayscaleDisplay(false); } );
	function setUnreadCountDisplay(val) { console.log('set unread count display to ' + val.toString()); GM_setValue('unreadCountDisplay', val) };
	function setGrayscaleDisplay(val) { console.log('set grayscale display to ' + val.toString()); GM_setValue('grayscaleDisplay', val) };
}

function FeedlyFavIconAlerts() {
	var self = this;
	this.construct = function() {
		this.head = window.document.getElementsByTagName('head')[0];
		this.title = this.head.getElementsByTagName('title')[0];
		this.iconTimer; this.titleTimer;
		this.icons = {
			unread: 'data:image/x-icon;base64,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AAAAAAABwAAAAAAAAAPAAAAAAAAAA+AAAAAAAAAH8AAAAAAAAA/4AAAAAAAAH/wAAAAAAAA//gAAAAAAAH//AAAAAAAA//+AAAAAAAH//8AAAAAAA///4AAAAAAH///wAAAAAA////gAAAAAH////AAAAAA////+AAAAAH////8AAAAA/////4AAAAH/////wAAAA//////gAAAH//////AAAA//////+AAAH//////8AAA///////4AAH///////wAA////////gAH////////AA////////+AH////////8A/////////+f/////////////////////////////////////////////////////////8=',
			read:   'data:image/x-icon;base64,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',
		};
		this.pixelMaps = {
			icons: {
				'unread':
					[
						['','','','','','','','','','','','','','','',''],
						['','','','','','','','','','','','','','','',''],
						['','','','','','','#A1C913','#A5CC17','#A9CF1A','#ADD11D','','','','','',''],
						['','','','','','#9CC710','#A1C913','#A7CD1B','#AAD01B','#AED21E','#B2D522','','','','',''],
						['','','','','#97C30D','#9CC710','#A5CC1E','#E9F2C8','#DEEDA6','#ADD11E','#B2D421','#B5D625','','','',''],
						['','','','#91BE0C','#96C20D','#A0C91B','#E8F2C7','#FFFFFF','#E1EEB0','#ACD11D','#B0D320','#B3D522','#B5D624','','',''],
						['','','#8AB90A','#90BD0B','#9AC419','#E7F1C6','#FFFFFF','#DFEDAE','#A7CD1B','#A9CF1A','#ADD11D','#AFD31F','#B1D421','#B0D320','',''],
						['','#82B308','#87B809','#93BF17','#E5F0C6','#FFFFFF','#DDEBAD','#A5CB1E','#B2D339','#A6CD18','#A9CF1A','#ABD01C','#ACD11D','#ACD11D','#ABD01B',''],
						['','#80B108','#89B811','#E3EEC5','#FFFFFF','#DAEAAC','#9EC71A','#E4EFBE','#F9FBF0','#B1D237','#A5CC17','#A7CD18','#A8CE19','#A8CE19','#A7CD18',''],
						['','#7DB007','#86B50F','#D1E3A1','#CEE296','#97C218','#E2EEBD','#FFFFFF','#E1EEB6','#A2CA18','#A2CA13','#A3CA15','#A4CB15','#A4CB15','#A3CA15',''],
						['','#7BAE06','#7FB108','#84B509','#8BBA0E','#E0ECBD','#FFFFFF','#DFECB6','#9BC614','#9BC60F','#9DC711','#9FC812','#9FC812','#9FC812','#9FC812',''],
						['','','#7CAF07','#81B208','#87B70C','#CEE29B','#D1E39C','#9EC629','#97C212','#97C30D','#99C40E','#9AC50E','#9BC50F','#9BC60F','',''],
						['','','','#7DAF07','#81B208','#85B509','#95C022','#F2F7E3','#DCEAB1','#92BF0C','#93C00D','#94C10D','#95C20D','','',''],
						['','','','','#7CAF07','#80B208','#88B711','#C8DE91','#B8D56B','#8CBB0A','#8EBC0B','#90BD0B','','','',''],
						['','','','','','','','','','','','','','','',''],
						['','','','','','','','','','','','','','','','']
					],
				'unread_grayscale':
					[
						['','','','','','','','','','','','','','','',''],
						['','','','','','','','','','','','','','','',''],
						['','','','','','','#A8A8A8','#ACACAC','#AFAFAF','#B2B2B2','','','','','',''],
						['','','','','','#A5A5A5','#A8A8A8','#ADADAD','#B0B0B0','#B3B3B3','#B6B6B6','','','','',''],
						['','','','','#A1A1A1','#A5A5A5','#ADADAD','#EBEBEB','#E0E0E0','#B2B2B2','#B5B5B5','#B8B8B8','','','',''],
						['','','','#9C9C9C','#A0A0A0','#A9A9A9','#EAEAEA','#FFFFFF','#E3E3E3','#B1B1B1','#B4B4B4','#B6B6B6','#B8B8B8','','',''],
						['','','#979797','#9B9B9B','#A4A4A4','#E9E9E9','#FFFFFF','#E2E2E2','#ADADAD','#AFAFAF','#B2B2B2','#B4B4B4','#B5B5B5','#B4B4B4','',''],
						['','#919191','#959595','#9F9F9F','#E8E8E8','#FFFFFF','#E0E0E0','#ACACAC','#B8B8B8','#ADADAD','#AFAFAF','#B0B0B0','#B1B1B1','#B1B1B1','#B0B0B0',''],
						['','#8F8F8F','#979797','#E6E6E6','#FFFFFF','#DEDEDE','#A7A7A7','#E6E6E6','#F9F9F9','#B6B6B6','#ACACAC','#ADADAD','#AEAEAE','#AEAEAE','#ADADAD',''],
						['','#8D8D8D','#949494','#D6D6D6','#D3D3D3','#A2A2A2','#E5E5E5','#FFFFFF','#E4E4E4','#AAAAAA','#A9A9A9','#AAAAAA','#ABABAB','#ABABAB','#AAAAAA',''],
						['','#8C8C8C','#8F8F8F','#939393','#989898','#E3E3E3','#FFFFFF','#E2E2E2','#A5A5A5','#A4A4A4','#A6A6A6','#A7A7A7','#A7A7A7','#A7A7A7','#A7A7A7',''],
						['','','#8D8D8D','#909090','#959595','#D4D4D4','#D6D6D6','#A8A8A8','#A1A1A1','#A1A1A1','#A2A2A2','#A3A3A3','#A4A4A4','#A4A4A4','',''],
						['','','','#8D8D8D','#909090','#939393','#A1A1A1','#F3F3F3','#DFDFDF','#9D9D9D','#9E9E9E','#9F9F9F','#A0A0A0','','',''],
						['','','','','#8D8D8D','#909090','#969696','#CFCFCF','#C0C0C0','#999999','#9A9A9A','#9B9B9B','','','',''],
						['','','','','','','','','','','','','','','',''],
						['','','','','','','','','','','','','','','','']
					],
			},
			numbers: [
				[
					[0,1,1,0],
					[1,0,0,1],
					[1,0,0,1],
					[1,0,0,1],
					[0,1,1,0]
				],
				[
					[0,1,0],
					[1,1,0],
					[0,1,0],
					[0,1,0],
					[1,1,1]
				],
				[
					[1,1,1,0],
					[0,0,0,1],
					[0,1,1,0],
					[1,0,0,0],
					[1,1,1,1]
				],
				[
					[1,1,1,0],
					[0,0,0,1],
					[0,1,1,0],
					[0,0,0,1],
					[1,1,1,0]
				],
				[
					[0,0,1,0],
					[0,1,1,0],
					[1,0,1,0],
					[1,1,1,1],
					[0,0,1,0]
				],
				[
					[1,1,1,1],
					[1,0,0,0],
					[1,1,1,0],
					[0,0,0,1],
					[1,1,1,0]
				],
				[
					[0,1,1,0],
					[1,0,0,0],
					[1,1,1,0],
					[1,0,0,1],
					[0,1,1,0]
				],
				[
					[1,1,1,1],
					[0,0,0,1],
					[0,0,1,0],
					[0,1,0,0],
					[0,1,0,0]
				],
				[
					[0,1,1,0],
					[1,0,0,1],
					[0,1,1,0],
					[1,0,0,1],
					[0,1,1,0]
				],
				[
					[0,1,1,0],
					[1,0,0,1],
					[0,1,1,1],
					[0,0,0,1],
					[0,1,1,0]
				],
			]
		};

		this.iconTimer = window.setInterval(this.pollIcon, 1000);
		this.titleTimer = window.setInterval(this.pollTitle, 1000);
		this.pollIcon();
		this.pollTitle();

		return true;
	}

	this.getUnreadCount = function() {
		var feedCategory = [];
		var feedUnreadNumbers = [];
		var categoryUnreadNumbers = [];

		var sidearea = document.getElementById('sideArea');
		if (sidearea != null)
		{
			var unreadCounters = sidearea.getElementsByTagName('div');
			for (i = 0; i < unreadCounters.length; i++)
			{
				if (unreadCounters[i].className.indexOf('feedUnreadCount') >= 0)
				{
					var currentUnreadCount = unreadCounters[i].innerHTML.replace(/[^0-9]+/gi, '');
					if (currentUnreadCount == null || currentUnreadCount == undefined || currentUnreadCount.length == 0)
					{
						currentUnreadCount = 0;
					}

					var feedId = unreadCounters[i].getAttribute('data-feedid');
					if (feedUnreadNumbers[feedId] == null || feedUnreadNumbers[feedId] == undefined)
					{
						feedUnreadNumbers[feedId] = parseInt(currentUnreadCount, 10);
					}
				}
			}
		}

		var tabarea = document.getElementById('feedlyTabs');
		if (tabarea != null)
		{
			var unreadCounters = tabarea.getElementsByTagName('div');
			for (i = 0; i < unreadCounters.length; i++)
			{
				if (unreadCounters[i].className.indexOf('categoryUnreadCount') >= 0
					&& unreadCounters[i].getAttribute('data-category') != '#latest'
					&& unreadCounters[i].getAttribute('data-category') != 'global.must')
				{
					var categoryName = unreadCounters[i].getAttribute('data-category');

					var categoryUnreadCount = unreadCounters[i].innerHTML.replace(/[^0-9]+/gi, '');
					if (categoryUnreadCount == null || categoryUnreadCount == undefined || categoryUnreadCount.length == 0)
					{
						categoryUnreadCount = 0;
					}
					categoryUnreadNumbers[categoryName] = parseInt(categoryUnreadCount, 10);
				}
			}
		}

		var feedUnreadNumber = 0;
		for (item in feedUnreadNumbers)
		{
			feedUnreadNumber += feedUnreadNumbers[item];
		}

		var categoryUnreadNumber = 0;
		for (item in categoryUnreadNumbers)
		{
			categoryUnreadNumber += categoryUnreadNumbers[item];
		}

		var largerCount = (categoryUnreadNumber > feedUnreadNumber) ? categoryUnreadNumber : feedUnreadNumber;
		return largerCount;
	}

	this.drawUnreadCount = function(unread) {
		var iconCanvas = self.getUnreadCanvas();
		var textedCanvas = document.createElement('canvas');
		textedCanvas.height = textedCanvas.width = iconCanvas.width;
		var ctx = textedCanvas.getContext('2d');
		ctx.drawImage(iconCanvas, 0, 0);

		ctx.fillStyle = "#fef4ac";
		ctx.strokeStyle = "#dabc5c";
		ctx.strokeWidth = 1;

		var count = unread.length;
		var bgHeight = self.pixelMaps.numbers[0].length;
		var bgWidth = 0;
		var padding = count > 2 ? 0 : 1;

		for(var index = 0; index < count; index++) {
			bgWidth += self.pixelMaps.numbers[unread[index]][0].length;
			if(index < count-1) {
				bgWidth += padding;
			}
		}
		bgWidth = bgWidth > textedCanvas.width-4 ? textedCanvas.width-4 : bgWidth;

		ctx.fillRect(textedCanvas.width-bgWidth-4,2,bgWidth+4,bgHeight+4);


		var digit;
		var digitsWidth = bgWidth;
		for(var index = 0; index < count; index++) {
			digit = unread[index];
			if (self.pixelMaps.numbers[digit]) {
				var map = self.pixelMaps.numbers[digit];
				var height = map.length;
				var width = map[0].length;


				ctx.fillStyle = "#2c3323";

				for (var y = 0; y < height; y++) {
					for (var x = 0; x < width; x++) {
						if(map[y][x]) {
							ctx.fillRect(14- digitsWidth + x, y+4, 1, 1);
						}
					}
				}

				digitsWidth -= width + padding;
			}
		}

		ctx.strokeRect(textedCanvas.width-bgWidth-3.5,2.5,bgWidth+3,bgHeight+3);

		return textedCanvas;
	}
	this.getUnreadCanvas = function() {
		self.unreadCanvas = document.createElement('canvas');
		self.unreadCanvas.height = self.unreadCanvas.width = 16;

		var ctx = self.unreadCanvas.getContext('2d');

		for (var y = 0; y < self.unreadCanvas.width; y++) {
			for (var x = 0; x < self.unreadCanvas.height; x++) {
				if (self.pixelMaps.icons.unread[y][x]) {
					ctx.fillStyle = (!self.getGrayscaleDisplay()) ? self.pixelMaps.icons.unread[y][x] : self.pixelMaps.icons.unread_grayscale[y][x];
					ctx.fillRect(x, y, 1, 1);
				}
			}
		}

		return self.unreadCanvas;
	}

	this.getDebugging = function() { return false; }
	this.getUnreadCountDisplay = function() { return GM_getValue('unreadCountDisplay', true); }
	this.getGrayscaleDisplay = function() { return GM_getValue('grayscaleDisplay', false); }

	this.getUnreadCountIcon = function() {
		var unread = self.getUnreadCount().toString();
		if(self.getUnreadCountDisplay()) {
			return self.drawUnreadCount(unread).toDataURL('image/png');
		} else {
			return (!self.getGrayscaleDisplay()) ? self.icons.unread : self.icons.read;
		}
	}

	this.pollIcon = function() {
		if(self.getUnreadCount() != 0)
			self.setIcon(self.getUnreadCountIcon());
		else
			self.setIcon(self.icons.read);
	}

	this.pollTitle = function() {
		var unreadCount = self.getUnreadCount();
		var cleanedTitle = document.title.replace(/^(\([0-9]+\)\s)/gi, '');
		document.title = ((unreadCount != 0) ? '(' + unreadCount + ') ' : '') + cleanedTitle;
	}

	this.setIcon = function(icon) {
		var links = self.head.getElementsByTagName("link");
		for (var i = 0; i < links.length; i++)
			if ((links[i].rel == "shortcut icon" || links[i].rel=="icon") &&
				links[i].href != icon)
				self.head.removeChild(links[i]);
			else if(links[i].href == icon)
				return;

		var newIcon = document.createElement("link");
		newIcon.type = "image/png";
		newIcon.rel = "shortcut icon";
		newIcon.href = icon;

		self.head.appendChild(newIcon);

		window.setTimeout(function() {
			var shim = document.createElement('iframe');
			shim.width = shim.height = 0;
			document.body.appendChild(shim);
			shim.src = "icon";
			document.body.removeChild(shim);
		}, 499);
	}

	return this.construct();
}

new FeedlyFavIconAlerts();