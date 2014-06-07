// ==UserScript==
// @name           GWave Favicon Alerts
// @description    Alerts you to the number of unread items in Google Wave.
// @version        1.1
// @date           2009-11-25
// @author         Peter Wooley
// @namespace      http://peterwooley.com
// @include        http*://wave.google.com/*
// ==/UserScript==

// Wait for the window to load to try and initialize
window.addEventListener('load', function() {
	  new GWaveFaviconAlerts;
	}, true);


function GWaveFaviconAlerts() {
	var self = this;
	
	this.construct = function() {
		this.head = document.getElementsByTagName("head")[0];
		this.pixelMaps = {
			icons: {
				'unread': [["rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)"],["rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)"],["rgba(0, 96, 192, 1)","rgba(0, 102, 204, 0.748031496063)","rgba(0, 102, 204, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 64, 64, 0.748031496063)","rgba(255, 170, 0, 1)","rgba(255, 170, 0, 1)","rgba(255, 170, 0, 0.748031496063)","rgba(255, 170, 0, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(0, 153, 57, 0.748031496063)","rgba(0, 144, 53, 1)"],["rgba(0, 102, 204, 1)","rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.748031496063)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 64, 64, 0.748031496063)","rgba(255, 64, 64, 1)","rgba(255, 64, 64, 1)","rgba(255, 170, 0, 1)","rgba(255, 170, 0, 1)","rgba(255, 170, 0, 0.748031496063)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(0, 153, 57, 0.748031496063)","rgba(0, 153, 57, 1)","rgba(0, 153, 57, 1)"],["rgba(0, 102, 204, 0.503937007874)","rgba(0, 102, 204, 1)","rgba(0, 102, 204, 1)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 64, 64, 1)","rgba(255, 64, 64, 1)","rgba(255, 64, 64, 0.503937007874)","rgba(255, 170, 0, 0.503937007874)","rgba(255, 170, 0, 1)","rgba(255, 170, 0, 1)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(0, 153, 57, 1)","rgba(0, 153, 57, 1)","rgba(0, 153, 57, 0.503937007874)"],["rgba(0, 102, 204, 0)","rgba(0, 102, 204, 1)","rgba(0, 102, 204, 1)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 64, 64, 1)","rgba(255, 64, 64, 1)","rgba(255, 64, 64, 0)","rgba(255, 170, 0, 0)","rgba(255, 170, 0, 1)","rgba(255, 170, 0, 1)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(0, 153, 57, 1)","rgba(0, 153, 57, 1)","rgba(0, 153, 57, 0)"],["rgba(0, 102, 204, 0)","rgba(0, 102, 204, 1)","rgba(0, 102, 204, 1)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 64, 64, 1)","rgba(255, 64, 64, 1)","rgba(255, 64, 64, 0)","rgba(255, 170, 0, 0)","rgba(255, 170, 0, 1)","rgba(255, 170, 0, 1)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(0, 153, 57, 1)","rgba(0, 153, 57, 1)","rgba(0, 153, 57, 0)"],["rgba(255, 255, 255, 0)","rgba(0, 102, 204, 1)","rgba(0, 102, 204, 1)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 64, 64, 1)","rgba(255, 64, 64, 1)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 170, 0, 1)","rgba(255, 170, 0, 1)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(0, 153, 57, 1)","rgba(0, 153, 57, 1)","rgba(255, 255, 255, 0)"],["rgba(255, 255, 255, 0)","rgba(0, 102, 204, 1)","rgba(0, 102, 204, 1)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 64, 64, 1)","rgba(255, 64, 64, 1)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 170, 0, 1)","rgba(255, 170, 0, 1)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(0, 153, 57, 1)","rgba(0, 153, 57, 1)","rgba(255, 255, 255, 0)"],["rgba(255, 255, 255, 0)","rgba(0, 102, 204, 1)","rgba(0, 102, 204, 1)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 64, 64, 1)","rgba(255, 64, 64, 1)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 170, 0, 1)","rgba(255, 170, 0, 1)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(0, 153, 57, 1)","rgba(0, 153, 57, 1)","rgba(255, 255, 255, 0)"],["rgba(255, 255, 255, 0)","rgba(0, 102, 204, 1)","rgba(0, 102, 204, 1)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 64, 64, 1)","rgba(255, 64, 64, 1)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 170, 0, 1)","rgba(255, 170, 0, 1)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(0, 153, 57, 1)","rgba(0, 153, 57, 1)","rgba(255, 255, 255, 0)"],["rgba(255, 255, 255, 0)","rgba(0, 102, 204, 1)","rgba(0, 102, 204, 1)","rgba(0, 102, 204, 0.503937007874)","rgba(255, 64, 64, 0.503937007874)","rgba(255, 64, 64, 1)","rgba(255, 64, 64, 1)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 170, 0, 1)","rgba(255, 170, 0, 1)","rgba(255, 170, 0, 0.503937007874)","rgba(0, 153, 57, 0.503937007874)","rgba(0, 153, 57, 1)","rgba(0, 153, 57, 1)","rgba(255, 255, 255, 0)"],["rgba(255, 255, 255, 0)","rgba(0, 102, 204, 0.748031496063)","rgba(0, 102, 204, 1)","rgba(0, 102, 204, 1)","rgba(255, 64, 64, 1)","rgba(255, 64, 64, 1)","rgba(255, 64, 64, 0.748031496063)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 170, 0, 0.748031496063)","rgba(255, 170, 0, 1)","rgba(255, 170, 0, 1)","rgba(0, 153, 57, 1)","rgba(0, 153, 57, 1)","rgba(0, 153, 57, 0.748031496063)","rgba(255, 255, 255, 0)"],["rgba(255, 255, 255, 0)","rgba(0, 102, 204, 0)","rgba(0, 102, 204, 0.748031496063)","rgba(255, 64, 64, 1)","rgba(255, 64, 64, 1)","rgba(255, 64, 64, 0.748031496063)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 170, 0, 0)","rgba(255, 170, 0, 0.748031496063)","rgba(0, 153, 57, 1)","rgba(0, 153, 57, 1)","rgba(0, 153, 57, 0.748031496063)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)"],["rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)"],["rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)"]]
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
		matches = self.getSearchText().match(/\((.*)\)/);
		
		return matches && matches[1] > 0 ? matches[1] : false;
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
	
	this.toString = function() { return '[object GWaveFaviconAlerts]'; }
	
	return this.construct();
}