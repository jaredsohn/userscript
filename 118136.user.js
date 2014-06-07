// ==UserScript==
// @name           Yammer Favicon Alerts
// @description    Alerts you to the number of unread items in Yammer.
// @version        0.1
// @date           2011-11-15
// @author         Valentin Alexeev
// @namespace      Based on Twitter Favicon Alerts by Eugene Smarty
// @namespace      Originally based on GReader FavIcon Alerts by Tyler Sticka & Peter Wooley (http://peterwooley.com)
// @include        http://yammer.com
// @include        http://yammer.com*
// @include        https://yammer.com
// @include        https://yammer.com*
// @include        http://www.yammer.com
// @include        http://www.yammer.com*
// @include        https://www.yammer.com
// @include        https://www.yammer.com*
// ==/UserScript==

if(!GM_xmlhttpRequest)
	return alert('Yammer Favicon Alerts requires Ajax support in Greasemonkey,\nplease upgrade to the latest version.');

// Wait for the window to load to try and initialize
window.addEventListener('load', function() {
	  new YammerFavIconAlerts;
	}, true);


function YammerFavIconAlerts() {
	var self = this;
	
	this.construct = function() {
        var cl = '#0082a6';
		this.head = document.getElementsByTagName("head")[0];
		this.pixelMaps = {
			icons: {
	'unread':
[
['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],//00*
['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],//01*
['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],//02*
['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],//03*
['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],//04*

['','','','','',cl,cl,cl,cl,'','','','','','','',cl,cl,'','','','','','','','','','','','','',''],//05*
['','','','','',cl,cl,cl,cl,'','','','','','',cl,cl,cl,cl,'','','','','','','','','','','','',''],//06*
['','','','','',cl,cl,cl,cl,cl,'','','','','',cl,cl,cl,cl,'','','','','',cl,'','','','','','',''],//07*
['','','','','',cl,cl,cl,cl,cl,'','','','',cl,cl,cl,cl,cl,'','','',cl,cl,cl,cl,'','','','','',''],//08*
['','','','','','',cl,cl,cl,cl,cl,'','','',cl,cl,cl,cl,'','','',cl,cl,cl,cl,cl,'','','','','',''],//09
['','','','','','','',cl,cl,cl,cl,'','','',cl,cl,cl,cl,'',cl,cl,cl,cl,cl,cl,cl,'','','','','',''],//10
['','','','','','','',cl,cl,cl,cl,'','',cl,cl,cl,cl,'',cl,cl,cl,cl,cl,cl,'','','','','','','',''],//11
['','','','','','','',cl,cl,cl,cl,cl,'',cl,cl,cl,cl,'',cl,cl,cl,cl,'','','','','','','','','',''],//12
['','','','','','','','',cl,cl,cl,cl,'',cl,cl,cl,'','',cl,'','','','','','','','','','','','',''],//13
['','','','','','','','',cl,cl,cl,cl,cl,cl,cl,cl,'','','','',cl,cl,cl,cl,cl,cl,cl,cl,'','','',''],//14
['','','','','','','','',cl,cl,cl,cl,cl,cl,cl,cl,'','','',cl,cl,cl,cl,cl,cl,cl,cl,cl,'','','',''],//15
['','','','','','','','','',cl,cl,cl,cl,cl,cl,'','','','','',cl,cl,cl,cl,cl,cl,cl,cl,'','','',''],//16
['','','','','','','','','',cl,cl,cl,cl,cl,cl,'','','',cl,cl,'','','','','','','','','','','',''],//17
['','','','','','','','','','',cl,cl,cl,cl,'','','','',cl,cl,cl,cl,'','','','','','','','','',''],//18
['','','','','','','','','','',cl,cl,cl,cl,'','','','',cl,cl,cl,cl,cl,cl,'','','','','','','',''],//19
['','','','','','','','','','',cl,cl,cl,cl,'','','','','','',cl,cl,cl,cl,cl,cl,'','','','','',''],//20
['','','','','','','','','',cl,cl,cl,cl,'','','','','','','','',cl,cl,cl,cl,cl,'','','','','',''],//21
['','','','','',cl,cl,cl,cl,cl,cl,cl,cl,'','','','','','','','','',cl,cl,cl,cl,'','','','','',''],//22
['','','','','',cl,cl,cl,cl,cl,cl,cl,'','','','','','','','','','','','','','','','','','','',''],//23
['','','','','',cl,cl,cl,cl,cl,cl,cl,'','','','','','','','','','','','','','','','','','','',''],//24

['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],//25
['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],//26
['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],//27
['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],//28
['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],//29
['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''],//30
['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','']//31
]
	},
			numbers: {
				0: [
                    [1,1,1,1,1,1],
                    [1,1,1,1,1,1],
    				[1,1,0,0,1,1],
    				[1,1,0,0,1,1],
    				[1,1,0,0,1,1],
    				[1,1,0,0,1,1],
    				[1,1,0,0,1,1],
    				[1,1,0,0,1,1],
                    [1,1,1,1,1,1],
                    [1,1,1,1,1,1]
				],
				1: [
                    [0,0,1,1,0,0],
                    [0,0,1,1,0,0],
                    [1,1,1,1,0,0],
                    [1,1,1,1,0,0],
                    [0,0,1,1,0,0],
                    [0,0,1,1,0,0],
                    [0,0,1,1,0,0],
                    [0,0,1,1,0,0],
                    [1,1,1,1,1,1],
                    [1,1,1,1,1,1]
				],
				2: [
    				[1,1,1,1,1,1],
    				[1,1,1,1,1,1],
					[0,0,0,0,1,1],
    				[0,0,0,0,1,1],
    				[1,1,1,1,1,1],
    				[1,1,1,1,1,1],
    				[1,1,0,0,0,0],
    				[1,1,0,0,0,0],
    				[1,1,1,1,1,1],
    				[1,1,1,1,1,1]
				],
				3: [
    				[1,1,1,1,1,1],
    				[1,1,1,1,1,1],
					[0,0,0,0,1,1],
    				[0,0,0,0,1,1],
    				[0,0,1,1,1,1],
    				[0,0,1,1,1,1],
    				[0,0,0,0,1,1],
    				[0,0,0,0,1,1],
    				[1,1,1,1,1,1],
    				[1,1,1,1,1,1]
				],
				4: [
    				[0,0,0,0,1,1],
    				[0,0,0,0,1,1],
    				[0,0,1,1,1,1],
    				[0,0,1,1,1,1],
    				[1,1,0,0,1,1],
    				[1,1,0,0,1,1],
    				[1,1,1,1,1,1],
    				[1,1,1,1,1,1],
    				[0,0,0,0,1,1],
    				[0,0,0,0,1,1]
				],
				5: [
    				[1,1,1,1,1,1],
    				[1,1,1,1,1,1],
    				[1,1,0,0,0,0],
    				[1,1,0,0,0,0],
    				[1,1,1,1,1,1],
    				[1,1,1,1,1,1],
    				[0,0,0,0,1,1],
    				[0,0,0,0,1,1],
    				[1,1,1,1,1,1],
    				[1,1,1,1,1,1]
				],
				6: [
    				[0,0,1,1,1,1],
    				[0,0,1,1,1,1],
    				[1,1,0,0,0,0],
    				[1,1,0,0,0,0],
    				[1,1,1,1,1,1],
    				[1,1,1,1,1,1],
    				[1,1,0,0,1,1],
    				[1,1,0,0,1,1],
    				[1,1,1,1,1,1],
    				[1,1,1,1,1,1]
				],
				7: [
    				[1,1,1,1,1,1],
    				[1,1,1,1,1,1],
    				[0,0,0,0,1,1],
    				[0,0,0,0,1,1],
    				[0,0,0,0,1,1],
    				[0,0,0,0,1,1],
                    [0,0,1,1,0,0],
                    [0,0,1,1,0,0],
                    [0,0,1,1,0,0],
                    [0,0,1,1,0,0]
				],
				8: [
    				[1,1,1,1,1,1],
    				[1,1,1,1,1,1],
    				[1,1,0,0,1,1],
    				[1,1,0,0,1,1],
    				[1,1,1,1,1,1],
    				[1,1,1,1,1,1],
    				[1,1,0,0,1,1],
    				[1,1,0,0,1,1],
    				[1,1,1,1,1,1],
    				[1,1,1,1,1,1]
				],
				9: [
    				[1,1,1,1,1,1],
    				[1,1,1,1,1,1],
    				[1,1,0,0,1,1],
    				[1,1,0,0,1,1],
    				[1,1,1,1,1,1],
    				[1,1,1,1,1,1],
    				[1,1,0,0,1,1],
    				[1,1,0,0,1,1],
    				[1,1,1,1,0,0],
    				[1,1,1,1,0,0]
				],
				'+': [
    				[0,0,0,0,0,0],
    				[0,0,0,0,0,0],
                    [0,0,1,1,0,0],
                    [0,0,1,1,0,0],
    				[1,1,1,1,1,1],
    				[1,1,1,1,1,1],
                    [0,0,1,1,0,0],
                    [0,0,1,1,0,0],
    				[0,0,0,0,0,0],
    				[0,0,0,0,0,0]
				],
				'k': [
    				[1,1,0,0,1,1],
    				[1,1,0,0,1,1],
    				[1,1,1,1,0,0],
    				[1,1,1,1,0,0],
    				[1,1,1,1,0,0],
    				[1,1,1,1,0,0],
    				[1,1,0,0,1,1],
    				[1,1,0,0,1,1],
    				[1,1,0,0,1,1],
    				[1,1,0,0,1,1]
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
			
			var bgHeight = self.pixelMaps.numbers[1].length;
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
            var pictureOffsetX = 16 + 14;
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
								ctx.fillRect(pictureOffsetX- digitsWidth + x, y+topMargin+2, 1, 1);
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
    img.src = 'https://yammer.com/favicon.ico';
    return img.src;
}	
	this.getUnreadCanvas = function() {
		if(!self.unreadCanvas) {
			self.unreadCanvas = document.createElement('canvas');
			self.unreadCanvas.height = self.unreadCanvas.width = 32;
			
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
	
	this.toString = function() { return '[object YammerFavIconAlerts]'; }
	
	return this.construct();
};