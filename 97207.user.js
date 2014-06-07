// ==UserScript==
// @name           Facebook Theater Gone
// @namespace      http://userscripts.org/users/294429
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
Facebook Theater Gone
Copyright 2011, Drew Arnold
*/
var version = 1.0;
var kill_theater = function(o) {
	if (o && o.parentNode && o.parentNode.className && /(^|\s)notification(\s|$)/.test(o.parentNode.className)) {
		o = o.parentNode;
	}
	o.addEventListener('click',function(e) {
		if (e.stopPropagation) { e.stopPropagation(); }
		return false;
	},true);
};
var attach_theater_killer = function(inserted) {
	var theater_selectors = 'a[rel="theater"],a[rel="theater"] i';
	if (inserted && inserted.querySelectorAll) {
		var els = inserted.querySelectorAll(theater_selectors);
		if (els && els.length) {
			for (var i=0; i<els.length; i++) {
				kill_theater(els[i]);
			}
		}
	}
};

attach_theater_killer(document);

document.addEventListener('DOMNodeInserted', function (e) {
	var o = e.target;
	if (o.nodeType==3) { return; }
	var tn = o.tagName || "";
	if (tn=="SCRIPT" || tn=="LINK" || tn=="INPUT" || tn=="BR" || tn=="STYLE") { return; }
	attach_theater_killer(o);
},false);