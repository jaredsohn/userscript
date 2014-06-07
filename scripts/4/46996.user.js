// Library Ezproxy Forwarder script
// version 0.13 BETA!
// Date: 2005-08-25
// Copyright (c) 2005,2006,2007,2008 Andrew Perry
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Modified slightly to work with NUS Libraries proxy by Aaron Tay
//
// YOU NEED TO EDIT THE VARIABLE proxyname (SEE BELOW) WITH THE DOMAIN
// FOR YOU INSTITUTIONS EZPROXY / LIBRARY PROXY ....
//
// Notes:
// Ezproxy (http://www.usefulutilities.com/) is a common proxy program used by
// university libraries to allow access to subscription based full-text in journals.
// This plugin adds the proxy domain to outgoing links from journal sites 
// This allows users to automatically follow links through their institutional 
// library proxy for seamless access to journal fulltext (if they are subscribed). 
//
// Could be easily modified to work with other similar proxies like the CoralCDN ..
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Library Ezproxy Forwarder", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Library EZProxy forwarder
// @namespace     http://greasemonkey.pansapiens.com/
// @description   **** You MUST edit to add your libraries proxy, else it won't work !! ****. Adds .ezproxy.x.x.x.x into all URLs, going through library proxy for full-text journal access. Ezproxy (http://www.usefulutilities.com/) is a common proxy program used by university libraries to allow access to subscription based full-text in journals. This plugin adds the proxy domain to outgoing links from journal sites and NCBI PubMed (eg, like .ezproxy.lib.unimelb.edu.au). This allows users to automatically follow links through their institutional library proxy for seamless access to journal fulltext (if they are subscribed).
// @include       http://*.wiley.com/*
// @include       http://*.sciencedirect.com/*
// @include       http://*.springerlink.com/*
// @include       http://*.umi.com/*
// @include       http://*.blackwell-synergy.com/*
// @include       http://*.nature.com/*
// @include       http://*.tandf.co.uk/*
// @include       http://*.portlandpress.co.uk/*
// @include       http://*.portlandpress.com/*
// @include       http://*.oxfordjournals.org/*
// @include       http://*.bmjjournals.com/*
// @include       http://scitation.aip.org/*
// @include       http://*apc.org/*
// @include       http://*.biophysj.org/*
// @include       http://*.sciencemag.org/*
// @include       http://*.ingentaconnect.com/*
// @include       http://www.ncbi.nlm.nih.gov/entrez/query.fcgi*
// @include       http://*.annualreviews.org/*
// @include       http://*.proteinscience.org/*
// @include       http://*.informaworld.com/*
// @include       http://portal.acm.org/*
// @include       http://www.mitpressjournals.org/*
// @include       http://*sagepub.com/*
// @include       http://proquest.umi.com/*
// @include       http://muse.jhu.edu/*
// @include       http://www.emeraldinsight.com/*
// @include		http://www.nature.com/*


// ==/UserScript==

var proxyname;
// PUT YOU INSTITUTIONS EZPROXY DOMAIN IN HERE
proxyname = ".libproxy1.nus.edu.sg"

// For instance, if you are at the University of Melbourne, 
// use this proxy name to forward via the Ezproxy service
//proxyname = ".ezproxy.lib.unimelb.edu.au"

var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
out = '';
for (var i = 0; i < allLinks.snapshotLength; i++) {
    a = allLinks.snapshotItem(i);
    
    // original way I did it -- regex's
    // take http:// and everything that is not a / up to the first / (as $1)
    // add .mate.lib.unimelb.edu.au/ to the end of the full domain name
    //a.href = a.href.replace(/(http:\/\/[A-Za-z0-9_\-\.\:]+)\//i,"$1.mate.lib.unimelb.edu.au/");
    // _OR_
    //a.href = a.href.replace(/(http:\/\/[^\/]+)\//i,"$1.mate.lib.unimelb.edu.au/");
    
    // then I discovered a better way .. link objects have a .host variable. 
    // Easy, and considered more reliable and the "Right Way"(TM).
    // the if statement is a nasty special case for PubMed .. could be improved
    if ( !(window.location.href.match(/^http:\/\/www\.ncbi\.nlm\.nih\.gov\/entrez\/query\.fcgi\?/)) ) {
        a.host += proxyname;
    }
    
    // a special case for rewriting links for PubMed
    // and a booming voice spoke .. "probably could be improved ..."
    if ( window.location.href.match(/^http:\/\/www\.ncbi\.nlm\.nih\.gov\/entrez\/query\.fcgi\?/) &&
          a.href.match(/^http:\/\/www\.ncbi\.nlm\.nih\.gov\/entrez\/utils\/lofref\.fcgi\?/) ) {
        a.host += proxyname;
    }
}
