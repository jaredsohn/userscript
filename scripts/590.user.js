// BoingBoing Butler
// version 0.1
// 2005-03-15
// Copyright (c) 2005, Julien Couvreur
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Inspired by Mark Pilgrim's Butler (via BoingBoing)
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
// select "BoingBoing Butler", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            BoingBoing Butler
// @namespace       http://blog.monstuff.com/archives/000235.html
// @description     Remove un-useful sections from Boing Boing
// @include         http://www.boingboing.net/*
// @include         http://boingboing.net/*
// ==/UserScript==
	
(function() {

    var BoingBoingButler = {

	// add CSS style directives to page
	addGlobalStyle: function(css) {
            style = document.createElement("style");
	        style.type = "text/css";
            style.innerHTML = css;
            document.getElementsByTagName('head')[0].appendChild(style);
        },
       
	// remove sponsors sidebars
	removeSponsors: function() {
	    this.addGlobalStyle('#sidebar-b { display: none ! important }');
	    this.addGlobalStyle('span.class1 { display: none ! important }');
	    this.addGlobalStyle('p.posted > iframe { display: none ! important }');
	    this.addGlobalStyle('#content { width: 800px }');
	   
        // remove the top banner image
        var advert = document.getElementsByTagName("a")[1];
        advert.parentNode.removeChild(advert);
        
        // remove the iframed-ad on the archive pages
        var iframe = document.getElementsByTagName("iframe")[0];
        if (iframe != "undefined") {
            iframe.parentNode.removeChild(iframe);
            }
        }
    }


    var href = window.location.href;

    // Google web search
    if (href.match(/^http:\/\/www\.boingboing\.net/i) ||
            href.match(/^http:\/\/boingboing\.net/i)) 
    {
	    BoingBoingButler.removeSponsors();
    }
    
})();
