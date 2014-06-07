// ==UserScript==
// @name           Google Wave Alerts
// @author         Jemaleddin Cole
// @author         Peter Wooley
// @author         Tyler Sticka
// @namespace      http://tanglebones.com/
// @version        1.0
// @description    Alerts you to the number of unread items in Google Wave. Based on Peter Wooley and Tyler Sticka's GReader Favicon Alerts 1.0.1 and whatever came before. See here: http://userscripts.org/scripts/show/46615
// @include        https://wave.google.com/*
// ==/UserScript==

window.addEventListener('load', function() {
	  new GoogleWaveIconAlerts;
	}, true);


function GoogleWaveIconAlerts() {
	var self = this;
	
	this.construct = function() {
		this.head = document.getElementsByTagName("head")[0];
		this.pixelMaps = {
			icons: {
				'unread':
					[
						['#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff'],
						['#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff'],
						['#086DCE','#398EDE','#ffffff','#ffffff','#ffffff','#FFFFFF','#FF6D6B','#FFAA00','#FFAA00','#FFBE39','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#39B26B','#089E42'],
						['#0065CE','#0065CE','#398EDE','#FFFFFF','#FFFFFF','#FF6D6B','#FF4142','#FF4142','#FFAA00','#FFAA00','#FFBE39','#FFFFFF','#FFFFFF','#39B26B','#009A39','#009A39'], 
						['#A5CBEF','#0065CE','#0065CE','#FFFFFF','#FFFFFF','#FF4142','#FF4142','#FFBEBD','#FFE3A5','#FFAA00','#FFAA00','#FFFFFF','#FFFFFF','#009A39','#009A39','#A5DBBD'],
						['#FFFFFF','#0065CE','#0065CE','#FFFFFF','#FFFFFF','#FF4142','#FF4142','#FFFFFF','#FFFFFF','#FFAA00','#FFAA00','#FFFFFF','#FFFFFF','#009A39','#009A39','#FFFFFF'],
						['#FFFFFF','#0065CE','#0065CE','#FFFFFF','#FFFFFF','#FF4142','#FF4142','#FFFFFF','#FFFFFF','#FFAA00','#FFAA00','#FFFFFF','#FFFFFF','#009A39','#009A39','#FFFFFF'],
						['#FFFFFF','#0065CE','#0065CE','#FFFFFF','#FFFFFF','#FF4142','#FF4142','#FFFFFF','#FFFFFF','#FFAA00','#FFAA00','#FFFFFF','#FFFFFF','#009A39','#009A39','#FFFFFF'],
						['#FFFFFF','#0065CE','#0065CE','#FFFFFF','#FFFFFF','#FF4142','#FF4142','#FFFFFF','#FFFFFF','#FFAA00','#FFAA00','#FFFFFF','#FFFFFF','#009A39','#009A39','#FFFFFF'],
						['#FFFFFF','#0065CE','#0065CE','#FFFFFF','#FFFFFF','#FF4142','#FF4142','#FFFFFF','#FFFFFF','#FFAA00','#FFAA00','#FFFFFF','#FFFFFF','#009A39','#009A39','#FFFFFF'],
						['#ffffff','#0065CE','#0065CE','#FFFFFF','#FFFFFF','#FF4142','#FF4142','#FFFFFF','#FFFFFF','#FFAA00','#FFAA00','#FFFFFF','#FFFFFF','#009A39','#009A39','#FFFFFF'],
						['#FFFFFF','#0065CE','#0065CE','#A5CBEF','#bf2726','#FF4142','#FF4142','#FFFFFF','#FFFFFF','#FFAA00','#FFAA00','#FFE3A5','#A5DBBD','#009A39','#009A39','#FFFFFF'],
						['#FFFFFF','#398EDE','#0065CE','#0065CE','#FF4142','#FF4142','#FF6D6B','#FFFFFF','#FFFFFF','#FFBE39','#FFAA00','#FFAA00','#009A39','#009A39','#39B26B','#FFFFFF'],
						['#FFFFFF','#FFFFFF','#398EDE','#FF4142','#FF4142','#FF6D6B','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFBE39','#009A39','#009A39','#39B26B','#FFFFFF','#FFFFFF'],
						['#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff'],
						['#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff'] 
						
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
			
			ctx.fillStyle = "#ffffff";
			ctx.strokeStyle = "#000000";
			ctx.strokeWidth = 1;
			
			var count = unread.length;
			
			if(count > 4) {
				unread = "1k+";
				count = unread.length;
			}
			
			var bgHeight = self.pixelMaps.numbers[0].length;
			var bgWidth = 0;
			var padding = count < 4 ? 1 : 0;
			var topMargin = 6;
			
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
	
	this.toString = function() { return '[object FeverFavIconAlerts]'; }
	
	return this.construct();
}