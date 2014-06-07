// MetafilterButler
// version 0.1
// 2005-03-16
// Copyright (c) 2005, Justin Mason based on code by Julien Couvreur
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "MetafilterButler", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            MetafilterButler
// @namespace       http://taint.org/
// @description     Remove un-useful sections from Metafilter
// @include         http://www.metafilter.com/*
// @include         http://metafilter.com/*
// ==/UserScript==
	
(function() {

    var MetafilterButler = {

	// add CSS style directives to page
	addGlobalStyle: function(css) {
            style = document.createElement("style");
	        style.type = "text/css";
            style.innerHTML = css;
            document.getElementsByTagName('head')[0].appendChild(style);
        },
       
	// remove ad sidebars
	removeAds: function() {
            this.addGlobalStyle('div[id="textad"] { display: none ! important }');
            this.addGlobalStyle('div[id="menuad"] { display: none ! important }');
            this.addGlobalStyle('div[id="textad2"] { display: none ! important }');
            this.addGlobalStyle('table.adstrip { display: none ! important }');

        }
    }

    var href = window.location.href;

    // Google web search
    if (href.match(/^http:\/\/www\.metafilter\.com/i)) {
	    MetafilterButler.removeAds();   
    }
    
    if (href.match(/^http:\/\/metafilter\.com/i)) {
	    MetafilterButler.removeAds();   
    }
    
})();
