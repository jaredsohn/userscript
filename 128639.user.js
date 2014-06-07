// ==UserScript==
// @name           Roundcube Favicon Alerts
// @namespace      http://spaps.de
// @description    Alerts you to the number of unread inbox mails in Roundcube.
// @version        1.0
// @date           2012-03-18
// @author         Fabian Otto (Original by Peter Wooley http://peterwooley.com)
// @include        <your url to roundcube webmailer root>
// ==/UserScript==

if(typeof GM_getValue == 'undefined') {
	function GM_getValue(name, fallback) {
		return fallback;
	}
}


(function RoundcubeFaviconAlerts() {
	var self = this;
	
	this.construct = function() {
		this.head = document.getElementsByTagName("head")[0];
		this.icons = {
			current: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFdSURBVHjaxFM7TsNAFJz4lwQ6EL+URBEgIWSRCxgBQaLgAIiGjpaGI9DSIyTEARASRRoKfAGjdCiizw0gidcbs7OLY7kAglLwpPHTzpt5u14/l9I0xTRhYcpwriM8uzaCsg1UHQXX5LKC4nUICQwToE8Ik4dS86EjpQwAG6f+33ZWG4NeK0kSbK8YYpROBmrpodcSQmBrCfCXgZsXRY5+BjXU0kOvbsDC5qIhL9u9b82sUUMt17pBHMcQXChsLAD7fg3nt9GYy0CONWoyjl5Hn0Dml/PU6eHkoImLu6hwaeRYW9+tjTl6newEjMcucLZjBMetZqFBY15B1e5fgaM1w+UnUA3ab8Bhw7wboz5X/GwZTw03YtYn4IPmVj0X/RbU0qMvkd9yb3XyGchAD72cxPDqoRNUPBszan5nK67OVc+B9zXLsZrZfpzgQ83z+0DoPIglJzEs/fvf+CnAAAH6AZJ7yOcnAAAAAElFTkSuQmCC'
		};
		this.pixelMaps = {
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
	
	this.drawUnreadCount = function(unread, callback) {
		if(!self.textedCanvas) {
			self.textedCanvas = [];
		}
		
		if(!self.textedCanvas[unread]) {
			self.getUnreadCanvas(function(iconCanvas) {
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
				
				callback(self.textedCanvas[unread]);
			});
		}
		
		callback(self.textedCanvas[unread]);
	}
	this.getIcon = function(callback) {
		self.getUnreadCanvas(function(canvas) {
			callback(canvas.toDataURL('image/png'));
		});
	}	
	this.getUnreadCanvas = function(callback) {
		if(!self.unreadCanvas) {
			self.unreadCanvas = document.createElement('canvas');
			self.unreadCanvas.height = self.unreadCanvas.width = 16;
			
			var ctx = self.unreadCanvas.getContext('2d');
			var img = new Image();
			
			img.addEventListener("load", function() {
				ctx.drawImage(img, 0, 0);
				callback(self.unreadCanvas);
			}, true);
			
			img.src = self.icons.current;
	
		} else {
			callback(self.unreadCanvas);
		}
	}
	this.getUnreadCount = function() {
		//matches = self.getSearchText().match(/\((.*)\)/);
		matches = document.getElementsByClassName('mailbox inbox selected unread')[0].firstChild.innerHTML.match(/\((.*)\)/);
		//console.info(matches)
		return matches ? matches[1] : false;
	}
	this.getUnreadCountIcon = function(callback) {
		var unread = self.getUnreadCount();		
		self.drawUnreadCount(unread, function(icon) {
			callback(icon.toDataURL('image/png'));
		});
	}
	this.getSearchText = function() {
		return document.title;
	}
	this.poll = function() {
		if(self.getUnreadCount()) {
			self.getUnreadCountIcon(function(icon) {
				self.setIcon(icon);
			});
		} else {
			self.getIcon(function(icon) {
				self.setIcon(icon);
			});
		}
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
		
		// Chrome hack for updating the favicon
		var shim = document.createElement('iframe');
		shim.width = shim.height = 0;
		document.body.appendChild(shim);
		shim.src = "icon";
		document.body.removeChild(shim);
	}
	
	this.toString = function() { return '[object RoundcubeFaviconAlerts]'; }
	
	return this.construct();
}());