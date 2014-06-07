// ==UserScript==
// @name           Facebook Comment Fixer
// @namespace      http://userscripts.org/users/86416
// @include        http://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://*.facebook.com/*
// @include        https://facebook.com/*
// @include        http://*.facebook.tld/*
// @include        http://facebook.tld/*
// @include        https://*.facebook.tld/*
// @include        https://facebook.tld/*

// @exclude        http://*.channel.facebook.tld/*
// @exclude        http://static.*.facebook.tld/*
// @exclude        http://*.facebook.tld/ai.php*
// @exclude        http://*.facebook.tld/pagelet/generic.php/pagelet/home/morestories.php*

// @exclude        https://*.channel.facebook.tld/*
// @exclude        https://static.*.facebook.tld/*
// @exclude        https://*.facebook.tld/ai.php*
// @exclude        https://*.facebook.tld/pagelet/generic.php/pagelet/home/morestories.php*

// ==/UserScript==
/*
Facebook Comment Fixer
Copyright 2011, Matt Kruse
http://BetterFacebook.net
*/
var version = 1.0;
function addGlobalStyle(css) {
	var style = document.createElement('style');
	style.textContent = css;
	document.getElementsByTagName('head')[0].appendChild(style);
}
function hasClass(o,re) {if (typeof re=="string") {re = new RegExp("(^|\\s)"+re+"(\\s|$)");}return (o.className && re.test(o.className));}
function removeClass(o,re) {if(!o){return;} if (!hasClass(o,re)) { return; } if (typeof re=="string") { re = new RegExp("(^|\\s)"+re+"(\\s|$)"); } o.className = o.className.replace(re,' '); }
// Restore the comment button
addGlobalStyle('.sendOnEnterTip, .commentUndoTip, .child_is_active .sendOnEnterTip, .child_is_active .commentUndoTip {display:none !important;} #facebook .child_is_active .hidden_elem.commentBtn {display:block !important;}');
// Listen for key presses and get rid of the enter_submit class
window.addEventListener('keydown',function(e){ 
	var o=e.target;
	if (o.tagName && o.tagName=="TEXTAREA") {
		removeClass(o,"enter_submit");
	}
},false);
