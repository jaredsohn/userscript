// ==UserScript==
// @name           Reply-command
// @namespace      tag://kongregate
// @description    Adds a /r-command for Kongregate's chat which automatically replaces with "/w <Last user who sent you a whisper>" when pressing space. If you didn't receive a whisper yet, it gets replaced by "/w "
// @include        http://www.kongregate.com/games/*
// @author         Ventero
// @version        1.8.3
// @date           13.03.2011
// @require        http://vulcan.ist.unomaha.edu/~medleymj/updater/47963.js
// @id 47963
// @tab chat_commands
// @enabledbydefault true
// @homepage http://userscripts.org/scripts/show/47963
// ==/UserScript==

// Written by Ventero (http://www.kongregate.com/accounts/Ventero) 05/01/09

var dom = (typeof unsafeWindow === "undefined" ? window : unsafeWindow);

function init_reply(){

	var holodeck = dom.holodeck,
			ChatDialogue = dom.ChatDialogue;

	if (holodeck && ChatDialogue){

		ChatDialogue.prototype = dom.CDprototype||dom.ChatDialogue.prototype;
		if(!ChatDialogue.prototype.oldKeyPressReply){

			ChatDialogue.prototype.oldKeyPressReply = ChatDialogue.prototype.onKeyPress;

			if(ChatDialogue.prototype.reply){
				ChatDialogue.prototype.oldreply = ChatDialogue.prototype.reply
			} else {
				ChatDialogue.prototype.oldreply = function(a){};
			}
			ChatDialogue.prototype.reply = function(a){
				this.holodeck.reply = a;
				this.oldreply(a);
			}

			if(!ChatDialogue.prototype.showReceivedPM){
				ChatDialogue.prototype.showReceivedPM = ChatDialogue.prototype.receivedPrivateMessage;
				ChatDialogue.prototype.receivedPrivateMessage = function(a){
					if (a.data.success){
						this.reply(a.data.from)
					}
					this.showReceivedPM(a);
				}
			}

			ChatDialogue.prototype.onKeyPress = function (a) {
				var z, node = (this.input_node.wrappedJSObject || this.input_node);
				if(a.which == 32 &&
				   ((a.currentTarget.selectionStart == 2 && (z = node.getValue().match(/^\/r(.*)/i))) ||
				   (z = node.getValue().match(/^\/r\b(.*)/i)))){
					var x=z[1]||"";
					if (this.holodeck.reply) {
						this.setInput("/w "+this.holodeck.reply+" "+x);
					} else {
						this.setInput("/w ");
					}
					if(a.stop) a.stop();
					if(a.preventDefault) a.preventDefault();
				};

				this.oldKeyPressReply(a);
			}
		}
	}
};

function check_47963(){
	dom.injectScript = dom.injectScript||(document.getElementById("injectScriptDiv")?document.getElementById("injectScriptDiv").onclick():0);
	if(dom.injectScript){
		dom.injectScript(init_reply, 0);
	} else if(!dom._promptedFramework && !/Chrome/i.test(navigator.appVersion)){
		if(confirm("You don't have the latest version of the framework-script!\n" +
		           "Please install it, otherwise the scripts won't work.\n" +
		           "Clicking ok will open a new tab where you can install the script"))
			window.open("http://userscripts.org/scripts/show/54245", "_blank");
		dom._promptedFramework = true;
	}
}

setTimeout(init_reply, 0, unsafeWindow)