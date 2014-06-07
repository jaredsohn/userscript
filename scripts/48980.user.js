// ==UserScript==
// @name           Kongregate Chat Message Length Notifier
// @namespace      http://www.kongregate.com
// @description    Notifies you if the message you're sending is too long.
// @include        http://www.kongregate.com/games/*
// @author		MrSpontaneous (http://www.kongregate.com/accounts/MrSpontaneous
// ==/UserScript==

function init() {
  if (this.ChatDialogue) {
    this.ChatDialogue.prototype.validlength = function (value) { if (value.substr(0,2) == "/w") { value = value.substr(value.indexOf(' ', 3)); }; if (value.length > 249) {return false;} else { return true; };};
    this.ChatDialogue.prototype.prevKeyPress = this.ChatDialogue.prototype.onKeyPress;
    this.ChatDialogue.prototype.onKeyPress = function(key) { if (!this.validlength(this._input_node.getValue())) {this._input_node.style.backgroundColor = "#FF82A0";} else { this._input_node.style.backgroundColor = ""; } if (key.which == 13) { this._input_node.style.backgroundColor = "";} this.prevKeyPress(key); };
  };
};
setTimeout(init, 0);