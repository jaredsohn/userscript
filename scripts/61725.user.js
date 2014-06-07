// ==UserScript==
// @name           Twitter Favicon Alerts
// @description    Alerts you to the number of unread tweets in twitter.
// @version        0.9.2
// @date           2009-12-27
// @author         Eugene Smarty
// @namespace      http://i-smarty.com
// @namespace      Originally based on GReader FavIcon Alerts by Tyler Sticka & Peter Wooley (http://peterwooley.com)
// @include        http://twitter.com
// @include        http://twitter.com*
// @include        https://twitter.com
// @include        https://twitter.com*
// ==/UserScript==

if(!GM_xmlhttpRequest)
	return alert('Twitter Favicon Alerts requires Ajax support in Greasemonkey,\nplease upgrade to the latest version.');

// Wait for the window to load to try and initialize
window.addEventListener('load', function() {
	  new TwitterFavIconAlerts;
	}, true);


function TwitterFavIconAlerts() {
	var self = this;
	
	this.construct = function() {
		this.head = document.getElementsByTagName("head")[0];
		this.pixelMaps = {
			icons: {
				'unread':
					[    
['', '', '', '#d8d8d6', '#ece8e7', '#ebe9e8', '', '', '', '', '', '', '', '', '', ''],
['', '', '#eeecec', '#ffffff', '#dff7ff', '#e4f9ff', '#ffffff', '', '', '', '', '', '', '', '', ''],
['', '', '#fefdfc', '#c7efff', '#73d4fc', '#7bd6fc', '#dbf6ff', '#f8f4f2', '#858585', '', '#d4d4d4', '#bfbfbf', '', '', '', ''],
['', '', '#fafafa', '#a5e5ff', '#69d1fc', '#6ad1fc', '#b9eafe', '#fffefc', '#f3efee', '#f9f6f5', '#f6f3f3', '#efedec', '#d9d7d7', '#898989', '', ''],
['', '', '#faf9f9', '#a7e6ff', '#6cd2fc', '#6ed3fc', '#a8e4fc', '#e1f6ff', '#e1f8ff', '#dff6ff', '#def6ff', '#ecfbff', '#ffffff', '#d4d2d2', '#404040', ''],
['', '', '#faf9f9', '#a7e6ff', '#6dd2fc', '#73d4fc', '#75d5fc', '#78d6fc', '#78d6fc', '#78d6fc', '#76d5fc', '#7dd7fc', '#d0f3ff', '#fcf9f8', '#868686', ''],
['', '', '#faf9f9', '#a7e6ff', '#6dd2fc', '#73d4fc', '#71d4fc', '#6ed3fc', '#6ed3fc', '#6ed3fc', '#6ed3fc', '#64cffc', '#a5e5ff', '#fdfcfc', '#979797', ''],
['', '', '#faf9f9', '#a7e6ff', '#6dd2fc', '#72d4fc', '#79d6fc', '#80d8fc', '#7fd8fc', '#7fd8fc', '#7dd7fc', '#85dafd', '#d8f6ff', '#faf7f6', '#707070', ''],
['', '', '#faf9f9', '#a7e6ff', '#6cd2fc', '#6ed3fc', '#aee7fd', '#effafe', '#ebf8fe', '#eaf8fe', '#eaf8fe', '#f3fcff', '#faf9f9', '#a3a1a1', '#171717', ''],
['', '', '#f9f9f9', '#a6e6ff', '#6cd2fc', '#6dd2fc', '#b9eafd', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#c2c0c0', '#373737', '', ''],
['', '', '#fcfafa', '#afe8ff', '#6cd2fc', '#6ed3fc', '#91ddfd', '#e7f7ff', '#f8fdff', '#f6fcff', '#f6fcff', '#f9fdff', '#fcfaf9', '#c5c5c5', '', ''],
['', '', '#fdf9f8', '#d6f4ff', '#72d3fc', '#70d3fc', '#71d3fc', '#80d8fd', '#8cdcfd', '#8bdcfd', '#89dbfd', '#92ddfd', '#dff8ff', '#fcf9f9', '', ''],
['', '', '', '#ffffff', '#abe6fe', '#6cd2fc', '#6ed3fc', '#6ed3fc', '#6dd2fc', '#6dd2fc', '#6dd2fc', '#64d0fc', '#a7e5ff', '#fdfcfb', '', ''],
['', '', '', '#ececeb', '#fdffff', '#b8ebff', '#81d8fd', '#73d4fc', '#73d4fc', '#73d4fc', '#71d4fc', '#75d5fc', '#c8f0ff', '#fffcfa', '', ''],
['', '', '', '', '#e1dede', '#ffffff', '#f2feff', '#d9f6ff', '#d3f3ff', '#d4f3ff', '#d3f3ff', '#e1f8ff', '#ffffff', '', '', ''],
['', '', '', '', '', '', '', '#e6e2e1', '#f3efed', '#f3efed', '#f4f0ef', '#e5e2e1', '', '', '', ''],
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
        var img = new Image();
        img.src = 'http://a1.twimg.com/a/1257899144/images/favicon.ico';
		return img.src;
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
		matches = self.getSearchText().match(/\((.[\d,]{0,})\)/);
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
	
	this.toString = function() { return '[object TwitterFavIconAlerts]'; }
	
	return this.construct();
}