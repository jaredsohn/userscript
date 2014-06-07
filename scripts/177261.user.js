// ==UserScript==
// @name       Vk.com Ad Block
// @version    0.1
// @match      http://vk.com/*
// @copyright  apache313 
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

document.getElementById("left_ads").remove();