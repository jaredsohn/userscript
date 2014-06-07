// ==UserScript==
// @name           Netvibes Unread
// @namespace      http://clement.beffa.org/labs/projects/greasemonkey/
// @include        http://www.netvibes.com/*
// ==/UserScript==

window.addEventListener('load', function() {
	  new NetvibesFavIconAlerts;
	}, true);


function NetvibesFavIconAlerts() {
	var self = this;
	
	this.construct = function() {
		this.head = document.getElementsByTagName("head")[0];
		this.pixelMaps = {
			icons: {
				'unread':
					[
						['','','','#b9dd93','#b9dd93','#b9dd93','#b9dd93','#b9dd93','#b4d98d','#add484','#a5ce7c','#a0ca75','#a0c973','','',''],
						['','','#acd383','#e0fbd9','#e3fde0','#e6ffe5','#e4fde0','#dffbd9', '#daf7d1', '#d5f4c7','#cff0bd','#caebb3','#c3e7a8','#acd383','',''],
						['','','a0c973','#defad7','#e2fcde','#cd6b6b','#cd6b6b','#cd6b6b','#cd6b6b','#cd6b6b','#cd6b6b','#cd6b6b','#cd6b6b','#cd6b6b','#cd6b6b',''],
						['','','#9fc974','#dbf7d2','#cd6b6b','#f9eded','#fcf6f6','#fcf6f6','#f8ecec','#f7e7e7','#f5e3e3','#f3dddd','#efd1d1','#eecece','#e6b6b6','#cd6b6b'],
						['','#2a5699','#2a5699','#2a5699','#2a5699','#2a5699','#2a5699','#2a5699','#2a5699','#2a5699','#2a5699','#b9a1a1','#ebc3c3','#e6b6b6','#eac0c0','#cd6b6b'],
						['#2a5699','#a4bdec','#c1d3f5','#c1d3f5','#9bb8f2','#90b0ef','#86a8ed','#7da0e4','#6a93db','#5b88e6','#4c7eca','#2a5699','#ebc3c3','#e8bcbc','#e4b2b2','#cd6b6b'],
						['#2a5699','#b6cbf2','#ffffff','#ffffff','#ffffff','#c9d7f2','#7099ee','#5885e4','#5381d9','#4c7eca','#4f7dd8','#2a5699','#beb2b2','#e4b2b2','#e8bcbc','#cd6b6b'],
						['#2a5699','#abc3f5','#e4eaf5','#ffffff','#ffffff','#ffffff','#ffffff','#90b0ef','#5381d9','#4676da','#467aca','#2a5699','#c5c5c5','#edc9c9','#e2aaaa','#cd6b6b'],
						['#2a5699','#90b0ef','#638ee9','#638ee9','#9bb8f2','#edf0f6','#ffffff','#ffffff','#90ade4','#467aca','#4676da','#2a5699','#c5c5c5','#fbf3f3','#dfa3a3','#cd6b6b'],
						['#2a5699','#a4bdec','#ffffff','#ffffff','#c1d3f5','#7499e5','#c1d3f5','#ffffff','#ffffff','#608bd7','#3c74ca','#2a5699','#c5c5c5','#ffffff','#dc9898','#cd6b6b'],
						['#2a5699','#9bb8f2','#ffffff','#ffffff','#ffffff','#e4eaf5','#638ee9','#edf0f6','#ffffff','#b6cbf2','#336cc9','#2a5699','#c5c5c5','#ffffff','#e7b9b9','#cd6b6b'],
						['#2a5699','#6a93db','#5381d9','#7da0e4','#f4f7fc','#ffffff','#b6cbf2','#90ade4','#ffffff','#ffffff','#2d69c3','#2a5699','#c5c5c5','#ffffff','#e6b6b6','#cd6b6b'],
						['#2a5699','#84a5e7','#ffffff','#90ade4','#7499e5','#ffffff','#f4f7fc','#3c74ca','#ffffff','#ffffff','#5683c6','#2a5699','#b28f8f','#e6b6b6','#d27c7c','#cd6b6b'],
						['#2a5699','#6a93db','#ffffff','#f4f7fc','#3c74ca','#ffffff','#ffffff','#3c74ca','#d9e3f7','#ffffff','#4c7eca','#2a5699','#a25d5d','#cd6b6b','#cd6b6b',''],
						['#2a5699','#3c74ca','#608bd7','#6a93db','#3c74ca','#6892d0','#608bd7','#2b65c2','#467aca','#4c7eca','#235daf','#2a5699','','','',''],
						['','#2a5699','#2a5699','#2a5699','#2a5699','#2a5699','#2a5699','#2a5699','#2a5699','#2a5699','#2a5699','','','','',''],
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
	
	this.toString = function() { return '[object NetvibesFavIconAlerts]'; }
	
	return this.construct();
}