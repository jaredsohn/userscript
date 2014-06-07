// ==UserScript==
// @name           betterZingMe
// @namespace		http://redphx.com
// @description    Alerts you to the number of notifications in Zing Me.
// @version        1.0.1
// @require	https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include     http://me.zing.vn/*
// @include     http://me.zing.vn
// ==/UserScript==

// Wait for the window to load to try and initialize
window.addEventListener('load', function() {
	  new ZingMeFaviconAlerts;
	}, true);


function ZingMeFaviconAlerts() {
	var self = this;
	
	this.construct = function() {
		this.head = document.getElementsByTagName("head")[0];
		this.pixelMaps = {
			icons: {
				'unread':
					[["rgba(255,255,255,0)","rgba(255,255,255,0)","rgba(169,168,168,127)","rgba(168,167,167,127)","rgba(168,167,167,127)","rgba(168,167,167,127)","rgba(168,167,167,127)","rgba(168,167,167,127)","rgba(168,167,167,127)","rgba(168,167,167,127)","rgba(168,167,167,127)","rgba(168,167,167,127)","rgba(168,167,167,127)","rgba(168,167,167,127)","rgba(255,255,255,0)","rgba(255,255,255,0)"],["rgba(255,255,255,0)","rgba(168,167,167,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(170,169,169,127)","rgba(255,255,255,0)"],["rgba(160,159,159,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(0,137,211,127)","rgba(0,136,218,127)","rgba(72,188,59,127)","rgba(72,188,59,127)","rgba(72,188,59,127)","rgba(255,139,0,127)","rgba(255,151,0,127)","rgba(252,141,10,127)","rgba(253,159,14,127)","rgba(233,25,96,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(157,155,155,127)"],["rgba(166,165,165,127)","rgba(255,255,255,127)","rgba(0,141,213,127)","rgba(0,156,220,127)","rgba(34,167,230,127)","rgba(244,251,243,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,242,223,127)","rgba(239,49,124,127)","rgba(237,33,113,127)","rgba(255,255,255,127)","rgba(161,160,160,127)"],["rgba(167,166,166,127)","rgba(255,255,255,127)","rgba(8,144,213,127)","rgba(0,156,220,127)","rgba(34,167,230,127)","rgba(244,251,243,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(241,78,143,127)","rgba(237,35,113,127)","rgba(255,255,255,127)","rgba(164,163,163,127)"],["rgba(167,166,166,127)","rgba(255,255,255,127)","rgba(10,142,213,127)","rgba(0,156,220,127)","rgba(0,154,226,127)","rgba(89,201,75,127)","rgba(89,201,75,127)","rgba(89,201,75,127)","rgba(255,170,34,127)","rgba(255,249,238,127)","rgba(255,255,255,127)","rgba(254,217,159,127)","rgba(238,34,115,127)","rgba(237,36,114,127)","rgba(255,255,255,127)","rgba(164,163,163,127)"],["rgba(167,166,166,127)","rgba(255,255,255,127)","rgba(0,133,208,127)","rgba(0,156,220,127)","rgba(0,154,226,127)","rgba(89,201,75,127)","rgba(89,201,75,127)","rgba(89,201,75,127)","rgba(255,235,204,127)","rgba(255,255,255,127)","rgba(255,236,207,127)","rgba(253,159,14,127)","rgba(238,34,115,127)","rgba(237,33,112,127)","rgba(255,255,255,127)","rgba(164,163,163,127)"],["rgba(167,166,166,127)","rgba(255,255,255,127)","rgba(0,130,206,127)","rgba(0,156,220,127)","rgba(0,154,226,127)","rgba(89,201,75,127)","rgba(89,201,75,127)","rgba(189,233,183,127)","rgba(255,255,255,127)","rgba(255,249,238,127)","rgba(253,172,46,127)","rgba(253,159,14,127)","rgba(238,34,115,127)","rgba(237,33,112,127)","rgba(255,255,255,127)","rgba(164,163,163,127)"],["rgba(167,166,166,127)","rgba(255,255,255,127)","rgba(0,131,206,127)","rgba(0,154,219,127)","rgba(0,154,226,127)","rgba(89,201,75,127)","rgba(155,223,147,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,203,102,127)","rgba(253,159,14,127)","rgba(253,159,14,127)","rgba(238,34,115,127)","rgba(237,33,112,127)","rgba(255,255,255,127)","rgba(164,163,163,127)"],["rgba(167,166,166,127)","rgba(255,255,255,127)","rgba(10,139,211,127)","rgba(0,151,217,127)","rgba(0,154,226,127)","rgba(111,208,99,127)","rgba(244,251,243,127)","rgba(255,255,255,127)","rgba(255,222,170,127)","rgba(255,168,0,127)","rgba(253,159,14,127)","rgba(253,159,14,127)","rgba(238,34,115,127)","rgba(237,36,114,127)","rgba(255,255,255,127)","rgba(164,163,163,127)"],["rgba(167,166,166,127)","rgba(255,255,255,127)","rgba(10,142,213,127)","rgba(0,147,216,127)","rgba(0,154,226,127)","rgba(222,244,219,127)","rgba(255,255,255,127)","rgba(233,248,231,127)","rgba(255,164,17,127)","rgba(255,168,0,127)","rgba(253,159,14,127)","rgba(253,159,14,127)","rgba(238,34,115,127)","rgba(237,36,114,127)","rgba(255,255,255,127)","rgba(164,163,163,127)"],["rgba(167,166,166,127)","rgba(255,255,255,127)","rgba(10,145,214,127)","rgba(0,145,215,127)","rgba(102,194,238,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(244,108,162,127)","rgba(237,36,114,127)","rgba(255,255,255,127)","rgba(164,163,163,127)"],["rgba(167,166,166,127)","rgba(255,255,255,127)","rgba(8,145,213,127)","rgba(0,147,216,127)","rgba(68,179,233,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(244,108,162,127)","rgba(237,35,113,127)","rgba(255,255,255,127)","rgba(164,163,163,127)"],["rgba(167,166,166,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(0,150,217,127)","rgba(0,147,223,127)","rgba(86,199,73,127)","rgba(86,199,73,127)","rgba(86,199,73,127)","rgba(255,154,0,127)","rgba(255,165,0,127)","rgba(253,156,13,127)","rgba(253,159,14,127)","rgba(237,33,112,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(164,163,163,127)"],["rgba(255,255,255,0)","rgba(159,158,158,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(255,255,255,127)","rgba(178,177,177,127)","rgba(255,255,255,0)"],["rgba(255,255,255,0)","rgba(255,255,255,0)","rgba(165,164,164,127)","rgba(166,165,165,127)","rgba(162,161,161,127)","rgba(156,155,155,127)","rgba(166,165,165,127)","rgba(166,165,165,127)","rgba(166,165,165,127)","rgba(167,166,166,127)","rgba(167,166,166,127)","rgba(166,165,165,127)","rgba(167,166,166,127)","rgba(166,165,165,127)","rgba(255,255,255,0)","rgba(255,255,255,0)"]]
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
			
			ctx.fillStyle = "#ff3c3c";
			ctx.strokeStyle = "#ff0000";
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
					
					ctx.fillStyle = "#ffffff";
					
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
		return self.getSearchText();
	}
	this.getUnreadCountIcon = function() {
		var unread = self.getUnreadCount();		
		return self.drawUnreadCount(unread).toDataURL('image/png');
	}
	this.getSearchText = function() {
		var element = document.getElementById("ntcounter-mid");
		var parent = document.getElementById("ntcounter");
		if (!parent || parent.style.display == "none")
		{
			return '';
		}
		
		return element ? element.textContent : '';
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
	
	this.toString = function() { return '[object ZingMeFaviconAlerts]'; }
	
	return this.construct();
}