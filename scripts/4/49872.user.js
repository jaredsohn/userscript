// ==UserScript==
// @name           Username-completion
// @namespace      tag://kongregate
// @description    When pressing tab, this script replaces the current word with the first user in the userlist whose name starts with that word. Pressing tab again selects the next user etc.
// @include        http://www.kongregate.com/games/*
// @author         Ventero
// @date           03.01.2012
// @version        1.5
// @require        http://kong.ventero.de/updates/49872.js
// ==/UserScript==

// Written by Ventero (http://www.kongregate.com/accounts/Ventero) 05/23/09
// Thanks to kaedenn for the idea of adding a colon if the username is the first word in the message
// Copyright (c) 2009-2012 Ventero, licensed under MIT/X11 license
// http://www.opensource.org/licenses/mit-license.php

var s = document.createElement("script");
s.textContent = "(" +
function init_nameCompletion(){
	if(typeof ChatDialogue === "undefined" ||
	   ChatDialogue.prototype.oldKeyPressTab) return;

	var isChrome = (navigator.appVersion.indexOf("Chrome") >= 0);
	if(isChrome) {
		ChatDialogue.prototype.initialize =
		ChatDialogue.prototype.initialize.wrap(function(old, p, i, h, u){
			old(p, i, h, u);
			var self = this;
			this._input_node.observe("keydown", function(event) {
				if(event.keyCode != 9 || event.ctrlKey || event.altKey || event.metaKey) return;
				self.onKeyPress(event);
			});
		})
	}

	ChatDialogue.prototype.oldKeyPressTab = ChatDialogue.prototype.onKeyPress;
	ChatDialogue.prototype.tabcnt = 0;
	ChatDialogue.prototype.done = 1;
	ChatDialogue.prototype.onKeyPress = function(a){
		if (a.keyCode != 9 || a.ctrlKey){
			this.tabcnt = 0;
			this.done = 1;
			this.oldKeyPressTab(a);
			return;
		}

		var node = (this._input_node.wrappedJSObject || this._input_node);
		if (this.tabcnt == 0 && this.done == 1){
			var inputText = node.getValue(),
			    spaceAtCaret = inputText.substr(0, node.selectionStart).lastIndexOf(' ');
			this._caretPos = node.selectionStart;
			this._start = inputText.substr(0,spaceAtCaret);
			if(this._start) this._start+=" ";

			this._currentWord = inputText.substring(spaceAtCaret+1, this._caretPos);
			this._rest = inputText.substr(this._caretPos);
		}
		this.done = 0;

		var userArray = this._holodeck.chatWindow().activeRoom()._users_list,
		    possibleMatches = [],
		    z = node.getValue();
		if (z.match(/\s+$/)) z=z.replace(/\s+$/, '')

		for (var i=0;i<userArray.length;i++){
			if(userArray[i].username.toLowerCase().indexOf(this._currentWord.toLowerCase())==0){
				possibleMatches.push(userArray[i].username);
			}
		}

		if (this.tabcnt < possibleMatches.length){
			node.setValue(this._start + possibleMatches[this.tabcnt] + (this._start?" ":": ") + this._rest);
			node.selectionStart = this._caretPos + possibleMatches[this.tabcnt].length - this._currentWord.length+(this._start?1:2);
			node.selectionEnd = node.selectionStart;
			this.tabcnt+=1;
		} else {
			node.setValue(this._start + this._currentWord + this._rest);
			node.selectionStart = this._caretPos;
			node.selectionEnd = this._caretPos;
			this.tabcnt = 0
		}
		if(a.stop) a.stop();
		if(a.preventDefault) a.preventDefault();
	}
} + ")();";

window.setTimeout(function(){
	document.body.appendChild(s);
	document.body.removeChild(s);
}, 0);

