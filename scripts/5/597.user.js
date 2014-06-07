// O'ReillyNetPrinterFriendlyRedirect
// version 0.1
// 2005-04-08
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
// select "O'ReillyNetPrinterFriendlyRedirect", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            O'ReillyNetPrinterFriendlyRedirect
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     Redirects to the printer-friendly version of O'Reilly Network pages when one is detected.
//
// @include         http://oreillynet.com/*
// @include         http://*.oreillynet.com/*
// @include         http://linuxdevcenter.com/*
// @include         http://*.linuxdevcenter.com/*
// @include         http://macdevcenter.com/*
// @include         http://*.macdevcenter.com/*
// @include         http://windowsdevcenter.com/*
// @include         http://*.windowsdevcenter.com/*
// @include         http://*.ondotnet.com/*
// @include         http://ondotnet.com/*
// @include         http://onjava.com/*
// @include         http://*.onjava.com/*
// @include         http://onlamp.com/*
// @include         http://*.onlamp.com/*
// @include         http://openp2p.com/*
// @include         http://*.openp2p.com/*
// @include         http://perl.com/*
// @include         http://*.perl.com/*
// @include         http://xml.com/*
// @include         http://*.xml.com/*
// ==/UserScript==
	
(function() {
    // all the links whose src attribute starts with /lpt/
    var xpath = "//a[starts-with(@href,'/lpt/')]";
    var res = document.evaluate(xpath, document, null,
                                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    var linkIndex, printerLink;
    if (res.snapshotLength == 2) 
    {
        document.location.href = res.snapshotItem(0);
    }
    
    // add CSS on printer-friendly page: body { margin: 80px }
    var addGlobalStyle = function(css) {
        var style = document.createElement("style");
	    style.type = "text/css";
        style.innerHTML = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    };
        
    if (document.location.href.match(/\/lpt\//) != null) {
        addGlobalStyle("body { margin: 80px }");
    }
})();
