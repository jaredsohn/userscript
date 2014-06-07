// Technorati Butler
// version 0.1
// 2005-03-15
// Copyright (c) 2005, Julien Couvreur
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
// select "Technorati Butler", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Technorati Butler
// @namespace       http://blog.monstuff.com/archives/000235.html
// @description     Remove un-useful sections from Technorati
// @include         http://www.technorati.com/*
// @include         http://technorati.com/*
// ==/UserScript==
	
(function() {

    var TechnoratiButler = {

	// add CSS style directives to page
	addGlobalStyle: function(css) {
            style = document.createElement("style");
	        style.type = "text/css";
            style.innerHTML = css;
            document.getElementsByTagName('head')[0].appendChild(style);
        },
       
	// remove sponsors sidebars
	removeSponsoredLinks: function() {
	    this.addGlobalStyle('div[id="externals"] { display: none ! important }');
	    }
    }

    var href = window.location.href;

    // Google web search
    if (href.match(/^http:\/\/www\.technorati\.com/i)) {
	    TechnoratiButler.removeSponsoredLinks();   
    }
    
    if (href.match(/^http:\/\/technorati\.com/i)) {
	    TechnoratiButler.removeSponsoredLinks();   
    }
    
})();
