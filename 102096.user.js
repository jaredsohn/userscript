// ==UserScript==
// @name           Plurk Favicon Alerts
// @description    Alerts you to the number of unread items in Plurk.
// @version        1
// @date           2011-05-01
// @author         Pulipuli Chen
// @namespace      http://pulipuli.blogspot.com/
// @include        http://www.plurk.com/*
// @exclude        http://www.plurk.com/p/*
// @exclude        http://www.plurk.com/*/*
// ==/UserScript==

var _fill_color = "#BCDB93";
var _stroke_color = "#95BF52";
var _font_color = "#3B3B46";
var _poll_interval = 1000;	//ms

//---------------------

if(typeof GM_getValue == 'undefined') {
	function GM_getValue(name, fallback) {
		return fallback;
	}
}

(function GReaderFaviconAlerts() {
	var self = this;
	
	this.construct = function() {
		this.head = document.getElementsByTagName("head")[0];
		this.icons = {
			current: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEWqRg/PaC/Zn4DckGblrpDsw6z///97JB97AAAAL0lEQVQI12NggAEmJTAQYGASBAMURhoQJKIyDAXNCDIwdYW4uDhC1YBMZoQxYAAAG/oTRpojb3EAAAAASUVORK5CYII%3D'
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
		
		this.timer = setInterval(this.poll, _poll_interval);
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
				
				//ctx.fillStyle = "#fef4ac";
				//ctx.strokeStyle = "#dabc5c";
				ctx.fillStyle = _fill_color;
				ctx.strokeStyle = _stroke_color;
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
				
				var bgPadding = 0;
				if (count == 1)
					bgPadding = 4;
				
				ctx.fillRect(textedCanvas.width-bgWidth-4-bgPadding,topMargin,bgWidth+4+bgPadding,bgHeight+4);
				
				var digit;
				var digitsWidth = bgWidth;
				for(var index = 0; index < count; index++) {
					digit = unread[index];
					
					if (self.pixelMaps.numbers[digit]) {
						var map = self.pixelMaps.numbers[digit];
						var height = map.length;
						var width = map[0].length;
						
						ctx.fillStyle = _font_color;
						
						for (var y = 0; y < height; y++) {
							for (var x = 0; x < width; x++) {
								if(map[y][x]) {
									ctx.fillRect(14- digitsWidth + x -(bgPadding/2), y+topMargin+2, 1, 1);
								}
							}
						}
						
						digitsWidth -= width + padding;
					}
				}	
				
				ctx.strokeRect(textedCanvas.width-bgWidth-3.5-bgPadding,topMargin+.5,bgWidth+3+bgPadding,bgHeight+3);
				
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
			
			if(GM_getValue('originalFavicon', false)) {
				img.src = self.icons.original;
			} else {
				img.src = self.icons.current;
			}
		} else {
			callback(self.unreadCanvas);
		}
	}
	this.getUnreadCount = function() {
		//matches = self.getSearchText().match(/\((.*)\)/);
		var matches = false;
		
		var _title = document.title;
    	
		var _blank_pos = _title.indexOf(" ");
		if (_blank_pos == -1)
			return 0;
		
		var _head = _title.substr(0, _blank_pos);
		var _number = parseInt(_head);
		if (isNaN(_number))
			_number = 0;
		
		//_number = 9009;
		
		if (_number > 0)
		{
			if (_number < 1000)
				_number = _number + "";
			else
			{
				var _n = (_number + '').substr(0, 1);
				_number = _n + 'k+';
			}
			
			matches = [0, _number];
		}
		
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
	
	this.toString = function() { return '[object GReaderFaviconAlerts]'; }
	
	return this.construct();
}());