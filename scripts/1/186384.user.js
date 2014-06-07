// ==UserScript==
// @name          TPBproxyREDIRECTOR
// @description   Redirect TPB urls to Proxy URLS
// @include       *.google.*/*
// @version       1.1 BETA
// @copyright     VanDijk [Updated by Node13]
// ==/UserScript==

/**
 * variable proxy
 * 
 * Just enter the proxy that you use below. Default is PirateProxy.se
 * For more TPB proxies, go to http://www.piratebayproxylist.com or http://www.proxybay.info
 * @type {String}
 */
var proxy            = "pirateproxy.se";

/**
 * variable piratebayDomains
 * 
 * This are the links that need to change to the proxy URL
 * Add (or remove) original TPB domains in this array
 * For example: thepiratebay.pe / thepiratebay.se / thepiratebay.gy
 * @type {Array}
 */
var piratebayDomains = ["thepiratebay.se", "thepiratebay.org", "thepiratebay.sx", "thepiratebay.gy, "thepiratebay.ac"];

function changeUrl() { 
    var links            = document.links,
        len              = links.length,
        i                = 0;

    for(; i < len; i++) {
        for(var ii in piratebayDomains) {
            if( links[i].href.toLowerCase().indexOf(piratebayDomains[ii]) != -1 ) {
                links[i].href = links[i].href.replace(piratebayDomains[ii], proxy);
            }
        }
    }
}

window.addEventListener('DOMSubtreeModified', changeUrl, false);