// ==UserScript==
// @name           Googlieser
// @namespace      Googleieser
// @description    Stop google auto localising on IP. Redirect to .ie Written by Alex O’Connor <oconnoat@gmail.com>.
// @include        http://www.google.tld/*
// @include        http://scholar.google.tld/*
// @exclude        http://*.google.com/*
// @exclude        http://*.google.ie/*
// @exclude        https://www.google.tld/accounts/Logout*
// ==/UserScript==

// V2: Added exclusion for logout page to facilitate logoouts. turns out google redirects all over for logouts. 
// might still have a bug, not sure.

// V2.1: Added google scholar because that was also not working. Geo-located language selection is a really bad idea.

//Replace the google country .tld to .ie here and in the metadata
window.location.href = window.location.href.replace(/\.google(\.co)?\.[a-z]+/, '.google.ie');
