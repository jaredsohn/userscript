// ==UserScript==
// @name       Amazon Auto-Smile
// @namespace  
// @version    0.1
// @description  Automatically redirects all www.amazon.com URLs to their smile.amazon.com equivalent.
// @match      http://www.amazon.com/*
// @match      https://www.amazon.com/*
// @run-at document-start
// @copyright  2013
// ==/UserScript==

// Only redirect if we're the top window
//
// This prevents iframes embedded within www.amazon.com pages from 
// triggering redirects themselves: we only want the outer window to do that. 
// Unfortunately, it has the side-effect that if amazon.com is embedded
// in a frame on some other website, we'll skip doing the redirect even though 
// we're supposed to. 

if (window.self === window.top) {
    var new_host = window.location.host.replace(/^www\./, 'smile.');
    var new_url = window.location.protocol + '//' + new_host + window.location.pathname + window.location.search + window.location.hash;
    window.location.replace(new_url);
}
