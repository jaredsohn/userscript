// ==UserScript==
// @name Kongregate Chat Line Highlighting (simple version)
// @namespace ventero.de
// @include http://www.kongregate.com/games/*
// @description This script will highlight lines which have your name in them with a light green. The colour may be changed below.
// ==/UserScript==

// Copyright (c) 2009-2012 Ventero, licensed under MIT/X11 license
// http://www.opensource.org/licenses/mit-license.php
// Initial idea by Nabb (http://www.kongregate.com/accounts/Nabb)

var dom;

try{
	if(unsafeWindow && unsafeWindow.holodeck){
		dom = unsafeWindow;
	} else {
		dom = this;
	}
}catch(e){
	dom = this;
}

function init_simpleHighlight(){

	var CRoom = dom.ChatRoom;

	if(CRoom){

		CRoom.prototype = dom.CRprototype||dom.ChatRoom.prototype;

		CRoom.prototype.searchWord = function(a, b){
			var reg = new RegExp("\\b"+b+"\\b")
			return a.match(reg)?true:false;
		}
		CRoom.prototype.receivedMessage=function(e){
			var f=e.data.message;
			this._chat_dialogue.displayMessage(e.data.user.username,f,this.searchWord(f.toLowerCase(),this.username().toLowerCase())?{'class':'toMe'}:"{}")
		}

		x=document.styleSheets[1];x.insertRule('#kong_game_ui .chat_message_window .toMe{background-color:#def6ea;}',x.cssRules.length);

	}
}

function check(){
	dom.injectScript = dom.injectScript||(dom.injectScript=document.getElementById("injectScriptDiv")?document.getElementById("injectScriptDiv").onclick():0);
	if(dom.injectScript){
		dom.injectScript(init_simpleHighlight, 0);
	} else if(!dom._promptedFramework && !/Chrome/i.test(navigator.appVersion)){
		if(confirm("You don't have the latest version of the framework-script!\n" +
		           "Please install it, otherwise the scripts won't work.\n" +
		           "Clicking ok will open a new tab where you can install the script"))
			window.open("http://userscripts.org/scripts/show/54245", "_blank");
		dom._promptedFramework = true;
	}
}

setTimeout(check, 0););
