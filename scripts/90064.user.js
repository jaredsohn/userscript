// ==UserScript==
// @name           Twitter Favicon Alerts + NewTwitter icon fix
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
['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
['', '', '', '', '', '', '', '', '', '', '', '#8AB6C9', '#8AB6C9', '', '', ''],
['', '', '', '', '', '', '', '', '', '#70A7BF', '#1C7CA6', '#2A86AE', '', '', '', ''],
['', '', '#1A759C', '#619EB9', '', '', '', '', '', '#1D83AE', '#208EBE', '#208EBE', '#1D82AD', '', '', ''],
['', '', '#C5DFE9', '#2A8BB4', '#1C7FA9', '#287FA4', '#8AB6C9', '', '#388FB3', '#2090C0', '#2298CA', '#2197C9', '#1F8CBB', '#62A4C0', '', ''],
['', '', '', '#2C95C0', '#2091C1', '#1F8BB9', '#1D81AC', '#4697B9', '#1F8BB9', '#2197C9', '#2299CC', '#2299CC', '#2195C6', '#2B8DB6', '', ''],
['', '', '', '#D4E8F0', '#2E9BCA', '#2297CA', '#2092C2', '#208FBF', '#2194C6', '#2298CB', '#2299CC', '#2299CC', '#2298CA', '#208FBF', '#1D81AC', ''],
['', '', '', '', '#65B2D1', '#2F9DCD', '#2298CB', '#2298CA', '#2298CB', '#2299CC', '#2299CC', '#2299CC', '#2298CB', '#3CA2CD', '#57A9CB', '#8CBCD1'],
['', '', '', '', '', '#58ADD0', '#2298CA', '#2299CC', '#2299CC', '#2299CC', '#2299CC', '#2299CC', '#2197C9', '#AAD4E6', '', ''],
['#7DADC2', '', '', '', '', '#9BCADE', '#2196C8', '#2299CC', '#2299CC', '#2299CC', '#2299CC', '#2298CB', '#3C9EC9', '', '', ''],
['', '#3787AB', '#458EAE', '#5396B3', '#1B7AA3', '#1E88B6', '#2195C6', '#2299CC', '#2299CC', '#2299CC', '#2299CC', '#2E9BCA', '#D4E8F0', '', '', ''],
['', '', '#70B2CD', '#1E88B6', '#1F8DBC', '#2193C4', '#2297CA', '#2299CC', '#2299CC', '#2298CB', '#4AA8D1', '#D4E9F1', '', '', '', ''],
['', '', '', '#E2EFF6', '#8EC7E0', '#58AFD4', '#58B0D5', '#58AFD4', '#82C2DE', '#B8DBEA', '', '', '', '', '', ''],
['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
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
    img.src = 'https://twitter.com/phoenix/favicon.ico';
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