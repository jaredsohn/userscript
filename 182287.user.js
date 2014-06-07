// ==UserScript==
// @name        Remove YT 'guide div' for Youtube player Resize
// @namespace   http://userscripts.org/scripts/review/182287
// @include     http://www.youtube.com/*
// @version     1
// @grant       none
// @author      Seximite
// ==/UserScript==
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = 0, len = this.length; i < len; i++) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}
var guide = document.getElementById("guide");
var player = document.getElementById("player");
guide.remove();
player.style.padding="50px";