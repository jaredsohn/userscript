// ==UserScript==
// @name        DOM (Direct Object Model) Class
// @namespace   Made by Heya on Neofriends.net
// @version     1
// ==/UserScript==

var dom = new function() {
	this.class = function (name, number) {
		return document.getElementsByClassName(name)[number];
	}
	this.name = function (name, number) {
		return document.getElementsByName(name)[number];
	};
	this.id = function (name) {
		return document.getElementById(name);
	};
	this.tag = function (name, number) {
		return document.getElementsByTagName(name)[number];
	};
	this.class_tag = function (name, cn, tag, tn) {
		return document.getElementsByClassName(name)[cn].getElementsByTagName(tag)[tn];
	};
        this.class = function (name, number) {
            return document.getElementsByClassName(name)[number];    
        }
}
