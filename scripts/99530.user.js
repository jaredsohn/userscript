// ==UserScript==
// @name           Netvibes favicon notifier
// @version        0.0.1
// @date           2011-03-21
// @author         Isammoc
// @namespace      www.isammoc.net
// @description    Notify and alert in favicon for Netvibes
// @include        http://www.netvibes.com/*
// @include        https://www.netvibes.com/*
// ==/UserScript==

if(!GM_xmlhttpRequest)
	return alert('Twitter Favicon Alerts requires Ajax support in Greasemonkey,\nplease upgrade to the latest version.');

// Wait for the window to load to try and initialize
window.addEventListener('load', function() {
	  new NetVibesFavIconAlerts;
	}, true);


function NetVibesFavIconAlerts() {
	var self = this;
	
	this.construct = function() {
		this.head = document.getElementsByTagName("head")[0];
		this.pixelMaps = {
			icons: {
				'unread': 
					[    
['', '#93fb41', '#85fb27', '#85fb27', '#85fb27', '#85fb27', '#85fb27', '#85fb27', '#85fb27', '#85fb27', '#85fb27', '#85fb27', '#85fb27', '#85fb27', '#93fb41', ''],
['#84f237', '#72f01b', '#72f01b', '#72f01b', '#72f01b', '#72f01b', '#72f01b', '#72f01b', '#72f01b', '#72f01b', '#72f01b', '#72f01b', '#72f01b', '#72f01b', '#72f01b', '#84f237'],
['#61e510', '#61e510', '#61e510', '#61e510', '#61e510', '#61e510', '#61e510', '#61e510', '#61e510', '#61e510', '#61e510', '#61e510', '#61e510', '#61e510', '#61e510', '#61e510'],
['#56df11', '#56df11', '#56df11', '#56df11', '#56df11', '#56df11', '#56df11', '#57df12', '#56df11', '#56df11', '#56df11', '#56df11', '#56df11', '#56df11', '#56df11', '#56df11'],
['#4ddb16', '#4ddb16', '#4ddb16', '#4ddb16', '#4ddb16', '#4ddb16', '#4ddb16', '#ffffff', '#ffffff', '#4ddb16', '#4ddb16', '#4ddb16', '#4ddb16', '#4ddb16', '#4ddb16', '#4ddb16'],
['#44d61a', '#44d61a', '#44d61a', '#44d61a', '#44d61a', '#44d61a', '#44d61a', '#ffffff', '#ffffff', '#44d61a', '#44d61a', '#44d61a', '#44d61a', '#44d61a', '#44d61a', '#44d61a'],
['#2bc80d', '#34cd17', '#39d01d', '#39d01d', '#3ad01e', '#3bd01f', '#3cd120', '#ffffff', '#ffffff', '#39d01e', '#39d01d', '#3bd01f', '#3ad01e', '#39d01d', '#34cd17', '#2bc80d'],
['#1abd02', '#1abd02', '#1abd02', '#1abd02', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#1abd02', '#1abd02', '#1abd02', '#1abd02'],
['#18b905', '#18b905', '#18b905', '#18b905', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#18b905', '#18b905', '#18b905', '#18b905'],
['#17b407', '#17b407', '#17b407', '#1ab50a', '#1ab50a', '#18b408', '#17b407', '#ffffff', '#ffffff', '#17b407', '#17b407', '#17b407', '#17b407', '#17b407', '#17b407', '#17b407'],
['#15af08', '#15af08', '#15af08', '#15af08', '#15af08', '#15af08', '#15af08', '#ffffff', '#ffffff', '#15af08', '#15af08', '#15af08', '#15af08', '#15af08', '#15af08', '#15af08'],
['#12aa09', '#12aa09', '#12aa09', '#12aa09', '#12aa09', '#12aa09', '#12aa09', '#ffffff', '#ffffff', '#12aa09', '#12aa09', '#12aa09', '#12aa09', '#12aa09', '#12aa09', '#12aa09'],
['#10a509', '#10a509', '#10a509', '#10a509', '#10a509', '#10a509', '#10a509', '#10a509', '#10a509', '#10a509', '#10a509', '#10a509', '#10a509', '#10a509', '#10a509', '#10a509'],
['#0ca009', '#0ca009', '#0ca009', '#0ca009', '#0ca009', '#0ca009', '#0ca009', '#0ca009', '#0ca009', '#0ca009', '#0ca009', '#0ca009', '#0ca009', '#0ca009', '#0ca009', '#0ca009'],
['#27a826', '#089b07', '#089b07', '#089b07', '#089b07', '#089b07', '#089b07', '#089b07', '#089b07', '#089b07', '#089b07', '#089b07', '#089b07', '#089b07', '#089b07', '#27a826'],
['', '#23a324', '#049605', '#049605', '#049605', '#049605', '#049605', '#049605', '#049605', '#049605', '#049605', '#049605', '#049605', '#049605', '#23a324', ''],
					]
				},
			numbers: {
				0: [
					[1,1,1],
					[1,0,1],
					[1,0,1],
					[1,0,1],
					[1,1,1]
				],
				1: [
					[0,1,0],
					[1,1,0],
					[0,1,0],
					[0,1,0],
					[1,1,1]
				],
				2: [
					[1,1,1],
					[0,0,1],
					[1,1,1],
					[1,0,0],
					[1,1,1]
				],
				3: [
					[1,1,1],
					[0,0,1],
					[0,1,1],
					[0,0,1],
					[1,1,1]
				],
				4: [
					[0,0,1],
					[0,1,1],
					[1,0,1],
					[1,1,1],
					[0,0,1]
				],
				5: [
					[1,1,1],
					[1,0,0],
					[1,1,1],
					[0,0,1],
					[1,1,1]
				],
				6: [
					[0,1,1],
					[1,0,0],
					[1,1,1],
					[1,0,1],
					[1,1,1]
				],
				7: [
					[1,1,1],
					[0,0,1],
					[0,0,1],
					[0,1,0],
					[0,1,0]
				],
				8: [
					[1,1,1],
					[1,0,1],
					[1,1,1],
					[1,0,1],
					[1,1,1]
				],
				9: [
					[1,1,1],
					[1,0,1],
					[1,1,1],
					[0,0,1],
					[1,1,0]
				],
				'+': [
					[0,0,0],
					[0,1,0],
					[1,1,1],
					[0,1,0],
					[0,0,0],
				],
				'k': [
					[1,0,1],
					[1,1,0],
					[1,1,0],
					[1,0,1],
					[1,0,1],
				]
			}
		};
		
		this.timer = setInterval(this.poll, 500);
		this.poll();
		
		return true;
	}
	
	this.drawUnreadCount = function(unread) {
		if(!self.textedCanvas) {
			self.textedCanvas = [];
		}
		
		if(!self.textedCanvas[unread]) {
			var iconCanvas = self.getUnreadCanvas();
			var textedCanvas = document.createElement('canvas');
			textedCanvas.height = textedCanvas.width = iconCanvas.width;
			var ctx = textedCanvas.getContext('2d');
			ctx.drawImage(iconCanvas, 0, 0);
			
			ctx.fillStyle = "#fef4ac";
			ctx.strokeStyle = "#dabc5c";
			ctx.strokeWidth = 1;
			
			var count = unread.length;
			
			if(count > 4) {
				unread = "1k+";
				count = unread.length;
			}
			
			var bgHeight = self.pixelMaps.numbers[0].length;
			var bgWidth = 0;
			var padding = count < 4 ? 1 : 0;
			var topMargin = 2;
			
			for(var index = 0; index < count; index++) {
				bgWidth += self.pixelMaps.numbers[unread[index]][0].length;
				if(index < count-1) {
					bgWidth += padding;
				}
			}
			bgWidth = bgWidth > textedCanvas.width-4 ? textedCanvas.width-4 : bgWidth;
			
			ctx.fillRect(textedCanvas.width-bgWidth-4,topMargin,bgWidth+4,bgHeight+4);
			
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
								ctx.fillRect(14- digitsWidth + x, y+topMargin+2, 1, 1);
							}
						}
					}
					
					digitsWidth -= width + padding;
				}
			}	
			
			ctx.strokeRect(textedCanvas.width-bgWidth-3.5,topMargin+.5,bgWidth+3,bgHeight+3);
			
			self.textedCanvas[unread] = textedCanvas;
		}
		
		return self.textedCanvas[unread];
	}
	this.getIcon = function() {
		return self.getUnreadCanvas().toDataURL('image/png');
	}	
	this.getUnreadCanvas = function() {
		if(!self.unreadCanvas) {
			self.unreadCanvas = document.createElement('canvas');
			self.unreadCanvas.height = self.unreadCanvas.width = 16;
			
			var ctx = self.unreadCanvas.getContext('2d');
			
			for (var y = 0; y < self.unreadCanvas.width; y++) {
				for (var x = 0; x < self.unreadCanvas.height; x++) {
					if (self.pixelMaps.icons.unread[y][x]) {
						ctx.fillStyle = self.pixelMaps.icons.unread[y][x];
						ctx.fillRect(x, y, 1, 1);
					}
				}
			}
		}
		
		return self.unreadCanvas;
	}
	this.getUnreadCount = function() {
		matches = self.getSearchText().match(/\((\d*)\)/);
		return matches ? matches[1] : false;
	}
	this.getUnreadCountIcon = function() {
		var unread = self.getUnreadCount();		
		return self.drawUnreadCount(unread).toDataURL('image/png');
	}
	this.getSearchText = function() {
		return document.title;
	}
	this.poll = function() {
		if(self.getUnreadCount()) {
			self.setIcon(self.getUnreadCountIcon());
		} else {
			self.setIcon(self.getIcon());
		}
	}
	
	this.setIcon = function(icon) {
		var links = self.head.getElementsByTagName("link");
		for (var i = 0; i < links.length; i++)
			if (links[i].type == "image/x-icon" && 
			   (links[i].rel == "shortcut icon" || links[i].rel=="icon") &&
			   links[i].href != icon)
				self.head.removeChild(links[i]);
			else if(links[i].href == icon)
				return;

		var newIcon = document.createElement("link");
		newIcon.type = "image/x-icon";
		newIcon.rel = "shortcut icon";
		newIcon.href = icon;
		return self.head.appendChild(newIcon);
	}
	
	this.toString = function() { return '[object NetVibesFavIconAlerts]'; }
	
	return this.construct();
}