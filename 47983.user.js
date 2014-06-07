// ==UserScript==
// @name           Reply-command (hotkey)
// @namespace      tag://kongregate
// @description    Inserts the username of the last user who whispered you when pressing Alt-R
// @include        http://www.kongregate.com/games/*
// @author         Ventero
// @version        1.6.2
// @date           03.02.11
// @require        http://kong.ventero.de/updates/47983.js
// ==/UserScript==

// Written by Ventero (http://www.kongregate.com/accounts/Ventero) 05/02/09
// Copyright (c) 2009-2012 Ventero, licensed under MIT/X11 license
// http://www.opensource.org/licenses/mit-license.php

var dom = (typeof unsafeWindow === "undefined" ? window : unsafeWindow);

function init_replyHotkey(){

	var holodeck = dom.holodeck,
			CDialogue = dom.ChatDialogue;

	if (CDialogue && holodeck){
		CDialogue.prototype = dom.CDprototype||dom.ChatDialogue.prototype;

		if(!CDialogue.prototype.oldKeyPressReplyHotkey){
			CDialogue.prototype.oldKeyPressReplyHotkey = CDialogue.prototype.onKeyPress;

			CDialogue.prototype.onKeyPress = function (a) {
				var node = (this._input_node.wrappedJSObject || this._input_node);
				if (a.which == 13) {
					this.cnt=0;
				} else if (a.altKey && a.which == 114) {
					this.cnt+=1;
					l=this._holodeck._replyHotkey.length||-1;
					reply=this._holodeck._replyHotkey[l-this.cnt]||"";
					if(reply && this.cnt<=l){
						if(z=node.getValue()){
							if(z.match(/^\/[\s]*/)){
								z=z.replace(/^([^\s]+)\s*[^\s]*\s*(.*)/, '/w '+reply+' $2')
							}else{
								z="/w "+reply+" "+z
							};
							this.setInput(z)
						}else{
							this._holodeck.insertPrivateMessagePrefixFor(reply);
						}
					}else if(this.cnt>l){
						z=node.getValue();
						if (z=="/w "+this._holodeck._replyHotkey[0]+" "){
							this.setInput("/w ");
							this.cnt=0;
						}else if(z=="" && l>0){
							this.cnt-=1;
							this.setInput("/w "+this._holodeck._replyHotkey[l-this.cnt]+" ");
						}else{
							r=z.match(/^\/[^\s]+\s+[^\s]+\s+(.*)/);
							r&&(z=r[1]);
							this.setInput(z);
							this.cnt=0;
						}
					}
				}
				this.oldKeyPressReplyHotkey(a);
			}

			CDialogue.prototype.cnt=0;

			CDialogue.prototype.whisperArray = function(a,x){var i=a.indexOf(x);if(-1!==i)a.splice(i, 1);return a.concat(x);};

			if(CDialogue.prototype.reply){
				CDialogue.prototype.oldreplyHotkey = CDialogue.prototype.reply
			} else {
				CDialogue.prototype.oldreplyHotkey = function(a){};
			}

			CDialogue.prototype.reply = function(a){
				this._holodeck._replyHotkey=this.whisperArray(this._holodeck._replyHotkey, a);
				this.oldreplyHotkey(a);
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


			holodeck._replyHotkey= new Array();
		}
	}
};

function check(){
	dom.injectScript = dom.injectScript||(document.getElementById("injectScriptDiv")?document.getElementById("injectScriptDiv").onclick():0);
	if(dom.injectScript){
		dom.injectScript(init_replyHotkey, 0);
	} else if(!dom._promptedFramework && !/Chrome/i.test(navigator.appVersion)){
		if(confirm("You don't have the latest version of the framework-script!\n" +
		           "Please install it, otherwise the scripts won't work.\n" +
		           "Clicking ok will open a new tab where you can install the script"))
			window.open("http://userscripts.org/scripts/show/54245", "_blank");
		dom._promptedFramework = true;
	}
}

setTimeout(check, 0);
