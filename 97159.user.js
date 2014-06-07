// ==UserScript==
// @name           Facebook Lightbox Killer
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
Facebook Lightbox Killer
Copyright 2011, Matt Kruse
*/
var version = 2.0;
function target(e){ var t=e.target; if (t.nodeType == 3){t=t.parentNode;} return t; }
function getParentByTag(el,tn){ tn=tn.toLowerCase();while(el=el.parentNode) { if(el && el.tagName && tn==el.tagName.toLowerCase()) { return el; } } return null; }
document.addEventListener('click',function(e) {
	var o = target(e), a=null;
	if (o.tagName=="a") { a=o; }
	else { a=getParentByTag(o,'a'); }
	if (a && a.getAttribute('rel')=="theater") {
		a.removeAttribute('rel');
	}
},true);
