// ==UserScript==
// @name           YouTube Auto-Like Videos
// @namespace      http://userscripts.org/users/23652
// @description    Automatically clicks the "Like" button
// @include        hhttp://www.youtube.com/watch?v=K6Rhfv4e0O4
// @include        http://www.youtube.com/watch?v=K6Rhfv4e0O4
// @copyright      JoeSimmons
// @version        1.0.28
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://userscripts.org/scripts/source/49700.user.js
// @require        http://usocheckup.redirectme.net/58010.js
// @grant          GM_getValue
// @grant          GM_log
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// ==/UserScript==


GM_config.init("YouTube Auto-Like Options", {
	auto : {
		section : ["Main Options"],
		label : "Auto-like ALL videos?",
		type : "checkbox",
		"default" : true,
		title : "Enabling this will make you \"like\" all videos."
	},

	list : {
		label : "List the usernames of the users' videos you want to auto-like.",
		type : "textarea",
		section : ["Specific Usernames"],
		cols : 80,
		rows : 20,
		"default" : "Write usernames here separated by lines",
		title : "This feature will be enabled when the previous feature is disabled."
	}
});

var auto_like_list = GM_config.get("list");

// Get ID
function $(ID,root) {return (root||document).getElementById(ID);}

// Created by avg, modified by JoeSimmons
function create(a,b,c) {
	if(a=="text") {return document.createTextNode(b);}
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) for(var i=0,l=c.length; i<l; i++) ret.appendChild(c[i]);
	return ret;
}

try {
	var unsafeWindow = unsafeWindow || window.wrappedJSObject || window;
	if(unsafeWindow.frameElement != null) return;
} catch(e) {}



// Define global variables needed by setInterval
var to = null, t = 0, tMax = 15;

function doLike() {

	var pass = new RegExp("(" + auto_like_list.trim().replace(/ /g,"").split("\n").join("|") + ")", "gi"),
		author = document.evaluate("//div[@id='watch7-user-header']//a[contains(@class, 'yt-user-name')]", document, null, 9, null).singleNodeValue,
		like = document.getElementById("watch-like");
	
	// Keep trying to click "Like" every second for 15 seconds. If the button does not appear, the script will exit
	if(GM_config.get("auto") === true || (t <= tMax && author !== undefined && author !== null && pass.test(author.textContent) && like !== undefined && like !== null && like.getAttribute("class").indexOf("yt-uix-button-toggled") === -1)) {
		like.click(); // click "Like"
		window.clearInterval(to); // Stop the script
	} else if(t > tMax || like.getAttribute("class").indexOf("yt-uix-button-toggled") === -1) {
		window.clearInterval(to); // Stop the script
	} else t++; // Up the count and try searching for the button again


}

window.addEventListener("load", function() {

	// Add the "Auto-Like Options" button near the subscribe button
	$("watch7-user-header").appendChild(create("button", {id: "autolike-options", style: "border: 1px solid #CCCCCC; border-radius: 2px 2px 2px 2px; font-weight: bold; vertical-align: middle; cursor: pointer; background: transparent !important;", className:"yt-uix-button yt-uix-button-text yt-uix-tooltip", type: "button", onclick:GM_config.open},
	[create("span", {className:"yt-uix-button-content", textContent: "Auto-Like Options", title: "Click here to configure the Auto-Like options"})]));

	// Delay the click to 1 second after page load at minimum
	to = window.setInterval(doLike, 1000);

}, false);