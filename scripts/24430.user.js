// ==UserScript==
// @name           Gmail Favicon Alerts 3
// @description    Alerts you to the status of your Gmail Inbox through distinct Favicons.
// @version        3.13
// @date           2013-05-26
// @author         Peter Wooley
// @namespace      http://peterwooley.com
// @include        https://mail.google.com/mail*
// @include        http://mail.google.com/mail*
// @include        https://mail.google.com/mail*
// @include        http://mail.google.com/a*
// @include        https://mail.google.com/a*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// ==/UserScript==

if(typeof GM_getValue === "undefined") {
	function GM_getValue(name, fallback) {
		return fallback;
	}
}

// Register GM Commands and Methods
if(typeof GM_registerMenuCommand !== "undefined") {
	GM_registerMenuCommand( "Gmail Favicon Alerts > Chat Alerts On", function() { setChat(true) } );
	GM_registerMenuCommand( "Gmail Favicon Alerts > Chat Alerts Off", function() { setChat(false) } );
	GM_registerMenuCommand( "Gmail Favicon Alerts > Unread Count On", function() { setUnreadCountDisplay(true) } );
	GM_registerMenuCommand( "Gmail Favicon Alerts > Unread Count Off", function() { setUnreadCountDisplay(false) } );
	function setChat(val) { GM_setValue('chatEnabled', val) };
	function setUnreadCountDisplay(val) { GM_setValue('unreadCountDisplay', val) };
}

var gfia_instance;
var gfia_chat = GM_getValue('chatEnabled', true);

if(!window.frameElement) {
	new GmailFavIconAlerts();
  console.log("Making an instance.");
}

function GmailFavIconAlerts() {
	var self = this;
	this.construct = function() {				
		this.chat = this.getChat();
		this.chatting = false;
		this.head = window.document.getElementsByTagName('head')[0];
		this.title = this.head.getElementsByTagName('title')[0];
		this.inboxText = 'Inbox';
		this.chatText = [
							{value:'\u2026', chars: 1},
							{value:'...', chars: 3}
						];
		this.timer;
		this.icons = {
			chat: 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAABYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFxMRnxZSkS5AAAAFgAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAemtkuz4yLLs4KyeMAAAAFgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFltLRf+3p6D/ZVZR/ywhHrsAAAAfAAAAFgAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAAAHzQpJbt9bWf/6dnS/+nZ0v9xYVz/Nysn/zQpJbsxJiOMAAAAHwAAAA8AAAAAAAAAAAAAAAAAAAAWPzMujEc5NP+Cc2z/6dnS/+nZ0v/p2dL/6dnS/+bWz/+mlY//eWhj/0c5NP8/My6MAAAAFgAAAAAAAAAHVEZAu5GBev/ZycL/6dnS/+nZ0v/p2dL/6dnS/+nZ0v/p2dL/5dXO/9XEvf/Csar/hnZw/1RFQLsAAAAPSj46VYZ3cf/r3Nb/69zW/+vc1v/r3Nb/69zW/+vc1v/r3Nb/69zW/+vc1v/fz8n/0L+5/9C/uf+RgHr/WkxHjG1dV//BtK7/7+Pd/+/k3//w5eD/8Obh//Hm4v/x5uL/8ebi//Dm4f/w5eD/6d3Y/9HBu//Rwbr/xrav/2xcVv9zZF//9Ozo//bw7f/48/H/+vb0//v49v/8+fj//Pr5//z5+P/7+Pb/+vb0//fy8P/Txb//0sS+/9LDvf9yY13/e25o/9zX1f/9/Pz//v39//7+/v///v7///////////////////7+//7+/v/28/L/1cnE/9XIw//Ty8f/eWpl/4N3cleupqP/////////////////////////////////////////////////7Ofl/9bKxf/18fD/qJ6b/4BzblcAAAAAjIF8sru1sv//////////////////////////////////////+Pb2//f19P/18vH/tq2q/4l9eLIAAAAAAAAAAAAAAACUiYWylImF/8C6uP/08/P//////////////////v79/+7s6v+6sq//kIWA/5CFgLIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACcko98nJKP/5ySj/+cko//m5GN/5mPi/+YjYn/mI2JfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAPv/AAD4/wAA+H8AAPAPAADAAwAAgAEAAIAAAAAAAAAAAAAAAAAAAACAAQAAgAEAAMADAAD4HwAA//8AAA==',
			read:	'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAACMuAAAjLgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0Wsv8NFrL/gYGu/4GBrv+Bga7/gYGu/4GBrv+Bga7/gYGu/4GBrv+Bga7/gYGu/4GBrv+Bga7/DRay/w0Wsv8QGbX/EBm1/8HB0//g4OD/4ODg/+Dg4P/g4OD/4ODg/+Dg4P/g4OD/4ODg/+Dg4P/g4OD/wcHT/xAZtf8QGbX/FBy5/xQcuf+Jibn/x8fZ/+fn5//n5+f/5+fn/+fn5//n5+f/5+fn/+fn5//n5+f/x8fZ/4mJuf8UHLn/FBy5/xogvv8aIL7/zc3g/42Nvv/NzeD/7u7u/+7u7v9qat3/amrd/+7u7v/u7u7/zc3g/42Nvv/NzeD/GiC+/xogvv8gJcP/ICXD//X19f/T0+f/kZHE/6Sk0v9SUtv/PT3U/z091P9SUtv/pKTS/5GRxP/T0+f/9fX1/yAlw/8gJcP/Ki7K/youyv/7+/v/+/v7/6qq2f9YWOH/Q0Pb/zw82P88PNj/Q0Pb/1hY4f+qqtn/+/v7//v7+/8qLsr/Ki7K/zc60f83OtH///////////9fX+b/R0fd/0RE3P+6uv//urr//0RE3P9KSt//X1/m////////////NzrR/zc60f9GR9f/RkfX//////9mZuf/U1Pg/0xM3v+9vf////////////+9vf//TEze/1NT4P9mZuf//////0ZH1/9GR9f/UlLd/1JS3f9tbej/V1fg/1RU3//AwP///////////////////////8DA//9UVN//YGDk/21t6P9SUt3/UlLd/1tb4f9bW+H/W1vh/1tb4f/Dw///////////////////////////////////w8P//1tb4f9bW+H/W1vh/1tb4f9gYOH/YGDh/2Bg4f+Kitz/np7P/56ez/+ens//np7P/56ez/+ens//np7P/56ez/+Kitz/YGDh/2Bg4f9gYOH/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//////////////////w==',
			unread:	'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAACMuAAAjLgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALopAP+6KQD/rYh4/62IeP+tiHj/rYh4/62IeP+tiHj/rYh4/62IeP+tiHj/rYh4/62IeP+tiHj/uikA/7opAP+9LAD/vSwA/9LDvf/e3t7/3t7e/97e3v/e3t7/3t7e/97e3v/e3t7/3t7e/97e3v/e3t7/0sO9/70sAP+9LAD/wTEA/8ExAP+5koD/2MnD/+bm5v/m5ub/5ubm/+bm5v/m5ub/5ubm/+bm5v/m5ub/2MnD/7mSgP/BMQD/wTEA/8Y6A//GOgP/4NDI/76Wg//g0Mj/7e3t/+3t7f/jhVr/44Va/+3t7f/t7e3/4NDI/76Wg//g0Mj/xjoD/8Y6A//MQQn/zEEJ//X19f/n1s//xJqH/9OtnP/jc0D/3GIp/9xiKf/jc0D/062c/8Sah//n1s//9fX1/8xBCf/MQQn/0kwU/9JMFP/7+/v/+/v7/9q0o//pekb/5Ggv/+FiJ//hYif/5Ggv/+l6Rv/atKP/+/v7//v7+//STBT/0kwU/9lZI//ZWSP////////////ugE7/5mwz/+VpMP//zrf//863/+VpMP/objf/7oBO////////////2Vkj/9lZI//eaDL/3mgy///////uhVX/6HZA/+ZvOf//0Lr/////////////0Lr/5m85/+h2QP/uhVX//////95oMv/eaDL/5XRA/+V0QP/vjF3/6HlF/+d3Qv//0r3////////////////////////Svf/nd0L/7IBP/++MXf/ldED/5XRA/+l8Sf/pfEn/6XxJ/+l8Sf//1MD//////////////////////////////////9TA/+l8Sf/pfEn/6XxJ/+l8Sf/of0//6H9P/+h/T//gnH7/0KiV/9Colf/QqJX/0KiV/9Colf/QqJX/0KiV/9Colf/gnH7/6H9P/+h/T//of0//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAD//////////w==',
		};
		this.pixelMaps = {
			icons: {
				'unread':
					[
						['','','','','','','','','','','','','','','',''],
						['','','','','','','','','','','','','','','',''],
						['','','','','','','','','','','','','','','',''],
						['#4f7fe8','#4f7fe8','#4f7fe8','#7e9ce0','#95a8d0','#95a8d0','#95a8d0','#95a8d0','#95a8d0','#95a8d0','#95a8d0','#95a8d0','#7e9ce0','#4f7fe8','#4f7fe8','#4f7fe8'],
						['#497ce9','#497ce9','#497ce9','$497ce9','#c0d4ff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#c0d4ff','#497ce9','#497ce9','#497ce9','$497ce9'],
						['#4074e5','#4074e5','#5d8cef','#4579e8','#4277e7','#bdd2ff','#ffffff','#ffffff','#ffffff','#ffffff','#bdd2ff','#4277e7','#4f80ec','#5d8cef','#4074e5','#4074e5'],
						['#3268de','#3268de','#ffffff','#5585ee','#4076e8','#396fe6','#bad0ff','#ffffff','#ffffff','#bad0ff','#396fe6','#4076e8','#5585ee','#ffffff','#3268de','#3268de'],
						['#2359d9','#2359d9','#ffffff','#ffffff','#4e80ee','#336ce6','#3069e5','#b7ceff','#b7ceff','#3069e5','#376ee8','#4e80ee','#ffffff','#ffffff','#2359d9','#2359d9'],
						['#144cd2','#144cd2','#fbfbfb','#fbfbfb','#a3b4da','#467ae9','#2f68e4','#2762e1','#2762e1','#2f68e4','#467ae9','#a3b4da','#fbfbfb','#fbfbfb','#144cd2','#144cd2'],
						['#0941cc','#0941cc','#f5f5f5','#cfd6e7','#879ac4','#9cadd3','#4073e3','#2962dc','#2962dc','#4073e3','#9cadd3','#879ac4','#cfd6e7','#f5f5f5','#0941cc','#0941cc'],
						['#033ac6','#033ac6','#c8d0e0','#8396be','#c8d0e0','#ededed','#ededed','#5a85e3','#5a85e3','#ededed','#ededed','#c8d0e0','#8396be','#c8d0e0','#033ac6','#033ac6'],
						['#0031c1','#0031c1','#8092b9','#c3c9d8','#e6e6e6','#e6e6e6','#e6e6e6','#e6e6e6','#e6e6e6','#e6e6e6','#e6e6e6','#e6e6e6','#c3c9d8','#8092b9','#0031c1','#0031c1'],
						['#002cbd','#002cbd','#bdc3d2','#dedede','#dedede','#dedede','#dedede','#dedede','#dedede','#dedede','#dedede','#dedede','#dedede','#bdc3d2','#002cbd','#002cbd'],
						['#0029ba','#0029ba','#7888ad','#7888ad','#7888ad','#7888ad','#7888ad','#7888ad','#7888ad','#7888ad','#7888ad','#7888ad','#7888ad','#7888ad','#0029ba','#0029ba'],
						['','','','','','','','','','','','','','','',''],
						['','','','','','','','','','','','','','','','']
					]
				},
			numbers: [
				[
					[0,1,1,0],
					[1,0,0,1],
					[1,0,0,1],
					[1,0,0,1],
					[0,1,1,0]
				],
				[
					[0,1,0],
					[1,1,0],
					[0,1,0],
					[0,1,0],
					[1,1,1]
				],
				[
					[1,1,1,0],
					[0,0,0,1],
					[0,1,1,0],
					[1,0,0,0],
					[1,1,1,1]
				],
				[
					[1,1,1,0],
					[0,0,0,1],
					[0,1,1,0],
					[0,0,0,1],
					[1,1,1,0]
				],
				[
					[0,0,1,0],
					[0,1,1,0],
					[1,0,1,0],
					[1,1,1,1],
					[0,0,1,0]
				],
				[
					[1,1,1,1],
					[1,0,0,0],
					[1,1,1,0],
					[0,0,0,1],
					[1,1,1,0]
				],
				[
					[0,1,1,0],
					[1,0,0,0],
					[1,1,1,0],
					[1,0,0,1],
					[0,1,1,0]
				],
				[
					[1,1,1,1],
					[0,0,0,1],
					[0,0,1,0],
					[0,1,0,0],
					[0,1,0,0]
				],
				[
					[0,1,1,0],
					[1,0,0,1],
					[0,1,1,0],
					[1,0,0,1],
					[0,1,1,0]
				],
				[
					[0,1,1,0],
					[1,0,0,1],
					[0,1,1,1],
					[0,0,0,1],
					[0,1,1,0]
				],
			]
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
			var bgHeight = self.pixelMaps.numbers[0].length;
			var bgWidth = 0;
			var padding = count > 2 ? 0 : 1;
			
			for(var index = 0; index < count; index++) {
				bgWidth += self.pixelMaps.numbers[unread[index]][0].length;
				if(index < count-1) {
					bgWidth += padding;
				}
			}
			bgWidth = bgWidth > textedCanvas.width-4 ? textedCanvas.width-4 : bgWidth;
			
			ctx.fillRect(textedCanvas.width-bgWidth-4,2,bgWidth+4,bgHeight+4);
			
			
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
								ctx.fillRect(14- digitsWidth + x, y+4, 1, 1);
							}
						}
					}
					
					digitsWidth -= width + padding;
				}
			}	
			
			ctx.strokeRect(textedCanvas.width-bgWidth-3.5,2.5,bgWidth+3,bgHeight+3);
			
			self.textedCanvas[unread] = textedCanvas;
		}
		
		return self.textedCanvas[unread];
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
	this.getChat = function() { return false || GM_getValue('chatEnabled', true); }
	this.getDebugging = function() { return false || GM_getValue('debuggingEnabled', false); }
	this.getSearchElement = function() {
		var element;
		var nav = document.body.getElementsByClassName('n0');

		if(nav.length) {
			var potential = nav[0];
			
			if(potential.className.indexOf('n0') !== -1) {
				element = potential;
			}
		}
		
		return element ? element: null;
	}
	this.newChat = function() {
		var title = self.title.innerHTML;
		for(var index in self.chatText) {
			var location = title.indexOf(self.chatText[index].value);
			if(self.chatText[index].chars + location == title.length) {
				return true;
			}
		}
		return false;
	}
	this.newMail = function() { return self.searchElement.textContent.match(/\((\d*)\)/); }
	this.getUnreadCountDisplay = function() { return GM_getValue('unreadCountDisplay', true); }
	this.getUnreadCount = function() {
		if(this.newMail()) {
			matches = self.searchElement.textContent.match(/\((\d*)\)/);
			return matches ? matches[1] : false;
		}
	}
	this.getUnreadCountIcon = function() {
		var unread = self.getUnreadCount();		
		if(this.getUnreadCountDisplay()) {
			return self.drawUnreadCount(unread).toDataURL('image/png');
		} else {
			return self.icons.unread;
		}
	}
	
	this.poll = function() {
		self.searchElement = self.getSearchElement();
    
    if(!self.searchElement) {
      // We didn't find the searchElement, try again
      // on the next poll.
      return;
    }
		
		if(self.getChat() && self.newChat()) {
			return self.setIcon(self.icons.chat);
		}
			
		if(self.newMail())
			self.setIcon(self.getUnreadCountIcon());
		else
			self.setIcon(self.icons.read);
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
		
    setTimeout(function() {
      var shim = document.createElement('iframe');
      shim.width = shim.height = 0;
      document.body.appendChild(shim);
      shim.src = "icon";
      document.body.removeChild(shim);

      console.log("After setting the icon.");
    }, 499);
  }
	
	this.toString = function() { return '[object GmailFavIconAlerts]'; }
	
	return this.construct();
}
