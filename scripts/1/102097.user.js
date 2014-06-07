// ==UserScript==
// @name           GReader Folder Favicon Alerts
// @description    Alerts you to the number of unread items at this folder in Google Reader.
// @version        1
// @date           2011-05-01
// @author         Pulipuli Chen
// @namespace      http://pulipuli.blogspot.com/
// @include     	 https://*.google.com/reader/view/*
// @include     	 http://*.google.com/reader/view/*
// @include     	 htt*://*.google.*/reader/view*
// ==/UserScript==

if(typeof GM_getValue == 'undefined') {
	function GM_getValue(name, fallback) {
		return fallback;
	}
}

// Register GM Commands and Methods
if(typeof GM_registerMenuCommand !== 'undefined') {
	GM_registerMenuCommand( "GReader Folder Favicon Alerts > Use Current Favicon", function() { setOriginalFavicon(false) } );
	GM_registerMenuCommand( "GReader Folder Favicon Alerts > Use Original Favicon", function() { setOriginalFavicon(true) } );
	function setOriginalFavicon(val) { GM_setValue('originalFavicon', val) };
}

(function GReaderFaviconAlerts() {
	var self = this;
	
	this.construct = function() {
		this.head = document.getElementsByTagName("head")[0];
		this.icons = {
			current: '/reader/ui/favicon.ico',
			original: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kDFQUaAG9kAgoAAAJ/SURBVDjLlZI9TFNRGIaf29aWFoqlCBgaSSCGYOkiIYRF4qoORjAwuhhcarSrMWiI0cWEpYuERTQxBByRROMgAxoNJVGMpiQaI+VHoAXa3t7ec+89Dpe2ahz0XU5OvnOe9z3f+RQpJSU9/xKvbA4kDJ2iKKDpGsIogrS41HNfKdWVEuDp8h3Z3TGI0+HB6TiEZQmEVUQYGsJU0Q0VIVSKRp7N7RUGIjcVAFeJlFN3saSFQ1qsR+/yNzkBH9AKJIjKrnhcKQMkCqYpyMTiREZHcXq9ABiqihQCyzCwdB0jl0OaJtrGBoloVCpSSjqHxiX/oLFzVXS1tSGyWVw+H9+np3F1Do3LG1cGONZoOyZTJnnNRNUsClqBnWyBvXw1e+oqsdklXl0Fh9uNvr9PuQfBWjd9ER8AfRF4+znLk3nJxjYIw6JoruKUtQB8yGRoB1w++7wDIK85SW2p5ag9HX7Ghuvo7awGQNcCFEzb0VNfj7epCT2driRI7ejceqwDOXrDXvp7XQQPe7l2PgBmnmeLa2AEyga14TD7yWQlwRG/yUSskYlYI+0hJ/emMswv24mu9YdorvOjWrtlgKumBjOfrwAKwl0u9kV8XL8QYPJFjvReAYDB0yEK2u8fVd3aWgEsrWxycTTJyMMUec0k1OBj4JSXRy/td57p9qObOgCWadpzc7A6AJqDNcyMtFPvh9uTm+UkM6/Xyo4nmp0AZBYXWZ+bY3thoQJYS+cAuHz2KG9WUnbEKvtCclUDQBX20O4mEqzPziIyGbricUUJDz6QwZaTHG/y46ty8f5bhkiLG63o4V1yi1BDFW4XfPqawlP8wcepYeXXXvzXKP95GeAnfHEkE79k7V4AAAAASUVORK5CYII='
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
		
		this.timer = setInterval(this.poll, 1000);
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
						
						ctx.fillStyle = "#2c3323";
						
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
		var _show_new = document.getElementById("show-new");
		//alert(_show_new);
		if (_show_new != null)
		{
			var _string = _show_new.innerHTML;
			var _number  = _string.substr(0, _string.indexOf(" "));
			if (_number != "0")
			{
				matches = [0, _number];
			}
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