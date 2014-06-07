// ==UserScript==
// @name        GM Modified Class
// @namespace   Made by Heya on Neofriends.net
// @version     1
// ==/UserScript==
var gm = new function() {
	this.setvalues = function (name, value) {
		for(i=0;i<name.length; i++) {
			GM_setValue(name[i], value[i]);
		}
	}
        this.eventlistener = function (name, function_) {
		for(i=0;i<name.length; i++) {
			dom.name(name[i], 0).addEventListener('click', function_[i]);
		}
	}
}