// ==UserScript==
// @name          Cookie Monster
// @namespace     http://derr.cc/userscripts
// @description	  Shows the contents of cookies
// @include       * 
// @version       0.1
// ==/UserScript==
/*
 * CookieMonster.user.js
 * Robert J Derr <robjderr@yahoo.com>
 * Last Updated: 2005/04/21 by Robert J Derr
 *
 * This script is a heavily modified version of http://www.stilleye.com/expandArea.user.js
 */
(function() {

	function setup() {
		if (document.cookie == '') { return; }

		var trigger = document.createElement("div");

		var cookieText = document.createTextNode(document.cookie);
		var triggerText = document.createTextNode("Cookie");

		trigger.appendChild(triggerText);

		with(trigger.style) {
			position = "fixed";
			left = bottom = "0px";
			color = "black";
			background = "white";
			border = "1px solid";
			padding = "3px";
			font = "10px sans-serif";
			cursor = "pointer";
			MozOpacity = ".4";
		}

		document.body.appendChild(trigger);

		trigger.onmouseover = function() {
			with(this.style) {
				MozOpacity = "1";
			}
			this.replaceChild(cookieText, triggerText);
		}

		trigger.onmouseout = function() {
			with(this.style) {
				MozOpacity = ".4";
			}
			this.replaceChild(triggerText, cookieText);
		}

		trigger.onclick = function() {
			this.parentNode.removeChild(this);
		}
	}

	window.addEventListener("load", setup, false);
})();