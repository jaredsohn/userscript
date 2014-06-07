// ==UserScript==
// @name           /me script for Kongregate
// @namespace      http://www.kongregate.com/games/*
// @include        http://www.kongregate.com/games/*
// ==/UserScript==

// Rewritten by the awesome Ventero for compatibility with his scripts.

var loaded = false;

function init(){
	if(this.holodeck && this.ChatDialogue){
		loaded = true;
		var _holodeck = this.holodeck,
		styleColor = GM_getValue("kong_slashMeColor", "\#660099");
		GM_registerMenuCommand("Change \/me command text color", function(e) { 
			var color = prompt("Please enter the color code in the form \#HHHHHH (default \#660099)");
			if (z=color.match(/(\#[0-9a-fA-F]{6})/)){
				styleColor=z[1]
				sheet = document.styleSheets[1];
				for (var i=0;i<sheet.cssRules.length;i++){
					if(sheet.cssRules[i].selectorText == "#kong_game_ui .chat_message_window .slashMe"){
						sheet.cssRules[i].style.color = styleColor;
						window.setTimeout(function(){GM_setValue("kong_slashMeColor", styleColor);}, 0);
						alert("Changed color to " + styleColor);
					}
				}
			}else{alert("Invalid format!");};
			
		});

		this.ChatDialogue.prototype.oldInsertFunction1234 = this.ChatDialogue.prototype.insert;

		this.ChatDialogue.prototype.insert = function (content) {
			var l = content.indexOf('</span>:');
			var c = content.indexOf('"', content.indexOf('<p class="') + 10);
			var k = content.indexOf('<span', c);
			var u = content.indexOf('username="')+10;
			var un = content.lastIndexOf(content.substring(u, content.indexOf('"', u)), l);

			if (content.indexOf('\u200B')!=-1 && content.indexOf('\ufeff') != -1) {
			
				content = content.substring(0,c) + ' slashMe' + content.substring(c, k) + '* ' + content.substring(k, un) + 

'</span>' + content.substring(l+9);

			} else if(content.indexOf('\u200B')!=-1){

				content = content.substring(0, c) + ' slashMe' + content.substring(c, k) + '* ' + content.substring(k, l) + 

'</span>' + content.substring(l+8);

			} else if (content.indexOf('\ufeff') != -1) {
				
				content = content.substring(0, c) + ' slashMe' + content.substring(c, un) + '</span>' + content.substring

(l+9);
			}

			this.oldInsertFunction1234(content);
		}
		
		this.holodeck.addChatCommand("me", function(l,n) {
			l.chatWindow().activeRoom().sendRoomMessage('\u200B' + n.substring(n.indexOf('\/me ') + 4));
			return false;
		});
		this.holodeck.addChatCommand("nouser", function(l,n) {
			l.chatWindow().activeRoom().sendRoomMessage('\ufeff' + n.substring(n.indexOf('\/nouser ') + 8));
			return false;
		});
		
		sheet = document.styleSheets[1];
		sheet.insertRule('#kong_game_ui .chat_message_window .slashMe { color:'+styleColor+';}',sheet.cssRules.length);
	} else {
		setTimeout(init, 1000);
	}
};

if (!loaded) {
  setTimeout(init, 1500);
};
