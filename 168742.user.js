// ==UserScript==
// @name          Google PirateBay Proxy Redirector
// @description Redirect Google search URLs from ThePirateBay to a PirateBay proxy
// @include       *.google.*/*
// @version       0.1
// @copyright  van Dijk
// ==/UserScript==

/**
 * variable proxy
 * 
 * Enter here the TPB proxy URL for example: pirateproxy.net
 * For more TPB proxies, go to http://www.piratebayproxylist.com or http://www.proxybay.info
 * @type {String}
 */
var proxy            = "pirateproxy.net";

/**
 * variable piratebayDomains
 * 
 * This are the links that need to change to the proxy URL
 * Add (or remove) original TPB domains in this array
 * For example: thepiratebay.se
 * @type {Array}
 */
var piratebayDomains = ["thepiratebay.se", "thepiratebay.org", "thepiratebay.sx"];

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