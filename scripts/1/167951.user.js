// ==UserScript==
// @name        InoReader Favicon Alerts for Unseen Items
// @namespace   Based on GReader FavIcon Alerts by Peter Wooley (http://peterwooley.com)
// @namespace   http://ittahelye.hu, http://peterwooley.com
// @author      Zoltan Wacha
// @description Displays the number of unseen item count in the favicon
// @include     https://*.inoreader.com/
// @include     http://*.inoreader.com/
// @version     1.2
// ==/UserScript==

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
			original: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACkUlEQVQ4jX2SzWsTYRDGf9nsJmk2CZvUYoutDVrFL9r04LWt6MVTeyp4MgqCf4GHnnLyLAiiIjaC3jx4UKwFodCKCtK0qCAaZVOrVZOmaT6aj82+r4dNvxQdeJiZd5iHmWde1+kb05PCr8VF2A+2ACEdb7d8czPf8WZLFAUUVUmqwq/FGye6AMCyHTR2oG5Do+nEwgYBWAIaNh5djasi7Aegx5JcOdYLQvKpWCWVLTK7vMr/TFgCdTPRNiwGQzoAg0aA8f0drBzp5u77rzz9uPJPEnf03KWECPlwFev8XCnyo1LHp7kxfB6CHpWhfRH6wgFeL+dpNOyWDg4Utwtlk0mGvIQORMjrKlcXTUanUiyslgAY6mnn+tkBAh71rwmU9brlBJ/zXOzu4GLvXm4PH+fm0DGuf1jmfuYXAIfag0ycOrqreb1m4V49M57IBj3sqzTpDvjA5cLwaQQ1ldH9HTxeypKxLPpDOr1hna9rFV6ms6S/F/hRqjorVITglRcSKznG5t4z8mwes1IDYKI/ytxynoW1MgDnTx4gnS1SaTRb6t+akr0PX8i1ck1uWipfksOzb2VqvSyllHKt2pCjU/Nb9dEbzyUX7kjt8qRUAMZsFUP3YharFOoWsXCA5MBBEosmAIZPwxBgFjcAGDncuS0iAB43AAUEY28+UrCaRINtRN0qC7mi09QZZiaTAyDWHdlN8GjDYY6FdK4dj27ta2huClXnSlFDx8yV/zqjCpCJeIkvpEnG+ogZ+lbRLNVILn1h5t03R1RbkHiyiJktbRMo+Q3o28O9XAFzOkW8q51om5eZQpl7n75DrQk1q+V3AFC8blxtVx5MinBbXET8zhett87TFDtg/5ELFMWFoinJ38zVVBjRjdahAAAAAElFTkSuQmCC'
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
			
			img.src = self.icons.original;
		} else {
			callback(self.unreadCanvas);
		}
	}
	this.getUnreadCount = function() {
	    var itemcount = document.getElementById('total_unseen_cnt').innerHTML;
	    
	    if (itemcount != null && itemcount != '0') {
	        return itemcount;
	    }
	    else {
	        return null;
	    }
	}
	this.getUnreadCountIcon = function(callback) {
		var unread = self.getUnreadCount();		
		self.drawUnreadCount(unread, function(icon) {
			callback(icon.toDataURL('image/png'));
		});
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