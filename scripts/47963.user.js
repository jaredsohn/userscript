// ==UserScript==
// @name           Reply-command
// @namespace      tag://kongregate
// @description    Adds a /r-command for Kongregate's chat which automatically replaces with "/w <Last user who sent you a whisper>" when pressing space. If you didn't receive a whisper yet, it gets replaced by "/w "
// @include        http://www.kongregate.com/games/*
// @author         Ventero
// @version        1.8.3
// @date           13.03.2011
// @require        http://kong.ventero.de/updates/47963.js
// ==/UserScript==

// Written by Ventero (http://www.kongregate.com/accounts/Ventero) 05/01/09
// Copyright (c) 2009-2012 Ventero, licensed under MIT/X11 license
// http://www.opensource.org/licenses/mit-license.php

var dom = (typeof unsafeWindow === "undefined" ? window : unsafeWindow);

function init_reply(){

	var CDialogue = dom.ChatDialogue;

	if (CDialogue){

		CDialogue.prototype = dom.CDprototype||dom.ChatDialogue.prototype;
		if(!CDialogue.prototype.oldKeyPressReply){

			CDialogue.prototype.oldKeyPressReply = CDialogue.prototype.onKeyPress;

			if(CDialogue.prototype.reply){
				CDialogue.prototype.oldreply = CDialogue.prototype.reply
			} else {
				CDialogue.prototype.oldreply = function(a){};
			}
			CDialogue.prototype.reply = function(a){
				this._holodeck._reply = a;
				this.oldreply(a);
			}

			if(!CDialogue.prototype.showReceivedPM){
				CDialogue.prototype.showReceivedPM = CDialogue.prototype.receivedPrivateMessage;
				CDialogue.prototype.receivedPrivateMessage = function(a){
					if (a.data.success){
						this.reply(a.data.from)
					}
					this.showReceivedPM(a);
				}
			}

			CDialogue.prototype.onKeyPress = function (a) {
				var z, node = (this._input_node.wrappedJSObject || this._input_node);
				if(a.which == 32 &&
				   ((a.currentTarget.selectionStart == 2 && (z = node.getValue().match(/^\/r(.*)/i))) ||
				   (z = node.getValue().match(/^\/r\b(.*)/i)))){
					var x=z[1]||"";
					if (this._holodeck._reply) {
						this.setInput("/w "+this._holodeck._reply+" "+x);
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

function check(){
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

setTimeout(check, 0);
