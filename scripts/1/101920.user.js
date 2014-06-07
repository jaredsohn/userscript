// ==UserScript==
// @name           Y!Mail
// @namespace      http://www.psychonautical.net/greasemonkey
// @description    Tweaks Y!Mail to use all the screen on wide monitors
// @include        http://*.mail.yahoo.*
// @include        https://*.mail.yahoo.*
// @include        http://calendar.yahoo.*
// @include        https://calendar.yahoo.*
// @require        http://sizzlemctwizzle.com/updater.php?id=101920&days=7
// @author         HeaDCase
// @grant          GM_addStyle
// ==/UserScript==
// Force site to always use https
if(document.URL.charAt(4)!='s'){
	document.location='https'+document.URL.substr(4,document.URL.length);
}

// GM_addStyle fix for Chrome (thanks to Claudio Nicora who thanks Uldry for Chrome suggestion)
if(typeof(GM_addStyle) == 'undefined') {
	function GM_addStyle(css) {
		var style = document.createElement('style');
		style.setAttribute('type', 'text/css');
		style.innerHTML = css;
		document.head.appendChild(style);
	};
}
/*

// remove the ad	// might mess with the look of the page
if(document.URL.match(/mail/i)) {
	document.body.className = "withoutad";
}
*/

var newstyle='#main, #yucs, #yuhead-bucket { max-width: 1920px; }';
// hide the 'Search Web' button
newstyle+=".yucs-wsearch-button {visibility: hidden; display: none;} ";
GM_addStyle(newstyle);
if(document.URL.match(/calendar/i)){
	document.getElementById("paneshell").className = "withoutad";
}
