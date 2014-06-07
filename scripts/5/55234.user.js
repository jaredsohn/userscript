// ==UserScript==
// @name           GVoice Favicon Alerts
// @description    Alerts you to the number of unread items in Google Voice.
// @version        1.0.5
// @date           2012-10-04
// @author         Peter Wooley
// @author         Ben999_
// @namespace      http://peterwooley.com
// @include        htt*://*.google.*/voice*
// @exclude		   htt*://clients*.google.*/voice*
// ==/UserScript==

// Wait for the window to load to try and initialize
window.addEventListener('load', function() {
			instance = new GVoiceFaviconAlerts;
}, true);
	
function GVoiceFaviconAlerts() {
	var self = this;
	
	this.construct = function() {
		this.head = document.getElementsByTagName("head")[0];
		this.pixelMaps = {
			icons: {
				'unread':
					[["rgba(255, 255, 255, 0)","rgba(54, 125, 232, 0.99609)","rgba(54, 125, 232, 0.99609)","rgba(54, 125, 232, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)"],["rgba(255, 255, 255, 0)","rgba(54, 125, 232, 0.99609)","rgba(54, 125, 232, 0.99609)","rgba(54, 125, 232, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)"],["rgba(255, 255, 255, 0)","rgba(54, 125, 232, 0.99609)","rgba(54, 124, 236, 0.99609)","rgba(101, 166, 242, 0.99609)","rgba(255, 250, 251, 0.99609)","rgba(104, 171, 247, 0.99609)","rgba(51, 133, 248, 0.99609)","rgba(46, 145, 248, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(47, 144, 248, 0.99609)","rgba(49, 140, 245, 0.99609)","rgba(50, 138, 241, 0.99609)","rgba(52, 130, 234, 0.99609)","rgba(50, 137, 243, 0.99609)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)"],["rgba(255, 255, 255, 0)","rgba(56, 118, 216, 0.99609)","rgba(54, 124, 230, 0.99609)","rgba(210, 237, 249, 0.99609)","rgba(255, 255, 255, 0.99609)","rgba(231, 244, 250, 0.99609)","rgba(48, 143, 245, 0.99609)","rgba(47, 144, 249, 0.99609)","rgba(46, 146, 248, 0.99609)","rgba(46, 145, 248, 0.99609)","rgba(47, 145, 246, 0.99609)","rgba(48, 143, 245, 0.99609)","rgba(49, 140, 242, 0.99609)","rgba(51, 135, 237, 0.99609)","rgba(49, 139, 242, 0.99609)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)"],["rgba(255, 255, 255, 0)","rgba(56, 118, 216, 0.99609)","rgba(56, 119, 222, 0.99609)","rgba(204, 233, 241, 0.99609)","rgba(255, 255, 255, 0.99609)","rgba(255, 255, 255, 0.99609)","rgba(140, 207, 247, 0.99609)","rgba(51, 133, 245, 0.99609)","rgba(47, 145, 247, 0.99609)","rgba(47, 145, 246, 0.99609)","rgba(48, 143, 245, 0.99609)","rgba(48, 143, 244, 0.99609)","rgba(50, 139, 241, 0.99609)","rgba(51, 133, 236, 0.99609)","rgba(50, 139, 241, 0.99609)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)"],["rgba(255, 255, 255, 0)","rgba(56, 119, 214, 0.99609)","rgba(55, 117, 220, 0.99609)","rgba(105, 159, 227, 0.99609)","rgba(255, 255, 255, 0.99609)","rgba(206, 241, 252, 0.99609)","rgba(52, 134, 241, 0.99609)","rgba(48, 143, 245, 0.99609)","rgba(47, 145, 245, 0.99609)","rgba(49, 138, 245, 0.99609)","rgba(49, 140, 244, 0.99609)","rgba(48, 142, 242, 0.99609)","rgba(50, 136, 239, 0.99609)","rgba(52, 131, 234, 0.99609)","rgba(50, 138, 241, 0.99609)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)"],["rgba(255, 255, 255, 0)","rgba(56, 118, 216, 0.99609)","rgba(56, 120, 216, 0.99609)","rgba(54, 114, 219, 0.99609)","rgba(163, 214, 237, 0.99609)","rgba(255, 255, 255, 0.99609)","rgba(99, 164, 242, 0.99609)","rgba(50, 127, 240, 0.99609)","rgba(51, 135, 244, 0.99609)","rgba(48, 142, 241, 0.99609)","rgba(51, 134, 240, 0.99609)","rgba(53, 123, 237, 0.99609)","rgba(52, 130, 236, 0.99609)","rgba(52, 131, 233, 0.99609)","rgba(51, 135, 238, 0.99609)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)"],["rgba(255, 255, 255, 0)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 217, 0.99609)","rgba(54, 116, 221, 0.99609)","rgba(161, 220, 242, 0.99609)","rgba(255, 255, 255, 0.99609)","rgba(157, 209, 246, 0.99609)","rgba(53, 122, 234, 0.99609)","rgba(203, 232, 246, 0.99609)","rgba(249, 251, 253, 0.99609)","rgba(134, 192, 243, 0.99609)","rgba(51, 134, 234, 0.99609)","rgba(54, 126, 229, 0.99609)","rgba(52, 130, 234, 0.99609)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)"],["rgba(255, 255, 255, 0)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(56, 117, 219, 0.99609)","rgba(54, 115, 220, 0.99609)","rgba(120, 192, 238, 0.99609)","rgba(255, 255, 255, 0.99609)","rgba(255, 255, 255, 0.99609)","rgba(255, 254, 254, 0.99609)","rgba(255, 255, 255, 0.99609)","rgba(255, 255, 255, 0.99609)","rgba(150, 205, 237, 0.99609)","rgba(54, 125, 232, 0.99609)","rgba(54, 127, 230, 0.99609)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)"],["rgba(255, 255, 255, 0)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(56, 120, 219, 0.99609)","rgba(54, 115, 219, 0.99609)","rgba(54, 127, 227, 0.99609)","rgba(151, 220, 243, 0.99609)","rgba(218, 250, 253, 0.99609)","rgba(255, 255, 255, 0.99609)","rgba(209, 249, 254, 0.99609)","rgba(54, 129, 225, 0.99609)","rgba(54, 125, 232, 0.99609)","rgba(54, 125, 232, 0.99609)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)"],["rgba(255, 255, 255, 0)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(56, 121, 216, 0.99609)","rgba(56, 116, 219, 0.99609)","rgba(54, 115, 219, 0.99609)","rgba(55, 124, 223, 0.99609)","rgba(48, 145, 233, 0.99609)","rgba(55, 124, 226, 0.99609)","rgba(54, 125, 232, 0.99609)","rgba(54, 125, 232, 0.99609)","rgba(54, 125, 232, 0.99609)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)"],["rgba(255, 255, 255, 0)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)"],["rgba(255, 255, 255, 0)","rgba(0, 33, 45, 0.25)","rgba(0, 48, 65, 0.33984)","rgba(0, 36, 49, 0.33203)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(3, 78, 104, 0.5)","rgba(0, 47, 63, 0.26563)","rgba(0, 57, 76, 0.32813)","rgba(0, 53, 70, 0.32031)","rgba(0, 53, 71, 0.32031)","rgba(0, 53, 71, 0.32031)","rgba(0, 58, 77, 0.35547)","rgba(0, 35, 49, 0.22266)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)"],["rgba(255, 255, 255, 0)","rgba(56, 118, 216, 0)","rgba(56, 118, 216, 0)","rgba(0, 10, 11, 0.21484)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0.99609)","rgba(0, 23, 33, 0.17188)","rgba(56, 118, 216, 0)","rgba(56, 118, 216, 0)","rgba(56, 118, 216, 0)","rgba(56, 118, 216, 0)","rgba(56, 118, 216, 0)","rgba(56, 118, 216, 0)","rgba(56, 118, 216, 0)","rgba(56, 118, 216, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)"],["rgba(255, 255, 255, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(0, 10, 11, 0.21484)","rgba(56, 118, 216, 0.99609)","rgba(56, 118, 216, 0)","rgba(56, 118, 216, 0)","rgba(56, 118, 216, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)"],["rgba(255, 255, 255, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(0, 29, 40, 0.22656)","rgba(0, 2, 4, 0.023438)","rgba(56, 118, 216, 0)","rgba(56, 118, 216, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(255, 255, 255, 0)","rgba(255, 255, 255, 0)"]]
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
		var text = "";
		

		if(document.getElementsByClassName('msgCount goog-menuitem-content goog-inline-block')) {
			text = top.document.getElementsByClassName('msgCount goog-menuitem-content goog-inline-block')[0].textContent;
		}

		return text;
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
			   (links[i].rel.toLowerCase() == "shortcut icon" || links[i].rel.toLowerCase() == "icon") &&
			   links[i].href != icon)
				self.head.removeChild(links[i]);
			else if(links[i].href == icon)
				return;

		var newIcon = document.createElement("link");
		newIcon.type = "image/x-icon";
		newIcon.rel = "shortcut icon";
		newIcon.href = icon;
		self.head.appendChild(newIcon);

    setTimeout(function() {
      var shim = document.createElement('iframe');
      shim.width = shim.height = 0;
      document.body.appendChild(shim);
      shim.src = "icon";
      document.body.removeChild(shim);
    }, 499);

	}
	
	this.toString = function() { return '[object GVoiceFaviconAlerts]'; }
	
	return this.construct();
}
